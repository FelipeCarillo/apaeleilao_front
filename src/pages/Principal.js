import { useState } from "react"
import { Link } from "react-router-dom"
import Carrossel from "../components/Carrossel"
import Rodape from "../components/Rodape"

export default function Principal() {
    const imgLogo = 'https://apaeleilaoimtphotos.s3.sa-east-1.amazonaws.com/logo-apaeleilao/logo-apaeleilao-branco.jpg'
    const [menu, setMenu] = useState(false)

    const data = [
        {
            img: 'http://via.placeholder.com/500x500',
            imgDesc: 'Imagem 1',
            nome: "Exemplo1",
            descricao: 'Usado',
            preco: '3.000,00'
        },
        {
            img: 'http://via.placeholder.com/500x500',
            imgDesc: 'Imagem 2',
            nome: "Exemplo2",
            descricao: 'novo',
            preco: '2.000,00'
        },
        {
            img: 'http://via.placeholder.com/500x500',
            imgDesc: 'Imagem 3',
            nome: "Exemplo3",
            descricao: 'Usado',
            preco: '1.600,00'
        },
        {
            img: 'http://via.placeholder.com/500x500',
            imgDesc: 'Imagem 4',
            nome: "Exemplo4",
            descricao: 'Usado',
            preco: '6.000,00'
        },
        {
            img: 'http://via.placeholder.com/500x500',
            imgDesc: 'Imagem 5',
            nome: "Exemplo5",
            descricao: 'Usado',
            preco: '750,00'
        },
    ]

    return (
        <>
        <header className="bg-blue-600 p-4 flex justify-between items-center">
            <img className="w-[200px]" src={imgLogo} alt="Logo da APAE"/>
            <ul className={`flex gap-16 items-center text-3xl text-white ${menu ? 'max-lg:absolute max-lg:bg-black max-lg:flex-col max-lg:bottom-0 max-lg:left-0 max-lg:w-full max-lg:h-full max-lg:justify-center max-lg:items-center' : 'max-lg:hidden'}`}>
                <li className="text-yellow-400 border-b-2 border-yellow-400"><Link to='/'>Início</Link></li>
                <li><Link to='/participados'>Leilões Participados</Link></li>
                <li><Link to='/meuPerfil'>Meu Perfil</Link></li>
                <li className="absolute top-5 right-5 hidden max-lg:block"><label onClick={(e)=>{setMenu(!menu)}}><i className="fa-solid fa-x"></i></label></li>
                <Link className="bg-yellow-300 text-black py-4 px-5 text-2xl rounded-full font-semibold" to='/login'><i class="fa-regular fa-circle-user"></i> Login</Link>
            </ul>
            <div className="flex items-center justify-center gap-4">
                <label className="text-4xl hidden text-white max-lg:block" onClick={(e) => {setMenu(!menu)}}><i class="fa-solid fa-bars"></i></label>
            </div>
        </header>

        <main>
            <section className="px-4 py-8 mb-12 flex flex-col gap-8 items-center">
                <h1 className="text-4xl text-center">Leilão Ativo</h1>
                {/* CARD LEITAO ATIVO */}
                <div className="flex border-2 border-black rounded-xl max-md:flex-col">
                    <img className="rounded-l-xl w-[300px] max-md:rounded-xl max-md:w-full max-md:h-[300px]" src="http://via.placeholder.com/500x500" alt="Imagem do Leilão"/>
                    <div className="flex flex-col w-full items-end gap-12 p-4 max-md:flex-col max-md:items-center">
                        <div className="flex flex-col self-start gap-2 text-lg">
                            <div>
                                <h2 className="text-3xl">Exemplo</h2>
                                <p className="text-2xl">Usado</p>
                            </div>
                            <p>Informações</p>
                            <p>Data: 23/08/2023 - 12:00 à 14:00</p>
                        </div>
                        <div className="flex justify-between gap-12 items-center w-full max-md:flex-col">
                            <p className="font-bold text-3xl">Lance: R$18.000,00</p>
                            <label className="bg-yellow-300 text-3xl rounded-full py-2 px-5 font-medium max-md:text-3xl"><i class="fa-solid fa-gavel"></i> Dar Lance</label>
                        </div>
                    </div>
                </div>
            </section>

            <section className="text-white bg-blue-500 py-8">
                <h1 className="text-center text-4xl underline mb-8">Próximos Leilões</h1>
                <Carrossel data={data}/>
            </section>
        </main>
        <Rodape/>
        </>
    )
}