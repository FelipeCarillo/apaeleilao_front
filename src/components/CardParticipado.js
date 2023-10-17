export default function CardParticipados({data}){
    return (
        <>
        {data.map((data) => (
            <div className="border-2 border-black rounded-[25px]">
            <div>
                <img src={data.img} alt="Imagem do evento" className="w-[100%] h-[250px] rounded-t-[25px] object-cover"/>
            </div>
            <div className="text-center">
                <p className="text-2xl pb-0">{data.nome}</p>
                <p className="text-lg pb-2">{data.categoria}</p>
                <p className="text-2xl"><strong>Lance: {data.lance}</strong></p>
                <p className="text-lg">Prazo: {data.prazo}</p>
                {data.condicao === "Participou" ? <button className="bg-azul p-2 border-2 border-black rounded-[45px] w-[80%] my-3 text-white text-xl" disabled>Partipou</button> 
                : data.condicao === 'Andamento' ? <button className="bg-yellow-300 p-2 border-2 border-black rounded-[45px] w-[80%] my-3 text-xl">Pagar</button>
                : data.condicao === 'Pago' ? <button className="bg-verde p-2 border-2 border-black rounded-[45px] w-[80%] my-3 text-white text-xl" disabled> <i className="fa-solid fa-check"></i> </button> 
                : <button className="bg-vermelho p-2 border-2 border-black rounded-[45px] w-[80%] my-3 text-white text-xl" disabled> <i className="fa-solid fa-x"></i> </button>}
            </div>
        </div>
        ))}
        </>
    )
}