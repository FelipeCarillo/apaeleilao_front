import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import CardParticipados from "../../components/CardParticipado"
import { useEffect, useState } from "react";

export default function Participados() {
    const [leiloes, setLeiloes] = useState([]);
    useEffect(() => {
        fetch(process.env.REACT_APP_API + "/get-all-auctions-user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token"),
          },
        })
          .then((response) => {
            if(response.ok){
              return response.json();
            }else{
              return Promise.reject(response);
            }
          }).then((data) => {
            console.log(data);
            setLeiloes(data.body.auctions);
          }).catch((error) => {
            console.log(error.json());
          });
      }, []);

    function Dropdown(){
      var x = document.getElementById('myDIV');
      if (x.style.display === 'flex') {
        x.style.display = 'none';
      } else {
        x.style.display = 'flex';
        console.log(leiloes.length);
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
                    <button onClick={Dropdown} className="w-[100%] flex justify-center bg-yellow-300 text-3xl rounded-full py-2 px-5 font-medium max-md:text-3xl text-center">Filtro <i className="fa-solid fa-filter"></i></button>
                    <div id="myDIV" className="hidden flex-col mt-1 border border-black absolute bg-white w-[228px] md:w-[315px]">
                      <button className="text-xl hover:bg-azul">Participou</button>
                      <button className="text-xl hover:bg-azul">Pagar</button>
                      <button className="text-xl hover:bg-azul">Pago</button>
                      <button className="text-xl hover:bg-azul">Não pago</button>
                    </div>
                  </div>
                </div>
            </section>
            <div>
              {leiloes.length > 0 ? 
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-[70px] gap-10 mb-10">
                  <CardParticipados data={leiloes}/>
                </section>
              : 
                <div id="Aviso" className="px-2 text-xl md:text-4xl w-[100%] m-auto text-center mb-10">
                  <p>Você não participou de nenhum leilão até o momento.</p>
                </div>
              }
            </div>
        </main>

        <Footer />
        </>
    )
}