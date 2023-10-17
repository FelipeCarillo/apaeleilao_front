export default function CardCriados({data}){
    return (
        <>
        {data.map((data) => (
            <div className="border-2 border-black rounded-[25px]">
                <div>
                    <button className="absolute bg-yellow-40"><i className="fa-solid fa-trash-can"></i></button>
                    <img src={data.img} alt="Imagem do evento" className="w-[100%] h-[250px] rounded-t-[25px] object-cover"/>
                </div>
                <div className="text-center">
                    <p className="text-2xl pb-0">{data.nome}</p>
                    <p className="text-lg pb-2">{data.categoria}</p>
                    <p className="text-2xl"><strong>Lance: {data.lance}</strong></p>
                    <button className="bg-yellow-300">Editar</button>
                    <div className="flex justify-center gap-2">
                        <div>
                            <p className="text-lg">Abre: {data.abertura}</p>
                        </div>
                        <div>
                            <p className="text-lg">Encerra: {data.encerramento}</p>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        </>
    )
}