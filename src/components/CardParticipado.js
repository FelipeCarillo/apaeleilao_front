import { useEffect, useState} from "react";
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CardParticipados({data}){
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState("Nome do Produto");
    const [amount, setAmount] = useState("Valor do Produto");
    const [auction_id, setAuction_id] = useState("");
    const [end_date, setEnd_date] = useState("xx/xx/xx xx:xx");

    const [payment, setPayment] = useState([]);
    const [payment_code, setPayment_code] = useState("");

    // const [imageNumber, setImageNumber] = useState(0);

    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal(infos) {
        // abre o modal
        setIsOpen(true);

        // seta as informações do modal
        setImages(infos.images);
        setTitle(infos.title);
        setAmount(infos.amount);
        setAuction_id(infos.auction_id);
        setEnd_date(convertData(infos.end_date));

    }
    function closeModal() {
      setIsOpen(false);
    }
    function convertData (data) {
        var date = new Date(data*1000);
        return date.toLocaleDateString();
    }
    function copiarCodigo () {
        navigator.clipboard.writeText(payment_code);
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

    // get payment
    const fetchPaymentData = (auction_id) => {
        fetch (process.env.REACT_APP_API + "/get-payment?auction_id=" + auction_id, {
            method: "GET",
            cors: "no-cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token"),
            },
        }).then((response) => response.json())
        .then((data) => {
            console.log(data);
            setPayment(data.body);
            setPayment_code((data.body.pix_code));
        });
    }
    useEffect(() => {
        if (modalIsOpen === true){
            // Execute a função imediatamente
            fetchPaymentData(auction_id);
        
            // Configurar um intervalo para executar a função a cada 5 segundos
            const intervalId = setInterval(() => {
            fetchPaymentData(auction_id);
            }, 5000);
        
            // Limpar o intervalo quando o componente for desmontado
            return () => clearInterval(intervalId);
        }
        else{
            return;
        }
    }, [auction_id, modalIsOpen]);

    //Verificação se está pago para o map
    function verificaPago (status_payment) {
        if (status_payment === 'PENDING'){
            return <img className="mx-auto border-2 border-gray-400 rounded-[10px] w-[100%] md:w-[50%]" src={payment.pix_base64 === undefined ? 'https://placehold.co/500x500' : `data:image/png;base64,${payment.pix_base64}`}></img>
        }
        else if (status_payment === 'PAID'){
            return <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.9919541606373!2d-46.556860474306305!3d-23.
            640459178745584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce42d64e24abeb%3A0xf631b86ca3704b82!2sAPAE%20São%20
            Caetano%20do%20Sul!5e0!3m2!1sen!2sbr!4v1701172670863!5m2!1sen!2sbr" 
            width="400" height="300" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className="mx-auto"></iframe>
        }
    }

    return (
        <>
        {data.map((data, index) => (
            <div>
                {/* Card */}
                <div key={index} className="border-2 border-black rounded-[25px]">
                    <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
                    <div>
                        <img src={data.images[0].image_body} alt="Imagem do evento" className="w-[100%] h-[250px] rounded-t-[25px] object-cover"/>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl pb-0">{data.title}</p>
                        <p className="text-2xl"><strong>Lance: R${data.amount}</strong></p>
                        <p className="text-lg">Prazo: {convertData(data.end_date)}</p>
                        { data.status_payment === 'PENDING' ? <button className="bg-yellow-300 p-2 border-2 border-black rounded-[45px] w-[80%] my-3 text-xl" onClick={() => {openModal(data)}}>Pagar</button>
                        : data.status_payment === 'PAID' ? <button className="bg-verde p-2 border-2 border-black rounded-[45px] w-[80%] my-3 text-white text-xl" onClick={() => {openModal(data)}}> <i className="fa-solid fa-check"></i> </button> 
                        : <button className="bg-vermelho p-2 border-2 border-black rounded-[45px] w-[80%] my-3 text-white text-xl" onClick={() => {openModal(data)}}> <i className="fa-solid fa-x"></i> </button>}
                    </div>
                </div>
                {/* Modal */}
                <div>
                  <Modal
                    isOpen={modalIsOpen}
                    ariaHideApp={false}
                    onRequestClose={closeModal}
                    style={
                        {
                            overlay:{
                                backgroundColor: 'rgba(0,0,0,0.3)',
                            },
                            content:{
                                backgroundColor: '#fff',
                                borderRadius: '25px',
                                width: '80%',
                                height: window.innerWidth >= 768 ? '85%' : '75%',
                                // height: '90%',
                                margin: 'auto',
                                padding: 0,
                            }
                        }
                    }
                    contentLabel="Example Modal"
                  >
                    {/* header */}
                    <div className="flex justify-between bg-azul p-2 mb-5 md:mb-10">
                        <p className="text-azul">a</p>
                        <h2 className="text-white text-4xl">Pagamento</h2>
                        <button className="text-4xl text-vermelho" onClick={closeModal}><i className="fa-solid fa-xmark"></i></button>
                    </div>
                    {/* Conteudo */}
                    <div className="flex flex-col md:flex-row">
                        {/* Lado Esquerdo - Card */}
                        <div className="hidden md:flex md:flex-col w-[100%] md:w-[50%] md:border-r-2 md:border-black text-center">
                            <h6 className="text-4xl underline mb-5">Produto</h6>
                            <div key={index} className="border-2 border-black rounded-[25px] w-[90%] md:w-[60%] mx-auto">
                                <div id="imageCard">
                                    <img src={images.length > 0 ? images[0].image_body : 'https://placehold.co/500x500'} alt="Imagem do evento" className="w-[100%] h-[250px] rounded-t-[25px] object-cover"/>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl pb-0 pt-3">{title}</p>
                                    <p className="text-4xl py-10"><strong>Lance: R${amount}</strong></p>
                                    <p className="text-xl pb-2">Prazo: {end_date}</p>
                                </div>
                            </div>
                        </div>
                        {/* Lado Direito - Pagamento */}
                        <div className="w-[100%] md:w-[50%] px-10 text-center">
                            <h6 className="text-4xl underline mb-5">{data.status_payment === 'PENDING' ? 'PIX' : data.status_payment === 'PAID' ? 'Retire aqui o seu pedido' : ''}</h6>
                            {verificaPago(payment.status_payment)}
                            {/* <img className="mx-auto border-2 border-gray-400 rounded-[10px] w-[100%] md:w-[50%]" src={payment.pix_base64 === undefined ? 'https://placehold.co/500x500' : `data:image/png;base64,${payment.pix_base64}`}></img> */}
                            <button className="bg-yellow-300 mt-3 px-6 py-1 text-2xl rounded-[45px] border border-black" onClick={copiarCodigo}>Copiar Código</button>
                            <p className="text-xl md:text-3xl mt-10">Status do Pagamento: <br/><strong>{data.status_payment === "PENDING" ? 'AGUARDANDO' : data.status_payment ? 'PAGO' : 'EXPIRADO'}</strong></p>
                            <div className="mt-5">
                                {data.status_payment === "PENDING" ? <div className="rounded-full mx-auto mt-1 text-6xl"><i className="fa-solid fa-spinner animate-spin"></i></div> 
                                : data.status_payment === "PAID" ? <div className="rounded-full mx-auto mt-1 text-6xl bg-green-500 w-[70px] h-[70px] flex items-center justify-center text-white animate-pulse"><i className="my-auto fa-solid fa-check"></i></div>
                                : <div className="rounded-full mx-auto mt-1 text-6xl bg-red-600 w-[70px] h-[70px] flex items-center justify-center text-white animate-pulse"><i className="fa-solid fa-exclamation"></i></div>}   
                            </div>
                        </div>
                    </div>
                    
                  </Modal>
                </div>
            </div>
        ))}
        </>
    )
}