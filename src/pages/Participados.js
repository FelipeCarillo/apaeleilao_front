import { useState } from "react"
import { Link } from "react-router-dom"
import Rodape from "../components/Rodape"
import CardParticipados from "../components/CardParticipados"

export default function Participados() {
    const imgLogo = 'https://apaeleilaoimtphotos.s3.sa-east-1.amazonaws.com/logo-apaeleilao/logo-apaeleilao-branco.jpg'
    const [menu, setMenu] = useState(false)

    return (
        <>
        <header className="bg-blue-600 p-4 flex justify-between items-center">
            <img className="w-[200px]" src={imgLogo} alt="Logo da APAE"/>
            <ul className={`flex gap-16 items-center text-3xl text-white ${menu ? 'max-lg:absolute max-lg:bg-black max-lg:flex-col max-lg:bottom-0 max-lg:left-0 max-lg:w-full max-lg:h-full max-lg:justify-center max-lg:items-center' : 'max-lg:hidden'}`}>
                <li><Link to='/'>Início</Link></li>
                <li className="text-yellow-400 border-b-2 border-yellow-400"><Link to='/participados'>Leilões Participados</Link></li>
                <li><Link to='/meuPerfil'>Meu Perfil</Link></li>
                <li className="absolute top-5 right-5 hidden max-lg:block"><label onClick={(e)=>{setMenu(!menu)}}><i className="fa-solid fa-x"></i></label></li>
                <Link className="bg-yellow-300 text-black py-4 px-5 text-2xl rounded-full font-semibold" to='/login'><i class="fa-regular fa-circle-user"></i> Login</Link>
            </ul>
            <div className="flex items-center justify-center gap-4">
                <label className="text-4xl hidden text-white max-lg:block" onClick={(e) => {setMenu(!menu)}}><i class="fa-solid fa-bars"></i></label>
            </div>
        </header>

        <main className="p-8">
            <h2 className="text-6xl text-center mb-4 max-sm:text-4xl">Leilões Participados</h2>
            <div className="flex gap-8 mb-4 max-md:flex-col max-md:items-center">
                <input className="border-2 border-black rounded-lg py-2 text-2xl max-sm:text-lg px-2 w-full" type="text" placeholder="Pesquisar"/>
                <button className="flex items-center gap-4 bg-yellow-300 px-8 py-2 text-2xl max-sm:text-lg rounded-lg hover:bg-yellow-400">Filtrar<i className="fa-solid fa-filter"></i></button>
            </div>
            <div className="h-[1px] w-full bg-black"/>
            <div className="grid grid-cols-1 my-4 gap-10 lg:gap-18 max-sm:mx-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <CardParticipados nome='Fusca de 3 Portas' preco="1.000" prazo='23/05/2023 (3 dias)' podio='' stage='P'/>
                <CardParticipados nome='Celta Preto' preco="1.000" prazo='' podio='' stage='C'/>
                <CardParticipados nome='Ford Ka' preco="1.000" prazo='' podio='' stage='E'/>
                <CardParticipados nome='Jetta' preco="1.000" prazo='' podio='2º lugar' stage='B'/>
                <CardParticipados nome='Corsa' preco="1.000" prazo='23/05/2023 (3 dias)' podio='' stage='C'/>
                <CardParticipados nome='Ford Ka' preco="1.000" prazo='' podio='' stage='E'/>
            </div>
        </main>
        <Rodape/>
        </>
    )
}