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

    // MODAL ESQUECEU SENHA
    const [modal, setModal] = useState(false)
    const [forgetPass, setForgetPass] = useState('')
    const [loading, setLoading] = useState(false)
    // REDIRECT
    const history = useNavigate();

    async function Login(){
        setLoading(true)
        if(login === ''){
            setLoading(false)
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
            setLoading(false)
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
        
        await fetch(process.env.REACT_APP_API+'/get-token', {
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
            }, 2000)
        }).catch(error => {
            // 3. get error messages, if any
            error.json().then((json: any) => {
                setLoading(false)
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

    async function forgetPassUser(){
        await fetch(process.env.REACT_APP_API+'/send-reset-password-link?email='+forgetPass, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if(response.status === 200){
                return response.json()
            }else{
                return Promise.reject(response);
            }
        }).then(data => {
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
            setModal(false)
        }).catch(error => {
            // AQUI VC CONTROLA O RESULTADO (STATUS CODE + MESSAGE)
            toast.error(error.message, {
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
                        <p className='underline max-md:self-start md:w-1/2 cursor-pointer' onClick={()=>{setModal(true)}} tabIndex={0} onKeyDown={(event)=> event.keyCode === 13 && setModal(true)}>Esqueceu sua Senha?</p>
                        <label className="cursor-pointer" onClick={(e) => {setViewPass(!viewPass)}} tabIndex={0} onKeyDown={(event)=> event.keyCode === 13 && setViewPass(!viewPass)}>Mostrar Senha</label>  
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
                    <label onClick={Login} className="bg-yellow-300 py-4 px-16 text-xl rounded-full cursor-pointer" tabIndex={0} onKeyDown={(event)=> event.keyCode === 13 && Login()}><i className={`fa-solid fa-circle-notch animate-spin ${loading ? '' : 'hidden'}`}></i> LOGIN</label>
                </div>
            </form>
            <p className="text-lg text-center my-4">Ainda não possui uma conta? <Link className='text-azul' to="/cadastro">Clique Aqui</Link> </p>
        </main>
        <Footer />

        {/* MODAL */}
        <div className={`${modal ? 'relative z-10' : 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="">
                        <h3 className="font-semibold text-center">Esqueceu sua senha?</h3>
                        <p className="text-center my-2">Informe seu email de login para alterar sua senha e recuperar sua conta:</p>
                        <input className="w-full border-2 rounded-lg p-1" placeholder="Digite seu Email" type="email" onChange={(e)=>{setForgetPass(e.target.value)}}/>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" className="inline-flex w-full justify-center rounded-md bg-yellow-300 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-yellow-400 sm:ml-3 sm:w-auto" onClick={()=>{forgetPassUser()}}>Enviar Email</button>
                    <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={()=>{setModal(false)}}>Voltar</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </>
    )
}