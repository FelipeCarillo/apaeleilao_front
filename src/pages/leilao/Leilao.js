import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from "react";
import CurrencyInput from "react-currency-input-field";

export default function Leilao(){
    const [nomeLeilao, setNomeLeilao] = useState('')
    const [lanceLeilao, setLanceLeilao] = useState('')
    const [lances, setLances] = useState([])
    const [valor, setValor] = useState(0)
    const [image, setImage] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')


    function getLeilao(){
        fetch (process.env.REACT_APP_API+'/get-auction?auction_id='+localStorage.getItem('idLeilaoAtivo'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(response => {
            if(response.ok){
                return response.json()
            }else{
                return Promise.reject(response);
            }
        }).then(data => {
            //console.log(data.body)
            setNomeLeilao(data.body.title)
            setLanceLeilao(data.body.current_amount)
            setLances(data.body.bids)
            setImage(data.body.images[0].image_body)
            setStartDate(new Date(data.body.start_date * 1000))
            setEndDate(new Date(data.body.end_date * 1000))


        }).catch(error => {
            console.log("ERROOOO " + error.status);
            toast.error(error.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            // 3. get error messages, if any
            error.json().then((json: any) => {
                console.log(json);
            })
        })
    }

    function postLance(){
        let novoValor = String(valor).replace('R$', '').replace(',', '.').replace('.', '')
        novoValor = parseFloat(novoValor)
        console.log(novoValor)
        const json = {
            "auction_id": localStorage.getItem('idLeilaoAtivo'),
            "amount": novoValor
        }
        console.log(json)
        fetch(process.env.REACT_APP_API+'/create-bid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(json)
        }).then(response => {
            if(response.ok){
                return response.json()
            }else{
                return Promise.reject(response);
            }
        }).then(data => {
            // console.log(data.body)
            document.getElementById('valor_prod').value = ''
            toast.success("Lance realizado com sucesso!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }).catch(error => {
            console.log("ERROOOO " + error.status);
            // 3. get error messages, if any
            error.json().then((json: any) => {
                console.log(json);
                toast.error(json.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            })
        })
    }

    // const Timer = () => {
    //     const [hours, setHours] = useState(0);
    //     const [minutes, setMinutes] = useState(0);
    //     const [seconds, setSeconds] = useState(0);

    //     const deadline = "December, 29, 2024";

    //     const getTime = () => {
    //         const time = Date.parse(deadline) - Date.now();

    //         setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    //         setMinutes(Math.floor((time / 1000 / 60) % 60));
    //         setSeconds(Math.floor((time / 1000) % 60));
    //     };
    
    //     useEffect(() => {
    //         const interval = setInterval(() => getTime(deadline), 1000);
    //         console.log(hours, minutes, seconds)
    //         return () => clearInterval(interval);
    //     }, []);
    //     return (
    //         <div className="timer">
    //             {hours}h : {minutes}m : {seconds}s
    //         </div>
    //     );
    /// }

    return (
        <>
        <Navbar />

        <main className="flex w-full p-8 max-md:flex-col gap-4">

            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            {/* INFORMAÇÕES */}
            {getLeilao()}
            <section className="w-1/2 md:p-8 max-md:w-full h-full">
                <div className="border-2 border-black rounded-xl h-full flex flex-col items-center">
                    <img className="w-full max-h-[500px] rounded-t-xl" src={image} alt=""/>
                    <div className="text-center text-2xl h-1/3 flex flex-col">
                        <h1>{nomeLeilao}</h1>
                        <button className="underline">Informações</button>
                    </div>
                    <div className="text-2xl text-center mt-12">
                        <label>Tempo Restante: 0h : 0min : 0seg</label>
                    </div>
                </div>
            </section>
            {/* DAR LANCE */}
            <section className="w-1/2 md:p-8 max-md:w-full">
                <div className="bg-azul border-2 border-black rounded-xl h-full flex flex-col items-center justify-between">
                    <div className="flex flex-col w-full items-center">    
                        <div className="text-center py-4">
                            <h2 className="text-white font-bold text-4xl">Maior Lance:</h2>
                            <h4 className="text-white font-semibold text-4xl">R$ {lanceLeilao}</h4>
                        </div>
                        <div className="bg-white h-[1px] w-[80%]"/>
                    </div>
                    <div className="w-full h-full m-16 text-2xl text-center text-white flex flex-col gap-2">
                        {lances.map((lance, index) => {
                            return (
                                <p key={index}>{lance.first_name}: R${lance.amount}</p>
                            )
                        })
                        }
                    </div>
                    <form className="w-full flex justify-center items-center pb-2 gap-4" onSubmit={(event) => event.preventDefault()}>
                        <CurrencyInput
                            id="valor_prod"
                            className="w-[80%] p-2 border-2 border-black rounded text-lg"
                            placeholder="Valor: 00,00"
                            maxLength={13}
                            decimalsLimit={2}
                            prefix={`R$`}
                            onChange={(e) => {setValor(e.target.value)}}
                        />
                        {/* <input className="w-[80%] p-4 rounded-xl" type="number" placeholder="Digite seu lance aqui..." onChange={(e) => {setValor(e.target.value)}}/> */}
                        <button type="submit" className="bg-yellow-400 h-full w-16 max-md:h-12 rounded-full text-xl text-center" onClick={postLance}><i className="fa-solid fa-gavel"></i></button>
                    </form>
                </div>
            </section>
        </main>

        <Footer/>
        </>
    )
}