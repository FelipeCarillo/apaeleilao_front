import { useEffect, useState } from "react";
import Modal from "react-modal";
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';

export default function CardFinalizados({data}){
    function convertData (data) {
        var date = new Date(data*1000);
        return date.toLocaleDateString();
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nome, setNome] = useState({});
    const [sobrenome, setSobrenome] = useState({});
    const [CPF, setCPF] = useState('');
    const [leilao, setLeilao] = useState('');
    const [lance, setLance] = useState('');
    const [dataLance, setDataLance] = useState('');
    const [dataPagamento, setDataPagamento] = useState('');
    const [status, setStatus] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');

    function Etiqueta(infos) {
        setIsModalOpen(true);
        setNome(infos.user.first_name);
        setSobrenome(infos.user.last_name);
        setCPF(infos.user.cpf);
        setLeilao(infos.title);
        setLance(infos.current_amount);
        setDataLance(convertData(infos.end_date));
        setDataPagamento(convertData(infos.payment.date_payment));
        setStatus(infos.payment.status_payment);
        setTelefone(infos.user.phone);
        setEmail(infos.user.email);
    }

    function gerarPDF() {
        const pdf = new jsPDF();
        pdf.setFontSize(18);
        // pdf.setFontStyle('bold');
        pdf.text('Retirada de Produto', 10, 10);

        pdf.setFontSize(14);
        // pdf.setFontStyle('normal');
        pdf.text('Nome: ' + nome + ' ' + sobrenome , 10, 20);
        pdf.text('CPF: ' + CPF, 10, 30);
        pdf.text('Telefone: ' + telefone, 10, 40);
        pdf.text('Email: ' + email, 10, 50);
        pdf.text('Titulo do Leilão: ' + leilao, 10, 60);
        pdf.text('Valor: R$ ' + lance, 10, 70);
        pdf.text('Data de Impressão: ' + new Date().toLocaleDateString(), 10, 80);
        // Salva o PDF
        pdf.save('etiqueta.pdf');
    };

    return (
        <>
        {data.map((data) => (
            <div key={data.auction_id} className="border-2 border-black rounded-[25px]">
                <div>
                    <img src={data.images[0].image_body} alt="Imagem do evento" className="w-[100%] h-[250px] rounded-t-[25px] object-cover"/>
                </div>
                <div className="text-center">
                    <p className="text-2xl pb-0">{data.title}</p>
                    <p className="text-2xl"><strong>Lance: {data.current_amount}</strong></p>
                    <p className="text-lg">Prazo: {convertData(data.end_date)}</p>
                    {data.status_auction === "CLOSED" ? data.payment.status_payment === "PENDING" ? 
                        <button className="bg-azul p-2 border-2 border-black rounded-[45px] w-[80%] my-3 text-xl text-white" onClick={() => {Etiqueta(data, 'pendente')}}>Pendente</button> : data.payment.status_payment === "PAID" ? 
                        <button className="bg-yellow-300 p-2 border-2 border-black rounded-[45px] w-[80%] my-3 text-xl" onClick={() => {Etiqueta(data, 'pago')}}>Etiqueta</button> 
                        : <button className="bg-vermelho p-2 border-2 border-black rounded-[45px] w-[80%] my-3 text-xl text-white" onClick={() => {Etiqueta(data, 'pago')}}>Não pago</button> 
                    : data.status_auction === 'AVAILABLE' ? <button className="bg-yellow-300 p-2 border-2 border-black rounded-[45px] w-[80%] my-3 text-xl"><i className="fa-solid fa-arrow-up-from-bracket"></i> Criar de novo</button>
                    : <button className="bg-vermelho p-2 border-2 border-black rounded-[45px] w-[80%] my-3 text-white text-xl" disabled> <i className="fa-solid fa-x"></i></button>}
                </div>
                {/* Modal */}
                <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}
                  style={{
                      overlay: { backgroundColor: 'rgba(0,0,0,0.3)' },
                      content: {
                      backgroundColor: '#fff',
                      borderRadius: '25px',
                      width: '35%',
                      height: '43%',
                      margin: 'auto',
                      padding: 0,
                      }
                  }}
                  contentLabel="Example Modal"
                  >
                    <div className="m-5">
                        <h2 className="text-center text-4xl mb-5">Informações</h2>
                        <div className=" flex flex-row justify-between">
                            <div className="flex flex-col justify-left">
                                <p className="text-xl"><strong>Nome: </strong>{nome} {sobrenome}</p>
                                <p className="text-xl"><strong>Leilão: </strong>{leilao}</p>
                                <p className="text-xl"><strong>Data do lance: </strong>{dataLance}</p>
                            </div>
                            <div className="flex flex-col justify-left">
                                <p className="text-xl"><strong>CPF: </strong>{CPF}</p>
                                <p className="text-xl"><strong>Lance:</strong> R$ {lance}</p>
                                {status === "PAID" ? <p className="text-xl"><strong>Data do pagamento: </strong>{dataPagamento}</p> 
                                : status === "PENDIN" ? '' : ''}
                            </div>
                        </div>

                        {/* Bolinha status */}
                        <div className="text-center mt-6">
                            {status === "PENDING" ? '' : status === "PAID" ? '' : <p className="text-xl text-center my-5">Este usuário <strong>NÂO</strong> efetuou o pagamento do leilão, então uma penalidade foi aplicada à ele.</p>}
                            {status === "PENDING" ? <div><div><h2 className="mb-4 mt-16 text-2xl"><strong>Aguardando o pagamento</strong></h2></div> <div className="rounded-full mx-auto mt-1 text-6xl"><i className="fa-solid fa-spinner animate-spin"></i></div></div>
                            : status === "PAID" ? <div><div><h2 className="mb-4 text-2xl"><strong>Leilão já pago</strong></h2></div> <div className="rounded-full mx-auto mt-1 text-6xl bg-green-500 w-[70px] h-[70px] flex items-center justify-center text-white animate-pulse"><i className="my-auto fa-solid fa-check"></i></div></div>
                            : <div className="rounded-full mx-auto mt-1 text-6xl bg-red-600 w-[70px] h-[70px] flex items-center justify-center text-white animate-pulse"><i className="fa-solid fa-exclamation"></i></div>}   
                            {status === "PAID" ? <button className="rounded-full bg-yellow-300 border-2 border-black text-xl hover:text-2xl py-2 px-5 text-center mt-5" onClick={gerarPDF}>Baixar Etiqueta</button> : ''}
                        </div>
                    </div>
                </Modal>
            </div>
        ))}
        </>
    )
}