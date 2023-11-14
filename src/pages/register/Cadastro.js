import { useState } from "react";
import Navbar from "../../components/Navbar";
import ReactInputMask from "react-input-mask";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../../components/Footer";

export default function Cadastro() {
    // Set Infos
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [termos, setTermos] = useState(false)
    const [len, setlen] = useState('')
    const [loading, setLoading] = useState(false)

    // REDIRECT
    const history = useNavigate();

    function back() {
        let cadastro1 = document.getElementById('cadastro1');
        let cadastro2 = document.getElementById('cadastro2');
        cadastro1.classList.remove('hidden');
        cadastro2.classList.add('hidden');
    }

    function next() {
        if(/[0-9]/.test(firstName) || /[0-9]/.test(lastName) || firstName.length < 3 || firstName.length > 200 || lastName.length < 3 || lastName.length > 200 || firstName.trim() === '' || lastName.trim() === ''){
            return toast.error('Nome Inválido', {
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
        if(email === '' || email.length > 250){
            return  toast.error('Email Inválido', {
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

        let cadastro1 = document.getElementById('cadastro1');
        let cadastro2 = document.getElementById('cadastro2');
        cadastro1.classList.add('hidden');
        cadastro2.classList.remove('hidden');
    }

    async function POSTCadastrar(){
        setLoading(true)
        setTimeout(() => {setLoading(false)}, 5000)
        // VALIDAÇÕES
        var cpfFormat = cpf.replace(/-/g, '')
        cpfFormat = cpfFormat.replace(/\./g, '')
        cpfFormat = cpfFormat.replace(/_/g, '')
        if(cpfFormat.length !== 11){
            return toast.error('CPF Inválido', {
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

        var phoneFormat = phone.replace(/\(/g, '')
        phoneFormat = phoneFormat.replace(/\)/g, '')
        phoneFormat = phoneFormat.replace(/-/g, '')
        phoneFormat = phoneFormat.replace(/_/g, '')
        if(phoneFormat.length !== 11){
            return toast.error('Telefone Inválido', {
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
        
        if(termos !== true){
            return toast.error('Aceite os Termos', {
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

        if(password !== ''){
            if(!/[A-Z]/.test(password)){
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
            if(!/[0-9]/.test(password)){
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
            if(!/[^A-Za-z0-9]/.test(password)){
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
            if(password.length < 8){
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
            if(password !== confirmPass){
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

        }else {
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
            "password": password,
            "email": email,
            "accepted_terms": termos,
            "first_name": firstName,
            "last_name": lastName,
            "cpf": cpfFormat,
            "phone": phoneFormat
        }

        await fetch(process.env.REACT_APP_API+'/create-user', {
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
                history('/verificacao')
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

        <main className="px-4 flex flex-col justify-center">
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            
            <h1 className="text-4xl text-center mt-4 font-medium text-blue-900 md:text-5xl">Registrar-se</h1>
            <div className="flex justify-center">
                <div className="w-[90%] h-[2px] bg-gray-200 my-2 md:my-4" />
            </div>

            {/* FORMULARIO DE CADASTRO */}
            <form>
                <section id='cadastro1'>
                    <div className="flex flex-col text-xl gap-2 mb-4 md:items-center">
                        <label className='md:w-1/2' htmlFor="first_name">Primeiro Nome:</label>
                        <input className="bg-gray-200 rounded-full py-1 px-3 md:w-1/2" onChange={(e) => {setFirstName(e.target.value)}} type="text" name="first_name" id="first_name"/>
                    </div>

                    <div className="flex flex-col text-xl gap-2 mb-4 md:items-center">
                        <label className='md:w-1/2' htmlFor="last_name">Último Nome:</label>
                        <input className="bg-gray-200 rounded-full py-1 px-3 md:w-1/2" onChange={(e) => {setLastName(e.target.value)}} type="text" name="last_name" id="last_name"/>
                    </div>

                    <div className="flex flex-col text-xl gap-2 mb-4 md:items-center">
                        <label className='md:w-1/2' htmlFor="email">Email:</label>
                        <input className="bg-gray-200 rounded-full py-1 px-3 md:w-1/2" onChange={(e) => {setEmail(e.target.value)}} type="email" name="email" id="email"/>
                    </div>

                    <div className="flex flex-col text-xl gap-2 mb-4 md:items-center">
                        <label className='md:w-1/2' htmlFor="cpf">CPF:</label>
                        <ReactInputMask className="bg-gray-200 rounded-full py-1 px-3 md:w-1/2" onChange={(e) => {setCpf(e.target.value)}} mask="999.999.999-99" name="cpf" id="cpf"/>
                    </div>

                    <div className="flex flex-col text-xl gap-2 mb-4 md:items-center">
                        <label className='md:w-1/2' htmlFor="tel">Celular (Com DDD):</label>
                        <ReactInputMask  className="bg-gray-200 rounded-full py-1 px-3 md:w-1/2" onChange={(e) => {setPhone(e.target.value)}} mask="(99)99999-9999" name="tel" id="tel"/>
                    </div>

                    <div className='flex justify-center'>
                        <label htmlFor="" className="bg-yellow-300 py-4 px-16 text-xl rounded-full cursor-pointer" onClick={next}>Continuar</label>
                    </div>
                </section>

                <section id='cadastro2' className='hidden'>
                    <div className="flex flex-col text-xl gap-2 mb-4 md:items-center">
                        <label className='md:w-1/2' htmlFor="password">Senha:</label>
                        <input className="bg-gray-200 rounded-full py-1 px-3 md:w-1/2" onBlur={(e) => {setPassword(e.target.value)}} onChange={(e) => {setlen(e.target.value)}} type="password" name="password" id="password"/>
                    </div>

                    <div className="flex flex-col text-xl gap-2 mb-4 md:items-center">
                        <label className='md:w-1/2' htmlFor="confirmPass">Confirmar a senha:</label>
                        <input className="bg-gray-200 rounded-full py-1 px-3 md:w-1/2" onChange={(e) => {setConfirmPass(e.target.value)}} type="password" name="confirmPass" id="confirmPass"/>
                    </div>

                    <div className='flex flex-col items-center text-xl gap-4 my-4'>
                        <div className='flex flex-col items-center max-md:self-start gap-1 md:w-1/2'>
                        <label htmlFor="" className='self-start'>Sua senha deve conter:</label>
                        <ul className='pl-2 self-start'>
                            <li><i className={`fa-solid ${len.length < 8 ? 'fa-spinner animate-spin' : 'fa-check text-green-500'}`}></i> No mínimo 8 caracteres;</li>
                            <li><i className={`fa-solid ${/[A-Z]/.test(len) ? 'fa-check text-green-500' : 'fa-spinner animate-spin'}`}></i> Ao menos 1 letra maiúscula;</li>
                            <li><i className={`fa-solid ${/[0-9]/.test(len) ? 'fa-check text-green-500' : 'fa-spinner animate-spin'}`}></i> Ao menos 1 número;</li>
                            <li><i className={`fa-solid ${/[^A-Za-z0-9]/.test(len) ? "fa-check text-green-500" : "fa-spinner animate-spin"}`}></i> Ao menos 1 caracter especial;</li>
                            <li><i className={`fa-solid ${password === confirmPass && password !== "" && confirmPass !== "" ? "fa-check text-green-500" : "fa-spinner animate-spin"}`}></i> Senha Confirmada</li>
                        </ul>
                        </div>
                    </div>

                    <div className="flex flex-col items-center text-xl gap-4 my-4">
                        <div className='flex items-center max-md:self-start gap-1 md:w-1/2'>
                            <input onChange={(e) => {setTermos(e.target.checked)}} className="w-4 h-4" type="checkbox" id="conected" name="conected"/>
                            <label htmlFor="conected">Concordo com os Termos de Uso</label>
                        </div>
                    </div>

                    <div className='flex max-sm:flex-col-reverse text-center justify-between md:justify-center gap-4'>
                        <label className="py-4 px-10 text-xl rounded-full border-2 border-yellow-300 cursor-pointer" onClick={back}>Voltar</label>
                        <label className="bg-yellow-300 py-4 px-10 text-xl rounded-full cursor-pointer" onClick={POSTCadastrar}><i className={`fa-solid fa-circle-notch animate-spin ${loading ? '' : 'hidden'}`}></i> Cadastrar</label>
                    </div>
                </section>

            </form>
            <p className='text-lg text-center my-4'>Já possui uma conta? <Link className='text-azul' to="/login">Clique Aqui</Link></p>
        </main>

        <Footer />
        </>
    )
}