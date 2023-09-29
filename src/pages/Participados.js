import { useState } from "react"
import { Link } from "react-router-dom"
import Rodape from "../components/Rodape"

export default function Participados() {
    const imgLogo = 'https://apaeleilaoimt.s3.sa-east-1.amazonaws.com/galery/logo-apaeleilao-branco.jpg'
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

        <main>
            CONTEUDO
        </main>
        <Rodape/>
        </>
    )
}