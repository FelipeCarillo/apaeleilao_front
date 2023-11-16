import { useEffect, useState, useRef } from "react";

export default function CardCriados({data}){
    const [closeModal, setCloseModal] = useState(false);
    const focusScreen = useRef(null);
    function fecharTecla(tecla) {
        if (tecla.key === "Escape") {
          setCloseModal(false);
        }
      }
    useEffect(() => {
      focusScreen.current.focus();
    }, [closeModal]);
    
    function deletarEvento(auction_id){
        setCloseModal(false);
        console.log(auction_id + "Evento deletado com sucesso!");
    }
    return (
        <>
        {data.map((data, index) => (
            <div key={index} className="border-2 border-black rounded-[25px]">
                <div>
                    <div className="relative">
                        <button className="absolute mt-1 me-1 top-0 right-0 bg-yellow-300 text-xl rounded-full py-1 px-2" onClick={() => {setCloseModal(true);}}><i className="fa-solid fa-trash-can"></i></button>
                    </div>
                    <img src={data.images} alt="Imagem do evento" className="w-[100%] h-[250px] rounded-t-[25px] object-cover"/>
                </div>
                <div className="text-center">
                    <p className="text-2xl pb-0">{data.title}</p>
                    <p className="text-2xl"><strong>Lance: R${data.start_amount}</strong></p>
                    <button className="bg-yellow-300 py-2 px-10 text-xl rounded-full cursor-pointer mt-1">Editar</button>
                    <div className="flex justify-between gap-2">
                        <div>
                            <p className="text-md text-left ms-2 py-0 my-0">Abre:</p>
                            <p className="text-md text-left ms-2 py-0 my-0">{data.start_date}</p>
                        </div>
                        <div>
                            <p className="text-md text-right me-2 py-0 my-0">Encerra:</p>
                            <p className="text-md text-right me-2 py-0 my-0">{data.end_date}</p>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        <div
          className={`fixed flex-col inset-0 m-auto bg-black bg-opacity-80 w-[100%] h-screen text-center ${
            closeModal ? "flex" : "hidden"
          }`}
          onKeyDown={fecharTecla}
          ref={focusScreen}
          tabIndex={0}
        >
            <div className="absolute flex-col inset-0 m-auto bg-white w-[30%] h-[300px] text-center">
                
            <div className="relative m-0">
              <div className="bg-azul">
                <button
                  className="absolute top-0 right-0 me-2 text-4xl text-vermelho"
                  onClick={() => {
                    setCloseModal(false);
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <h6 className="text-4xl text-center py-2 text-white">
                    Deseja excluir o evento {}?
                </h6>
              </div>
              <div className="mt-2">
                <p className="text-xl">Após você deletar o leilao, não será mais possível de recupera-lo, realmente deseja deletar o leilão {}?</p>
              </div>
              <div className="flex py-2 my-auto justify-center mt-4">
                    <button className="bg-azul p-2 border-2 rounded-[10px] w-[55%] h-[70px] my-5 text-white text-xl mx-[2px]" onClick={() => {deletarEvento(data.auction_id)}}>Sim, desejo deletar o leilão</button>
                    <button className="bg-gray-500 p-2 border-2 rounded-[10px] w-[30%] h-[70px] my-5 text-white text-xl mx-[2px]" onClick={() => {setCloseModal(false);}}>Não</button>
                </div>
            </div>

            </div>
        </div>
        </>
    )
}