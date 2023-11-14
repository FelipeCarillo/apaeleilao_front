import { useState } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RedefinirSenha() {
    const token = window.location.href.split('token=')[1]
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [viewPass, setViewPass] = useState(false)

    async function RedefinirSenha() {
        if(password !== confirmPassword || password === '' || confirmPassword === ''){
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
            "password": password
        }
        
        fetch(process.env.REACT_APP_API+"/update-user",{
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(json)
        }).then((response)=>{
            if(response.ok){
                return response.json()
            }else{
                return Promise.reject(response);
            }
        }).then((data)=>{
            // console.log(data)
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
        }).catch((error)=>{
            console.log(error)
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

            <section className='h-screen flex items-center justify-center'>
                <div className='w-1/2 max-md:w-full max-md:m-8 shadow-xl border-2 rounded-lg p-8'>
                    <h2 className='text-4xl text-center text-azul mb-8 font-semibold border-b-2'>Redefinir sua Senha</h2>
                    <div className='flex flex-col items-center gap-4'>
                        <div className='flex flex-col w-1/2 max-md:w-full'>
                            <label>Nova Senha:</label>
                            <input className='border-2 rounded-full text-lg px-3' type={`${viewPass ? 'text' : 'password'}`} onChange={(e)=>{setPassword(e.target.value)}}/>
                        </div>
                        <div className='flex flex-col w-1/2 max-md:w-full'>
                            <label>Confirmar Senha:</label>
                            <input className='border-2 rounded-full text-lg px-3' type={`${viewPass ? 'text' : 'password'}`} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                        </div>
                        <p className='text-end w-full md:w-1/2 underline cursor-pointer' onClick={()=> {setViewPass(!viewPass)}}>Mostrar senha</p>
                        <button className='bg-azul text-white py-4 px-8 text-xl rounded-full' onClick={RedefinirSenha}>Alterar Senha</button>
                    </div>
                </div>
            </section>
        </main>

        <Footer />
        </>
    )
}