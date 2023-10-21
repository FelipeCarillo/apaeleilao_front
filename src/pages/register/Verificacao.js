import Navbar from '../../components/Navbar'
import Footer from "../../components/Footer"
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export default function Verificacao() {
    const [code1, setCode1] = useState('')
    const [code2, setCode2] = useState('')
    const [code3, setCode3] = useState('')
    const [code4, setCode4] = useState('')
    const [code5, setCode5] = useState('')

    // REDIRECT
    const history = useNavigate();

    function enviarEmail(){
        fetch('https://0qwpk6pzki.execute-api.sa-east-1.amazonaws.com/dev/apae-leilao/send-verification-email-code', {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
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
            // console.log("data: " + data.message)
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

    async function ValidarEmail(){
        const code = code1+code2+code3+code4+code5
        console.log(code)
        await fetch("https://0qwpk6pzki.execute-api.sa-east-1.amazonaws.com/dev/apae-leilao/confirm-verification-email-code", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({"verification_email_code": code})    
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
            setTimeout(() => {
                history('/login')
            }, 5000)
            // console.log("data: " + data.message)
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
        <main>
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />

            <section className='h-screen bg-gray-200 flex items-center justify-center'>
                <div className='w-5/6 bg-white rounded-xl py-4 md:w-1/2 lg:w-1/3'>
                    <h2 className='text-center text-4xl text-azul font-semibold mb-8 max-md:text-2xl'>Validação de E-mail</h2>
                    <p className='text-center px-2'>Por favor, verifique seu e-mail e copie o código de verificação para continuar.</p>
                    <div className='flex justify-center gap-1 mt-8'>
                        <input className='w-[50px] h-14 border-2 text-2xl text-center' type='number' onChange={(e) => {setCode1(e.target.value)}} />
                        <input className='w-[50px] h-14 border-2 text-2xl text-center' type='number' onChange={(e) => {setCode2(e.target.value)}} />
                        <input className='w-[50px] h-14 border-2 text-2xl text-center' type='number' onChange={(e) => {setCode3(e.target.value)}} />
                        <input className='w-[50px] h-14 border-2 text-2xl text-center' type='number' onChange={(e) => {setCode4(e.target.value)}} />
                        <input className='w-[50px] h-14 border-2 text-2xl text-center' type='number' onChange={(e) => {setCode5(e.target.value)}} />
                    </div>
                    <div className='flex justify-center'>
                        <button className='bg-azul text-white rounded-xl p-4 mt-8 hover:bg-blue-700' onClick={ValidarEmail}>Validar</button>
                    </div>
                    <div className='flex justify-center mt-2'>
                        <label className='underline' onClick={enviarEmail}>Enviar Email</label>
                    </div>
                </div>
            </section>
        </main>
        <Footer />
        </>
    )
}