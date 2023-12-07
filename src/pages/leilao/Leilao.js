import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from "react";
import CurrencyInput from "react-currency-input-field";

export default function Leilao(){
    const [modal, setModal] = useState(false)
    const [nomeLeilao, setNomeLeilao] = useState('')
    const [lanceLeilao, setLanceLeilao] = useState('')
    const [lances, setLances] = useState([])
    const [valor, setValor] = useState(0)
    const [image, setImage] = useState('')
    const [endDate, setEndDate] = useState('')
    const [descricaoLeilão, setDescricaoLeilao] = useState('Sem Descrição')

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
            setNomeLeilao(data.body.title)
            setLanceLeilao(data.body.current_amount)
            setLances(data.body.bids)
            setImage(data.body.images[0].image_body)
            setEndDate(new Date(data.body.end_date * 1000))
            setDescricaoLeilao(data.body.description)

        }).catch(error => {
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
            })
        })
    }

    function postLance(){
        let novoValor = String(valor).replace('R$', '').replace(',', '.').replace('.', '')
        novoValor = parseFloat(novoValor)
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
            // 3. get error messages, if any
            error.json().then((json: any) => {
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

    const Timer = () => {
        const calculateTimeLeft = () => {
            const difference = +new Date(endDate) - +new Date();
            let timeLeft = {};

            if (difference > 0) {
                timeLeft = {
                    h: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    min: Math.floor((difference / 1000 / 60) % 60),
                    seg: Math.floor((difference / 1000) % 60),
                };
            }

            return timeLeft;
        };

        const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

        useEffect(() => {
            setTimeout(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);
        });

        const timerComponents = [];

        Object.keys(timeLeft).forEach((interval) => {
            if (!timeLeft[interval]) {
                return;
            }

            timerComponents.push(
                <span>
                    {timeLeft[interval]} {interval}{" "}
                </span>
            );
        });

        return (
            <div>
                {timerComponents.length ? timerComponents : <span>Finalizado!</span>}
            </div>
        );
    }

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
                        <button className="underline" onClick={() => setModal(true)} tabIndex={0} onKeyDown={(event)=> event.keyCode === 13 && setModal(true)}>Informações</button>
                    </div>
                    <div className="text-2xl text-center mt-12">
                        <label>Tempo Restante: <Timer/></label>
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
        {/* MODAL */}
        <div className={`${modal ? 'relative z-10' : 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="">
                        <div className="flex justify-between items-center">
                            <p></p>
                            <h3 className="font-semibold text-2xl text-center">Informações do Leilão</h3>
                            <i onClick={()=>{setModal(false)}} className="fa-solid fa-x cursor-pointer" tabIndex={0} onKeyDown={(event)=> event.keyCode === 13 && setModal(false)}></i>
                        </div>
                        <div className="h-[2px] bg-azul" />
                        <p className="text-center mt-4">{descricaoLeilão}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </>
    )
}