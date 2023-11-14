export default function CardCriados({data}){
    return (
        <>
        {data.map((data, index) => (
            <div key={index} className="border-2 border-black rounded-[25px]">
                <div>
                    <div className="relative">
                        <button className="absolute mt-1 me-1 top-0 right-0 bg-yellow-300 text-xl rounded-full py-1 px-2"><i className="fa-solid fa-trash-can"></i></button>
                    </div>
                    <img src={data.img} alt="Imagem do evento" className="w-[100%] h-[250px] rounded-t-[25px] object-cover"/>
                </div>
                <div className="text-center">
                    <p className="text-2xl pb-0">{data.nome}</p>
                    <p className="text-lg pb-2">{data.categoria}</p>
                    <p className="text-2xl"><strong>Lance: {data.lance}</strong></p>
                    <button className="bg-yellow-300 py-2 px-10 text-xl rounded-full cursor-pointer mt-1">Editar</button>
                    <div className="flex justify-between gap-2">
                        <div>
                            <p className="text-md text-left ms-2 py-0 my-0">Abre:</p>
                            <p className="text-md text-left ms-2 py-0 my-0">{data.abertura}</p>
                        </div>
                        <div>
                            <p className="text-md text-right me-2 py-0 my-0">Encerra:</p>
                            <p className="text-md text-right me-2 py-0 my-0">{data.encerramento}</p>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        </>
    )
}