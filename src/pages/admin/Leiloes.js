import NavbarAdmin from "../../components/NavbarAdmin";
import Footer from "../../components/Footer";
import CardCriados from "../../components/CardCriado"

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
  
    function Dropdown(){
      var x = document.getElementById('myDIV');
      if (x.style.display === 'flex') {
        x.style.display = 'none';
      } else {
        x.style.display = 'flex';
      }
    }

    function LeiloesC(){
      var a = document.getElementById('LeiloesCriados');
      var b = document.getElementById('LeiloesCriadosCards');
      var c = document.getElementById('LeiloesFinalizados');
      var d = document.getElementById('LeiloesFinalizadosCards');
      a.style.display = 'flex';
      b.style.display = 'grid';
      c.style.display = 'none';
      d.style.display = 'none';
    }

    function LeiloesF(){
      var a = document.getElementById('LeiloesCriados');
      var b = document.getElementById('LeiloesCriadosCards');
      var c = document.getElementById('LeiloesFinalizados');
      var d = document.getElementById('LeiloesFinalizadosCards');
      a.style.display = 'none';
      b.style.display = 'none';
      c.style.display = 'flex';
      d.style.display = 'grid';
    }
    
    return (
        <>
            <NavbarAdmin />

            <main>
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
              </main>
            
            <Footer />
        </>
    )
}