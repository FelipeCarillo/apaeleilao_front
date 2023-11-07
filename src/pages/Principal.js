import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Carrossel from "../components/Carrossel"
import { ToastContainer, toast } from 'react-toastify';

export default function Principal() {
    const data = [
        {
            "img": 'http://via.placeholder.com/500x500',
            "nome": 'Exemplo1',
            "desc": 'Usado',
            "lance": '1.000,00',
            "date": '23/08/2023',
            "timeStart": '12:00',
            "timeEnd": '12:30',
        },
        {
            "img": 'http://via.placeholder.com/500x500',
            "nome": 'Exemplo2',
            "desc": 'Novo',
            "lance": '750,00',
            "date": '24/08/2023',
            "timeStart": '17:00',
            "timeEnd": '17:30',
        },
        {
            "img": 'http://via.placeholder.com/500x500',
            "nome": 'Exemplo3',
            "desc": 'Usado',
            "lance": '1.600,00',
            "date": '25/08/2023',
            "timeStart": '08:30',
            "timeEnd": '09:00',
        },
        {
            "img": 'http://via.placeholder.com/500x500',
            "nome": 'Exemplo4',
            "desc": 'Usado',
            "lance": '10.000,00',
            "date": '26/08/2023',
            "timeStart": '16:30',
            "timeEnd": '17:00',
        },
        {
            "img": 'http://via.placeholder.com/500x500',
            "nome": 'Exemplo5',
            "desc": 'Usado',
            "lance": '10.000,00',
            "date": '26/08/2023',
            "timeStart": '16:30',
            "timeEnd": '17:00',
        },
    ]

    function getLeiloes(){
        fetch(process.env.REACT_APP_API+'/get-all-auctions-menu', {
            method: 'GET',
        }).then(response => {
            if(response.ok){
                return response.json()
            }else{
                return Promise.reject(response);
            }
        }).then(data => {
            console.log(data)
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

    return (
        <>
        <Navbar pag="Inicio"/>
        {

        }
        <main>
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
 
            {getLeiloes()}
            <section className="px-4 py-8 mb-12 flex flex-col gap-8 items-center">
                <h1 className="text-4xl text-center">Leilão Ativo</h1>
                {/* CARD LEITAO ATIVO */}
                <div className="flex border-2 border-black rounded-xl max-md:flex-col">
                    <img className="rounded-l-xl w-[300px] max-md:rounded-xl max-md:w-full max-md:h-[300px]" src="http://via.placeholder.com/500x500" alt="Imagem do Leilão"/>
                    <div className="flex flex-col w-full items-end gap-12 p-4 max-md:flex-col max-md:items-center">
                        <div className="flex flex-col self-start gap-2 text-lg">
                            <div>
                                <h2 className="text-3xl">Exemplo</h2>
                            </div>
                            <p className="underline">Informações</p>
                            <p>Data: 23/08/2023 - 12:00 à 12:30</p>
                        </div>
                        <div className="flex justify-between gap-12 items-center w-full max-md:flex-col">
                            <p className="font-bold text-3xl">Lance: R$750,00</p>
                            <button className="flex items-center gap-1 bg-yellow-300 text-3xl rounded-full py-2 px-5 font-medium max-md:text-3xl"><i className="fa-solid fa-gavel"></i>Dar Lance</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="text-white bg-blue-500 py-8">
                <h1 className="text-center text-4xl underline mb-8">Próximos Leilões</h1>
                <Carrossel data={data}/>
            </section>
        </main>

        <Footer />
        </>
    )
}