import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Carrossel from "../components/Carrossel"
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Principal() {
    const [modal, setModal] = useState(false)

    const [nomeLeilaoAtivo, setNomeLeilaoAtivo] = useState('Sem leilão')
    const [lanceLeilaoAtivo, setLanceLeilaoAtivo] = useState('0')
    const [dataLeilaoAtivo, setDataLeilaoAtivo] = useState('00/00/0000')
    const [startHour, setStartHour] = useState('00:00')
    const [endHour, setEndHour] = useState('00:00')
    const [statusLeilao, setStatusLeilao] = useState('Leilão')
    const [descricaoLeilão, setDescricaoLeilão] = useState('Sem descrição')
    const [stsLeilao, setStsLeilao] = useState('')
    const [imageLeilao, setImageLeilao] = useState('http://via.placeholder.com/500x500')

    const [dataLeilao, setDataLeilao] = useState([])

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
                if(data.body.auctions[0].status_auction === 'OPEN'){
                    setStatusLeilao('Leilão Ativo')
                    setStsLeilao('OPEN')
                }else{
                    setStatusLeilao('Próximo Leilão')
                    setStsLeilao('NEXT')
                }
                localStorage.setItem('idLeilaoAtivo', data.body.auctions[0].auction_id)
                setNomeLeilaoAtivo(data.body.auctions[0].title)
                setDescricaoLeilão(data.body.auctions[0].description)
                setLanceLeilaoAtivo(data.body.auctions[0].current_amount)
                setImageLeilao(data.body.auctions[0].images[0].image_body)

                // CONVERTER START DATA
                const startDate = new Date(data.body.auctions[0].start_date * 1000)
                setDataLeilaoAtivo(startDate.getDate() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getFullYear())
                // FOMATANDO
                setStartHour(formatData(startDate.getHours(), startDate.getMinutes()))
                // CONVERTER END DATA
                const endDate = new Date(data.body.auctions[0].end_date * 1000)
                // FOMATANDO
                setEndHour(formatData(endDate.getHours(), endDate.getMinutes()))
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
                            "timeStart": formatData(startDate.getHours(), startDate.getMinutes()),
                            "timeEnd": formatData(endDate.getHours(), endDate.getMinutes()),
                        }
                        setDataLeilao(oldArray => [...oldArray, obj])
                    }
                }

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
        getLeiloes()
    }, [])

    function formatData(hour, minute){
        if(hour < 10 && minute < 10){
            return ("0" + hour + ":0" + minute)
        }else if(minute < 10){
            return (hour + ":0" + minute)
        }else if(hour < 10){
            return ("0" + hour + ":" + minute)
        }else{
            return (hour + ":" + minute)
        }
    }

    function copiarCodigo () {
        //localStorage.getItem('idLeilaoAtivo')
        navigator.clipboard.writeText('https://apaeleilaoscsul.techimtgroup.net');
        toast.success('Código copiado com sucesso!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    function compartilharWhatsApp() {
        // Mensagem que você deseja enviar (substitua com a mensagem desejada)
        var mensagem = 'https://apaeleilaoscsul.techimtgroup.net';
      
        // Formatação do link do WhatsApp
        var linkWhatsApp = 'https://api.whatsapp.com/send?phone=' + '&text=' + encodeURIComponent(mensagem);
      
        // Abre o link no WhatsApp
        window.open(linkWhatsApp);
      }

    return (
        <>
        <Navbar pag="Inicio"/>
        {/* <Timer /> */}
        <main>
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />

            <section className="px-4 py-8 mb-12 flex flex-col gap-8 items-center">
                <h1 className="text-4xl text-center">{statusLeilao}</h1>
                {/* CARD LEITAO ATIVO */}
                <div className="flex border-2 border-black rounded-xl max-md:flex-col" tabIndex={0}>
                    <img className="rounded-l-xl w-[300px] h-[300px] max-md:rounded-xl max-md:w-full max-md:h-[300px]" src={imageLeilao} alt="imagem do leilao ativo"/>
                    <div className="flex flex-col w-full items-end gap-6 p-4 max-md:flex-col max-md:items-center">
                        <div className="flex flex-col self-start gap-2 text-lg">
                            <div>
                                <h2 className="text-3xl">{nomeLeilaoAtivo}</h2>
                            </div>
                            <p className="underline cursor-pointer" onClick={()=>{setModal(true)}} tabIndex={0} onKeyDown={(event)=> event.keyCode === 13 && setModal(true)}>Informações</p>
                            <p>Data: {dataLeilaoAtivo} - {startHour} à {endHour}</p>
                        </div>
                        <div className="flex justify-between gap-12 items-center w-full max-md:flex-col">
                            <p className="font-bold text-3xl">Lance: R${lanceLeilaoAtivo}</p>
                            <Link to={`${stsLeilao === 'OPEN' ? localStorage.getItem('token') ? "/leilao" : '/login' : '/'}`} className="flex items-center gap-1 bg-yellow-300 text-3xl rounded-full py-2 px-5 font-medium max-md:text-3xl"><i className="fa-solid fa-gavel"></i>Dar Lance</Link>
                        </div>
                        <div className="flex gap-4 md:gap-12 justify-center w-full">
                            <button className="rounded-full w-[50%] md:w-[40%] md:hover:w-[50%] bg-yellow-300 border-2 py-2 md:px-5 border-black text-lg hover:text-xl" onClick={copiarCodigo}><i className="fa-solid fa-copy"></i> Copiar Link</button>
                            <button className="rounded-full w-[50%] md:w-[40%] md:hover:w-[50%] bg-[#25D366] border-2 py-2 md:px-5 border-black text-lg hover:text-xl text-white" onClick={compartilharWhatsApp}><i className="fa-brands fa-whatsapp text-2xl"></i> Whatsapp</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="text-white bg-blue-500 py-8">
                <h1 className="text-center text-4xl underline mb-8">Próximos Leilões</h1>
                <Carrossel data={dataLeilao}/>
            </section>
            <section className="text-center py-8">
                <p className="text-2xl">Gostaria de nos mandar um feedback? Dar a sua opinião sobre o site?</p>
                <p className="text-xl mb-10">Então por favor click no botão abaixo</p>
                <Link to='/feedback' className="rounded-full text-xl hover:text-2xl py-2 px-5 bg-yellow-300 border-2 border-black">Feedback</Link>
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