import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Carrossel from "../components/Carrossel"
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Principal() {
    const [modal, setModal] = useState(false)

    const [nomeLeilaoAtivo, setNomeLeilaoAtivo] = useState('Exemplo')
    const [lanceLeilaoAtivo, setLanceLeilaoAtivo] = useState('0')
    const [dataLeilaoAtivo, setDataLeilaoAtivo] = useState('00/00/0000')
    const [startHour, setStartHour] = useState('00:00')
    const [endHour, setEndHour] = useState('00:00')
    const [statusLeilao, setStatusLeilao] = useState('Leilão')
    const [descricaoLeilão, setDescricaoLeilão] = useState('Sem descrição')
    const [stsLeilao, setStsLeilao] = useState('')
    const [imageLeilao, setImageLeilao] = useState('http://via.placeholder.com/500x500')

    const [dataLeilao, setDataLeilao] = useState([])

    // const data = [
    //     {
    //         "img": 'http://via.placeholder.com/500x500',
    //         "nome": 'Exemplo1',
    //         "lance": '1.000,00',
    //         "date": '23/08/2023',
    //         "timeStart": '12:00',
    //         "timeEnd": '12:30',
    //     },
    //     {
    //         "img": 'http://via.placeholder.com/500x500',
    //         "nome": 'Exemplo2',
    //         "lance": '750,00',
    //         "date": '24/08/2023',
    //         "timeStart": '17:00',
    //         "timeEnd": '17:30',
    //     },
    //     {
    //         "img": 'http://via.placeholder.com/500x500',
    //         "nome": 'Exemplo3',
    //         "lance": '1.600,00',
    //         "date": '25/08/2023',
    //         "timeStart": '08:30',
    //         "timeEnd": '09:00',
    //     },
    //     {
    //         "img": 'http://via.placeholder.com/500x500',
    //         "nome": 'Exemplo4',
    //         "lance": '10.000,00',
    //         "date": '26/08/2023',
    //         "timeStart": '16:30',
    //         "timeEnd": '17:00',
    //     },
    //     {
    //         "img": 'http://via.placeholder.com/500x500',
    //         "nome": 'Exemplo5',
    //         "lance": '10.000,00',
    //         "date": '26/08/2023',
    //         "timeStart": '16:30',
    //         "timeEnd": '17:00',
    //     },
    // ]

    // const Timer = () => {
    //     const [days, setDays] = useState(0);
    //     const [hours, setHours] = useState(0);
    //     const [minutes, setMinutes] = useState(0);
    //     const [seconds, setSeconds] = useState(0);

    //     const getTime = () => {

    //         const time = Date.now();
    //         const days = new Date(time).getDate()
    //         const hours = new Date(time).getHours();
    //         const minutes = new Date(time).getMinutes();
    //         const seconds = new Date(time).getSeconds();
    //         setDays(days);
    //         setHours(hours);
    //         setMinutes(minutes);
    //         setSeconds(seconds);
    //         return time;

    //     };

    //     useEffect(() => {
    //         const interval = setInterval(() => getTime(), 1000);

    //         return () => clearInterval(interval);
    //     }, []);

    //     return (
    //         <div>
    //             <p>Datetime: {days}d {hours}h {minutes}m {seconds}s</p>
    //         </div>
    //     )
    // }
    useEffect(()=> {
        function getLeiloes(){
            fetch(process.env.REACT_APP_API+'/get-all-auctions-menu', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                if(response.ok){
                    return response.json()
                }else{
                    return Promise.reject(response);
                }
            }).then(data => {
                // console.log(data)
                if(data.body.auctions.length === 0){
                    return toast.error('Nenhum leilão encontrado', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                }
                // console.log(data.body.auctions[0])
                if(data.body.auctions[0].status_auction === 'OPEN'){
                    setStatusLeilao('Leilão Ativo')
                    setStsLeilao('OPEN')
                }else{
                    setStatusLeilao('Próximo Leilão')
                    setStsLeilao('NEXT')
                }
                console.log(data.body.auctions[0])
                localStorage.setItem('idLeilaoAtivo', data.body.auctions[0].auction_id)
                setNomeLeilaoAtivo(data.body.auctions[0].title)
                setDescricaoLeilão(data.body.auctions[0].description)
                setLanceLeilaoAtivo(data.body.auctions[0].current_amount)
                setImageLeilao(data.body.auctions[0].images[0].image_body)
                // console.log(imageLeilao)
                // CONVERTER START DATA
                const startDate = new Date(data.body.auctions[0].start_date * 1000)
                setDataLeilaoAtivo(startDate.getDate() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getFullYear())
                setStartHour(startDate.getHours() + ":" + startDate.getMinutes())
                // CONVERTER END DATA
                const endDate = new Date(data.body.auctions[0].end_date * 1000)
                setEndHour(endDate.getHours() + ":" + endDate.getMinutes())

                // GERAR DATA DO CARROSSEL
                if(data.body.auctions.length > 0){
                    let i
                    for(i=0; i<data.body.auctions.length; i++){
                        const startDate = new Date(data.body.auctions[i].start_date * 1000)
                        const endDate = new Date(data.body.auctions[i].end_date * 1000)
                        const obj = {
                            "img": data.body.auctions[i].images[0].image_body,
                            "nome": data.body.auctions[i].title,
                            "lance": data.body.auctions[i].current_amount,
                            "date": startDate.getDate() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getFullYear(),
                            "timeStart": startDate.getHours() + ":" + startDate.getMinutes(),
                            "timeEnd": endDate.getHours() + ":" + endDate.getMinutes(),
                        }
                        setDataLeilao(oldArray => [...oldArray, obj])
                        console.log("dataLeilao: ")
                        console.log(dataLeilao)
                    }
                }

            }).catch(error => {
                // AQUI VC CONTROLA O RESULTADO (STATUS CODE + MESSAGE)
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
        getLeiloes()
    }, [])
    
    return (
        <>
        <Navbar pag="Inicio"/>
        {/* <Timer /> */}
        <main>
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />

            <section className="px-4 py-8 mb-12 flex flex-col gap-8 items-center">
                <h1 className="text-4xl text-center">{statusLeilao}</h1>
                {/* CARD LEITAO ATIVO */}
                <div className="flex border-2 border-black rounded-xl max-md:flex-col">
                    <img className="rounded-l-xl w-[300px] max-md:rounded-xl max-md:w-full max-md:h-[300px]" src={imageLeilao} alt=""/>
                    <div className="flex flex-col w-full items-end gap-12 p-4 max-md:flex-col max-md:items-center">
                        <div className="flex flex-col self-start gap-2 text-lg">
                            <div>
                                <h2 className="text-3xl">{nomeLeilaoAtivo}</h2>
                            </div>
                            <p className="underline cursor-pointer" onClick={()=>{setModal(true)}}>Informações</p>
                            <p>Data: {dataLeilaoAtivo} - {startHour} à {endHour}</p>
                        </div>
                        <div className="flex justify-between gap-12 items-center w-full max-md:flex-col">
                            <p className="font-bold text-3xl">Lance: R${lanceLeilaoAtivo}</p>
                            <Link to={`${stsLeilao === 'OPEN' ? "/leilao" : '/'}`} className="flex items-center gap-1 bg-yellow-300 text-3xl rounded-full py-2 px-5 font-medium max-md:text-3xl"><i className="fa-solid fa-gavel"></i>Dar Lance</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="text-white bg-blue-500 py-8">
                <h1 className="text-center text-4xl underline mb-8">Próximos Leilões</h1>
                <Carrossel data={dataLeilao}/>
            </section>
        </main>

        <Footer />

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
                            <i onClick={()=>{setModal(false)}} className="fa-solid fa-x cursor-pointer"></i>
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