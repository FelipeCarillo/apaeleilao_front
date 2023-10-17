import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import CardParticipados from "../../components/CardParticipado"

export default function Participados() {
    const participados = [
      {"img" : "https://picsum.photos/200/300",
      "nome" : "Evento 1", 
      "categoria" : "Categoria 1", 
      "lance" : "R$ 100,00", 
      "prazo" : "10/10/2021", 
      "condicao" : "Participou"
      },
      {"img" : "https://picsum.photos/200/300",
      "nome" : "Evento 2",
      "categoria" : "Categoria 2",
      "lance" : "R$ 200,00",
      "prazo" : "10/10/2021",
      "condicao" : "Andamento"
      },
      {"img" : "https://picsum.photos/200/300",
      "nome" : "Evento 3",
      "categoria" : "Categoria 3",
      "lance" : "R$ 300,00",
      "prazo" : "10/10/2021",
      "condicao" : "Pago"
      },
      {"img" : "https://picsum.photos/200/300",
      "nome" : "Evento 4",
      "categoria" : "Categoria 4",
      "lance" : "R$ 400,00",
      "prazo" : "10/10/2021",
      "condicao" : "Não Pago"
      },
      {"img" : "https://picsum.photos/200/300",
      "nome" : "Evento 5",
      "categoria" : "Categoria 5",
      "lance" : "R$ 500,00",
      "prazo" : "10/10/2021",
      "condicao" : "Não Pago"
      },
    ]

    function Dropdown({}){
      var x = document.getElementById('myDIV');
      if (x.style.display === 'flex') {
        x.style.display = 'none';
      } else {
        x.style.display = 'flex';
      }
    }

    return (
        <>
        <Navbar pag='Participados'/>

        <main>
            <h1 className="text-4xl text-center mt-8">Participados</h1>
            <section className="px-4 py-8 mb-12 mx-[60px] flex flex-col gap-x-8 items-center pb-2 border-b border-black">
                <div className="grid grid-cols-10 gap-3 w-[95%]">
                  <div className="col-span-10 md:col-span-8">
                    <input className="w-[100%] h-14 shadow appearance-none border-2 border-black rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Pesquisar..."/>
                  </div>
                  <div className="col-span-10 md:col-span-2">
                    <button onClick={Dropdown} className="w-[100%] relative bg-yellow-300 text-3xl rounded-full py-2 px-5 font-medium max-md:text-3xl text-center">Filtro <i className="fa-solid fa-filter"></i></button>
                    <div id="myDIV" className="hidden flex-col mt-1 border border-black absolute bg-white w-[228px] md:w-[315px]">
                      <button className="text-xl hover:bg-azul">Participou</button>
                      <button className="text-xl hover:bg-azul">Pagar</button>
                      <button className="text-xl hover:bg-azul">Pago</button>
                      <button className="text-xl hover:bg-azul">Não pago</button>
                    </div>
                  </div>
                </div>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-[70px] gap-10 mb-10">
              <CardParticipados data={participados}/>
            </section>
        </main>

        <Footer />
        </>
    )
}