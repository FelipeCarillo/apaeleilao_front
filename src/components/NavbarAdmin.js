import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom"
import LogoApae from './logoApae.jpg'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export default function NavbarAdmin({...props}){
    const [menu, setMenu] = useState(false)
    
    menu ? disableBodyScroll(document) : enableBodyScroll(document)

    useEffect(() => {
        login()
    }, [])

    const [validado, setValidado] = useState()
    const [user, setUser] = useState('')

    function login(){
        fetch(process.env.REACT_APP_API+'/get-user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
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
                setValidado(true)
                setUser(data.body.first_name ? data.body.first_name : 'ADMIN')
            }
        }).catch(error => {
        })
    }

    return (
        <>
        <nav className="bg-azul p-4 flex justify-between items-center rounded-b-2xl shadow-xl z-50">
            <img className="w-[200px]" src={LogoApae} alt="Logo da APAE"/>
            <ul className={`flex gap-16 items-center text-3xl text-white ${menu ? 'max-lg:absolute max-lg:bg-black max-lg:bg-opacity-90 max-lg:flex-col max-lg:bottom-0 max-lg:left-0 max-lg:w-full max-lg:h-full max-lg:justify-center max-lg:items-center max-lg:overscroll-none' : 'max-lg:hidden'}`}>
                <li className={`${props.pag === undefined ? "text-yellow-400 underline" : ""}`}><Link to='/admin'>Leilões</Link></li>
                <li className={`${props.pag === 'usuarios' ? "text-yellow-400 underline" : ""}`}><Link to='/admin/usuarios'>Usuários</Link></li>
                <li className={`${props.pag === 'feedback' ? "text-yellow-400 underline" : ""}`}><Link to='/admin/feedback'>Feedback</Link></li>
                <Link className="bg-yellow-300 text-black py-4 px-5 text-2xl rounded-full font-semibold" to="/admin"><i className="fa-regular fa-circle-user"></i> {validado ? user : "Login"}</Link>
                <li className="absolute top-5 right-5 hidden max-lg:block"><label onClick={(e)=>{setMenu(!menu)}}><i className="fa-solid fa-x"></i></label></li>
            </ul>
            <div className="flex items-center justify-center gap-4">
                <label className="text-4xl hidden text-white max-lg:block" onClick={(e) => {setMenu(!menu)}}><i className="fa-solid fa-bars"></i></label>
            </div>
        </nav>
        </>
    )
}