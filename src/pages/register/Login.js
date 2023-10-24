import { useState } from "react"
import Navbar from "../../components/Navbar"
import Footer from '../../components/Footer'
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login(){
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [viewPass, setViewPass] = useState(false)
    const [connected, setConnected] = useState(false)
    // REDIRECT
    const history = useNavigate();

    async function Login(){
        if(login === ''){
            return toast.error('Email Inválido', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
        if(password === ''){
            return toast.error('Senha Inválida', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }

        const json = {
            "email": login,
            "password": password,
            "keep_login": connected
        }
        console.log(json)
        await fetch('https://aoltolsszk.execute-api.sa-east-1.amazonaws.com/dev/apae-leilao/get-token', {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(json),
        }).then(response => {
            if(response.ok){
                return response.json()
            }else{
                return Promise.reject(response);
            }
        }).then(data => {
            // AQUI VC CONTROLA O JSON DE RETORNO
            toast.success(data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            localStorage.setItem('token', data.body.token)
            setTimeout(() => {
                history('/')
            }, 5000)
        }).catch(error => {
            // AQUI VC CONTROLA O RESULTADO (STATUS CODE + MESSAGE)
            console.log("ERROOOO " + error.status);
            // 3. get error messages, if any
            error.json().then((json: any) => {
                console.log(json);
                toast.error(json.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            })
        })         

    }

    return (
        <>
        <Navbar />
        
        <main className="px-4 my-8 flex flex-col justify-center">
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
 
            <h1 className="text-4xl text-center mt-4 font-medium text-blue-900 md:text-5xl">Login</h1>
            <div className="flex justify-center">
                <div className="w-[90%] h-[2px] bg-gray-200 my-2 md:my-4" />
            </div>

            {/* FORMULARIO DE LOGIN */}
            <form>
                <div className="flex flex-col text-xl gap-2 mb-4 md:items-center">
                    <label className='md:w-1/2' htmlFor="login">Email:</label>
                    <input onChange={(e) => {setLogin(e.target.value)}} className="bg-gray-200 rounded-full py-1 px-3 md:w-1/2" type="text" name="login" id="login"/>
                </div>

                <div className="flex flex-col text-xl gap-2 mb-4 md:items-center">
                    <label className='md:w-1/2' htmlFor="password">Senha:</label>
                    <input onChange={(e) => {setPassword(e.target.value)}} className="bg-gray-200 rounded-full py-1 px-3 md:w-1/2" type={`${viewPass ? "text" : "password"}`} name="password" id="password"/>
                    <div className="flex justify-between w-1/2 max-md:w-full">
                        <Link className='underline max-md:self-start md:w-1/2' to="/">Esqueceu sua Senha?</Link>
                        <label className="cursor-pointer" onClick={(e) => {setViewPass(!viewPass)}}>Mostrar Senha</label>  
                    </div>
                </div>

                <div className="flex justify-center mt-8">
                    <div className="w-[90%] h-[2px] bg-gray-200" />
                </div>

                <div className="flex flex-col items-center text-xl gap-4 my-4">
                    <div className='flex items-center max-md:self-start gap-1 md:w-1/2'>
                        <input className="w-4 h-4" type="checkbox" id="conected" name="conected" onChange={(e)=>{setConnected(e.target.checked)}}/>
                        <label htmlFor="conected">Deseja continuar conectado?</label>
                    </div>
                </div>
                
                <div className="flex justify-center mt-4">
                    <label onClick={Login} className="bg-yellow-300 py-4 px-16 text-xl rounded-full cursor-pointer">LOGIN</label>
                </div>
            </form>
            <p className="text-lg text-center my-4">Ainda não possui uma conta? <Link className='text-azul' to="/cadastro">Clique Aqui</Link> </p>
        </main>
        <Footer />
        </>
    )
}