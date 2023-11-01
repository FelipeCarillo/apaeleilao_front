import Navbar from '../../components/Navbar'
import Footer from "../../components/Footer"
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export default function Verificacao() {
    const [code, setCode] = useState('')

    // REDIRECT
    const history = useNavigate();

    function enviarEmail(){
        fetch(process.env.REACT_APP_API+'/send-verification-email-code', {
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

        const codeString = code.toString()

        const json = {
            "verification_email_code": codeString
        }
        console.log(json)

        await fetch(process.env.REACT_APP_API+"/confirm-verification-email-code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify(json)
        }).then(response => {
            if(response.ok){
                return response.json()
            }else{
                // console.log("response: "+response)
                return Promise.reject(response);
            }
        }).then(data => {
            // AQUI VC CONTROLA O JSON DE RETORNO
            // console.log("data:"+data)
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
            localStorage.removeItem("token")
            setTimeout(() => {
                history('/login')
            }, 5000)
            // console.log("data: " + data.message)
        }).catch(error => {
            // AQUI VC CONTROLA O RESULTADO (STATUS CODE + MESSAGE)
            console.log("ERROOOO " + error.status);
            console.log(error);
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
            });
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
                        <input className='h-14 text-2xl border-2 rounded-lg p-1' type="number" onChange={(e)=>{setCode(e.target.value)}}/>
                    </div>
                    <div className='flex justify-center'>
                        <button className='bg-azul text-white rounded-xl p-4 mt-8 hover:bg-blue-700' onClick={ValidarEmail}>Validar</button>
                    </div>
                    <div className='flex justify-center mt-2'>
                        <label className='underline cursor-pointer' onClick={enviarEmail}>Enviar Email</label>
                    </div>
                </div>
            </section>
        </main>
        <Footer />
        </>
    )
}