export default function CardParticipados({...props}){

    return (
        <div className="border-2 border-black rounded-2xl shadow-2xl">
            <img className="rounded-t-2xl" src="http://via.placeholder.com/500x500" alt="IMAGEM"/>
            <div className="p-2 text-center flex flex-col items-center">
                <h2 className="text-2xl">{props.nome}</h2>
                <p>Usado</p>
                <p className="text-2xl font-bold">Lance: R${props.preco}</p>
                <p className={`${props.prazo === '' ? "hidden" : 'block'}`}>Prazo: {props.prazo}</p>
                <label className={`cursor-pointer px-4 py-2 w-3/4 rounded-full ${props.stage === 'P' ? 'bg-yellow-500 font-medium text-xl': 'hidden'}`}>Pagar</label>
                <label className={`cursor-pointer px-4 py-2 w-3/4 rounded-full mt-6 ${props.stage === 'C' ? 'bg-green-500 text-xl': 'hidden'}`}><i className="fa-solid fa-check"></i></label>
                <label className={`cursor-pointer px-4 py-2 w-3/4 rounded-full mt-6 ${props.stage === 'E' ? 'bg-red-500 text-xl': 'hidden'}`}><i className="fa-solid fa-x"></i></label>
                <label className={`cursor-pointer px-4 py-2 w-3/4 rounded-full mt-6 ${props.stage === 'B' ? 'bg-blue-500 text-white font-medium text-xl': 'hidden'}`}>Participou</label>
            </div>
        </div>
    )
}