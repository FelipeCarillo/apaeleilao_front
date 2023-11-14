import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";

export default function Leilao(){
    const [nomeLeilao, setNomeLeilao] = useState('')
    const [lanceLeilao, setLanceLeilao] = useState('')
    const [lances, setLances] = useState([])
    const [valor, setValor] = useState(0)

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

        let novoValor = parseFloat(valor)
        const json = {
            "auction_id": localStorage.getItem('idLeilaoAtivo'),
            "amount": novoValor
        }
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
            console.log(data.body)
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

    return (
        <>
        <Navbar />

        <main className="h-screen flex w-full p-8 max-md:flex-col gap-4">
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            {getLeilao()}
            {/* INFORMAÇÕES */}
            <section className="w-1/2 md:p-8 max-md:w-full h-full">
                <div className="bg-azul border-2 border-black rounded-xl h-full flex flex-col items-center justify-between">
                    <div className="w-full h-1/2 bg-cover bg-center rounded-t-lg bg-[url('http://via.placeholder.com/500x500')]"/>
                    <div className="text-center text-4xl text-white h-1/3 flex flex-col gap-4">
                        <h1>{nomeLeilao}</h1>
                        <button className="underline">Informações</button>
                    </div>
                    <div className="text-white text-2xl text-center">
                        <label>Tempo Restante: 12 minutos e 30 segundos</label>
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
                    <form className="w-full flex justify-center items-center pb-8 gap-4" onSubmit={(event) => event.preventDefault()}>
                        <input className="w-[80%] p-4 rounded-xl" type="number" placeholder="Digite seu lance aqui..." onChange={(e) => {setValor(e.target.value)}}/>
                        <button type="submit" className="bg-yellow-400 h-full w-16 rounded-full text-xl text-center" onClick={postLance}><i className="fa-solid fa-gavel"></i></button>
                    </form>
                </div>
            </section>
        </main>

        <Footer/>
        </>
    )
}