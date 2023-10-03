import { useState } from "react"
import { Link } from "react-router-dom"
import Rodape from "../components/Rodape"

export default function MeuPerfil(){
    const imgLogo = 'https://apaeleilaoimtphotos.s3.sa-east-1.amazonaws.com/logo-apaeleilao/logo-apaeleilao-branco.jpg'
    const [menu, setMenu] = useState(false)
    const [viewPass, setviewPass] = useState(false)

    return (
        <>
        <header className="bg-blue-600 p-4 flex justify-between items-center">
            <img className="w-[200px]" src={imgLogo} alt="Logo da APAE"/>
            <ul className={`flex gap-16 items-center text-3xl text-white ${menu ? 'max-lg:absolute max-lg:bg-black max-lg:flex-col max-lg:bottom-0 max-lg:left-0 max-lg:w-full max-lg:h-full max-lg:justify-center max-lg:items-center' : 'max-lg:hidden'}`}>
                <li><Link to='/'>Início</Link></li>
                <li><Link to='/participados'>Leilões Participados</Link></li>
                <li className="text-yellow-400 border-b-2 border-yellow-400"><Link to='/meuPerfil'>Meu Perfil</Link></li>
                <li className="absolute top-5 right-5 hidden max-lg:block"><label onClick={(e)=>{setMenu(!menu)}}><i className="fa-solid fa-x"></i></label></li>
                <Link className="bg-yellow-300 text-black py-4 px-5 text-2xl rounded-full font-semibold" to='/login'><i class="fa-regular fa-circle-user"></i> Login</Link>
            </ul>
            <div className="flex items-center justify-center gap-4">
                <label className="text-4xl hidden text-white max-lg:block" onClick={(e) => {setMenu(!menu)}}><i class="fa-solid fa-bars"></i></label>
            </div>
        </header>
        <main>
            <section className="flex flex-col items-center gap-8 my-5">
                <img className="w-[300px] rounded-full border-2 border-black" src="http://via.placeholder.com/500x500" alt="Foto de Perfil"/>
            <div className="w-[80%] h-[1px] bg-black"/>
            </section>
            <section className="flex flex-col gap-4 mx-12 mb-12 lg:mx-64">
                <div className="flex flex-col">
                    <label className="text-2xl" htmlFor="name">Nome:</label>
                    <input className="border-2 border-black rounded-md h-10" type="text" name="name" id="name"/>
                </div>

                <div className="flex flex-col">
                    <label className="text-2xl" htmlFor="email">Email:</label>
                    <input className="border-2 border-black rounded-md h-10" type="text" name="email" id="email"/>
                </div>

                <div className="flex flex-col">
                    <label className="text-2xl" htmlFor="phone">Celular:</label>
                    <input className="border-2 border-black rounded-md h-10" type="text" name="phone" id="phone"/>
                </div>

                <div className="flex flex-col">
                    <label className="text-2xl" htmlFor="password">Senha:</label>
                    <div className="flex justify-between items-center">
                        <input className="w-[90%] border-2 border-black rounded-md text-2xl h-10" type={`${viewPass ? 'text' : 'password'}`} name="password" id="password"/>
                        <label onClick={(e) => setviewPass(!viewPass)}><i className={`${viewPass ? 'fa-solid fa-eye-slash text-2xl' : "fa-solid fa-eye text-2xl"}`}></i></label>
                    </div>
                    <p className="text-xl underline">Redefinir Senha</p>
                </div>
            </section>
        </main>
        <Rodape />
        </>
    )
}