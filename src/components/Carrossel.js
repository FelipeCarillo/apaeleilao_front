import React, { useState } from "react";

const Carrossel = ({ data }) => {
  const [currentCard, setCurrentCard] = useState(0);

  const nextCard = () => {
    setCurrentCard((prevCard) => (prevCard === data.length - 1 ? 0 : prevCard + 1));
  };

  const prevCard = () => {
    setCurrentCard((prevCard) => (prevCard === 0 ? data.length - 1 : prevCard - 1));
  };

  const visibleCards = data.slice(currentCard, currentCard + getVisibleCardCount());

  function getVisibleCardCount(){
    if(window.innerWidth < 768){
        return 1
    } else if(window.innerWidth < 1330) {
        return 2
    } else {
        return 3
    }
  }

  return (
    <div className="relative">
        <button className="absolute top-1/2 left-4 transform -translate-y-1/2 hover:text-gray-600" onClick={prevCard}>
            &#9664;
        </button>
        <button className="absolute top-1/2 right-4 transform -translate-y-1/2 hover:text-gray-600" onClick={nextCard}>
            &#9654;
        </button>
        <div className="flex justify-around overflow-hidden">
            {visibleCards.map((item, index) => (
                <div key={index} className={`border-2 text-black text-center bg-white rounded-2xl`}>
                    {/* Conteúdo do card */}
                    <img className=" rounded-t-2xl shadow-lg mb-4 w-full h-[300px]" src={item.img} alt={item.imgDesc}/>
                    <div className="px-2">
                        <h2 className="text-2xl">{item.nome}</h2>
                        <p>{item.descricao}</p>
                        <p className="font-bold text-xl">R${item.preco}</p>
                        <div>
                            <p>Abre: 23/08/2023 - 14:00</p>
                            <p>Encerra:23/08/2023 - 16:00</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Carrossel;
