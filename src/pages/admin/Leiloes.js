import NavbarAdmin from "../../components/NavbarAdmin";
import Footer from "../../components/Footer";
import CardCriados from "../../components/CardCriado"
import { useEffect, useState, useRef } from "react";
import moment from "moment";
import CurrencyInput from "react-currency-input-field";

export default function Leiloes() {
    const participados = [
        {"img" : "https://picsum.photos/200/300",
        "nome" : "Evento 1", 
        "categoria" : "Categoria 1", 
        "lance" : "R$ 100,00", 
        "prazo" : "10/10/2021",
        "abertura" : "10/10/2021",
        "encerramento" : "10/10/2021"},
      ]

    const [nome, setNome] = useState("Nome do Produto");
    const [valor, setValor] = useState("Valor do Produto");
    const [desc, setDesc] = useState("");
    const [abertura, setAbertura] = useState("xx/xx/xx xx:xx");
    const [duracao, setDuracao] = useState("xx:xx");
    const [img, setImg] = useState("");
    const [closeModal, setCloseModal] = useState(false);
    const focusScreen = useRef(null);

  
    function Dropdown({}){
      var x = document.getElementById('myDIV');
      if (x.style.display === 'flex') {
        x.style.display = 'none';
      } else {
        x.style.display = 'flex';
      }
    }

    function LeiloesC({}){
      var a = document.getElementById('LeiloesCriados');
      var b = document.getElementById('LeiloesCriadosCards');
      var c = document.getElementById('LeiloesFinalizados');
      var d = document.getElementById('LeiloesFinalizadosCards');
      a.style.display = 'flex';
      b.style.display = 'grid';
      c.style.display = 'none';
      d.style.display = 'none';
    }

    function LeiloesF({}){
      var a = document.getElementById('LeiloesCriados');
      var b = document.getElementById('LeiloesCriadosCards');
      var c = document.getElementById('LeiloesFinalizados');
      var d = document.getElementById('LeiloesFinalizadosCards');
      a.style.display = 'none';
      b.style.display = 'none';
      c.style.display = 'flex';
      d.style.display = 'grid';
    }

    function fecharTecla(tecla){
      if(tecla.key === 'Escape'){
        setCloseModal(false);
      }
    }

    useEffect(()=>{
      focusScreen.current.focus();
    },[closeModal])
    
    return (
        <>
            <NavbarAdmin />

            <main className="relative">
              <ul className="grid grid-cols-2 border-b-2 mt-8 pb-2 mx-16">
                <li className="col-span-1 text-center">
                  <button className="text-4xl text-center" onClick={LeiloesC}>
                    Leilões Criados
                  </button>
                </li>
                <li className="col-span-1 text-center">
                  <button className="text-4xl text-center" onClick={LeiloesF}>
                    Leilões Finalizados
                  </button>
                </li>
              </ul>
              
              <section id="LeiloesCriados" className="px-4 py-8 mb-12 mx-[60px] flex flex-col gap-x-8 items-center pb-2 border-b border-black">
                <div className="grid grid-cols-10 gap-3 w-[95%]">
                  <div className="col-span-10">
                    <input className="w-[100%] h-14 shadow appearance-none border-2 border-black rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Pesquisar..."/>
                  </div>
                </div>
              </section>
              <section id="LeiloesCriadosCards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-[70px] gap-10 mb-10">
                <CardCriados data={participados}/>
              </section>

              <section id="LeiloesFinalizados" className="hidden px-4 py-8 mb-12 mx-[60px] flex-col gap-x-8 items-center pb-2 border-b border-black">
                <div className="grid grid-cols-10 gap-3 w-[95%]">
                  <div className="col-span-10 md:col-span-8">
                    <input className="w-[100%] h-14 shadow appearance-none border-2 border-black rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Pesquisar..."/>
                  </div>
                  <div className="col-span-10 md:col-span-2">
                    <button onClick={Dropdown} className="w-[100%] relative bg-yellow-300 text-3xl rounded-full py-2 px-5 font-medium max-md:text-3xl text-center">Filtro <i className="fa-solid fa-filter"></i></button>
                    <div id="myDIV" className="hidden flex-col mt-1 border border-black absolute bg-white w-[228px] md:w-[16%]">
                      <button className="text-xl hover:bg-azul">Participou</button>
                      <button className="text-xl hover:bg-azul">Pagar</button>
                      <button className="text-xl hover:bg-azul">Pago</button>
                      <button className="text-xl hover:bg-azul">Não pago</button>
                    </div>
                  </div>
                </div>
              </section>
              <section id="LeiloesFinalizadosCards" className="hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-[70px] gap-10 mb-10">
                <CardCriados data={participados}/>
              </section>
              <div className="w-[100%] text-center">
                <button className="bg-yellow-300 p-2 border-2 border-black rounded-[45px] w-[20%] mb-3 text-xl" onClick={()=>{setCloseModal(true)}}>Adicionar leilão</button>
              </div>

              <div className={`fixed flex-col inset-0 m-auto bg-black bg-opacity-80 w-[100%] h-screen text-center ${closeModal ? "flex" : "hidden"}`} onKeyDown={fecharTecla} ref={focusScreen} tabIndex={0}>
                <div className="absolute flex-col inset-0 m-auto bg-white w-[80%] h-[700px] text-center">
                  <div className="relative">
                    <div className="bg-azul">
                      <button className="absolute top-0 right-0 me-2 text-4xl text-vermelho" onClick={()=>{setCloseModal(false)}}><i class="fa-solid fa-xmark"></i></button>
                      <h6 className="text-4xl text-center py-2 mb-10 text-white">Criação de Leilão</h6>
                    </div>
                    <div className="flex">
                      <div className="w-[50%] border-r-2 border-black">
                        <div className="border-2 border-black rounded-[25px] w-[60%] mx-auto">
                          <div>
                              <img src={img} alt="Imagem do evento" className="w-[100%] h-[250px] rounded-t-[25px] object-cover"/>
                          </div>
                          <div className="text-center">
                              <p className="text-2xl pb-2">{nome}</p>
                              <p className="text-2xl pb-2"><strong>Lance Inicial: {valor}</strong></p>
                              <div className="flex justify-between px-2">
                                <div className="text-left">
                                  <p className="text-lg">Data de início:</p>
                                  <p>{moment(abertura).format("DD/MM/YYYY HH:mm")}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-lg">Duração:</p>
                                  <p>{duracao}</p>
                                </div>
                              </div>
                          </div>
                        </div>
                        <div>
                          {/* <button className="bg-yellow-300 p-2 border-2 border-black rounded-[45px] w-[40%] my-3 text-xl">Adicionar imagem</button> */}
                          <input className="bg-yellow-300 p-2 border-2 border-black rounded-[45px] w-[40%] my-3 text-xl" type="file" required></input>
                        </div>
                      </div>
                      <div className="w-[50%] border-l-2 border-black text-left">
                        <div className="flex flex-col w-[90%] mx-auto">
                          <label className="text-2xl">Nome do evento</label>
                          <input className=" mb-2 border-2 border-black rounded text-lg ps-1" type="text" placeholder="Nome do evento: Kit de Panelas" onChange={(e)=>{setNome(e.target.value)}}/>
                        </div>
                        <div className="flex flex-col w-[90%] mx-auto">
                          <label className="text-2xl">Valor</label>
                          <CurrencyInput className=" mb-2 border-2 border-black rounded text-lg ps-1" placeholder="Valor: 00,00" maxLength={13} decimalsLimit={2} prefix={`R$`} onChange={(e)=>{setValor(e.target.value)}}/>
                        </div>
                        <div className="flex flex-col w-[90%] mx-auto">
                          <label className="text-2xl">Descrição</label>
                          <textarea className=" mb-2 border-2 h-[200px] border-black rounded text-lg resize-none ps-1" placeholder="Descrição" onChange={(e)=>{setDesc(e.target.value)}}/>
                        </div>
                        <div className="flex justify-between w-[90%] mx-auto text-left">
                          <div className="flex flex-col">
                            <label className="text-2xl">Data de início</label>
                            <input className=" mb-2 border-2 border-black rounded text-lg" type="datetime-local" placeholder="Data de início" onChange={(e)=>{setAbertura(e.target.value)}}/>
                          </div>
                          <div className="flex flex-col text-right pb-5">
                            <label className="text-2xl">Duração</label>
                            <div className="text-center">
                              <input className="ps-1 text-lg border-2 border-black rounded" type="time" placeholder="Duração" onChange={(e)=>{setDuracao(e.target.value)}}/>
                              <p>Hora:Min</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                        <button className="bg-yellow-300 p-2 border-2 border-black rounded-[45px] w-[40%] mt-10 text-xl">Criar leilão</button>
                    </div>
                  </div>
                </div>
              </div>
              </main>
            <Footer />
        </>
    )
}