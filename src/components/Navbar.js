import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import logoApae from './logoApae.jpg'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export default function Navbar({...props}){
    const [menu, setMenu] = useState(false)
    const [validado, setValidado] = useState()

    // REDIRECT
    const history = useNavigate();
    menu ? disableBodyScroll(document) : enableBodyScroll(document)

    async function login(){
        await fetch(process.env.REACT_APP_API+'/get-user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token') ? localStorage.getItem('token') : '',
            }   
        }).then(response => {
            if(response.ok){
                return response.json()
            }else{
                return Promise.reject(response);
                
            }
        }).then(data => {
            if(data.status === 401){
                setValidado(false)
            }else{
                if(data.body.status_account === 'PENDING'){
                    setTimeout(() => {
                        history('/validacao')
                    }, 1000);   
                }
                data.body.status_account === 'ACTIVE' ? setValidado(true) : setValidado(false)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <nav onLoad={login} className="bg-azul p-4 flex justify-between items-center rounded-b-2xl shadow-xl z-50">
            <img className="w-[200px]" src={logoApae} alt="Logo da APAE"/>
            <ul className={`flex gap-16 items-center text-3xl text-white ${menu ? 'max-lg:absolute max-lg:bg-black max-lg:bg-opacity-90 max-lg:flex-col max-lg:bottom-0 max-lg:left-0 max-lg:w-full max-lg:h-full max-lg:justify-center max-lg:items-center' : 'max-lg:hidden'}`}>
                <li className={`${props.pag === 'Inicio' ? "text-yellow-400 underline" : ""}`}><Link to='/'>Início</Link></li>
                <li className={`${props.pag === 'Participados' ? "text-yellow-400 underline" : ""}`}><Link to='/participados'>Leilões Participados</Link></li>
                <li className={`${props.pag === 'Perfil' ? "text-yellow-400 underline" : ""}`}><Link to={`${validado ? '/meuPerfil' : '/login'}`}>Meu Perfil</Link></li>
                <li className="absolute top-5 right-5 hidden max-lg:block"><label onClick={(e)=>{setMenu(!menu)}}><i className="fa-solid fa-x"></i></label></li>
                <Link className="bg-yellow-300 text-black py-4 px-5 text-2xl rounded-full font-semibold" to={validado ? "/meuPerfil" : "/login"}><i className="fa-regular fa-circle-user"></i>{validado ? " Logado" : " Login"}</Link>
            </ul>
            <div className="flex items-center justify-center gap-4">
                <button className="text-4xl hidden text-white max-lg:block" onClick={(e) => {setMenu(!menu)}}><i className="fa-solid fa-bars"></i></button>
            </div>
        </nav>
    )
}