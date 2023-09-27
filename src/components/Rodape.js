import React from "react"
import { Link } from "react-router-dom"

export default function Rodape(){
    const imgLogo = 'https://apaeleilaoimt.s3.sa-east-1.amazonaws.com/galery/logo-apaeleilao-branco.jpg'

    return (
        <footer className="bg-blue-600 h-full p-32">
            <div className="flex flex-wrap gap-8 justify-around items-center border-b-2 border-dotted border-yellow-500 pb-8 mb-8">
                <img src={imgLogo} width='300' alt="Logo da APAE"/>
                <div className="text-yellow-500">
                    <h2 className="text-2xl font-bold">Navegação</h2>
                    <div className="flex flex-col text-xl">    
                        <Link to='/'><i className="fa-solid fa-check text-green-500"></i> Início</Link>
                        <Link to='/leiloes'><i className="fa-solid fa-check text-green-500"></i> Leilões</Link>
                        <Link to='/participados'><i className="fa-solid fa-check text-green-500"></i> Leilões Participados</Link>
                        <Link to='/login'><i className="fa-solid fa-check text-green-500"></i> Login</Link>
                    </div>
                </div>
                <div className="text-yellow-500 self-start">
                    <h2 className="text-2xl font-bold">Contato</h2>
                    <p><i class="fa-solid fa-location-dot"></i> Alameda São Caetano, 2772 Bairro Santa Maria São Caetano do Sul - SP</p>
                    <p><i class="fa-solid fa-envelope"></i> apaescsul@apaescsul.org.br</p>
                </div>
            </div>
            <p className="text-xl text-center text-yellow-500 font-bold">&copy; Copyright 2023. Todos os Direitos Reservados. Site feito em parceria com o <label className="text-yellow-600">IMT</label></p>
        </footer>
    )
}