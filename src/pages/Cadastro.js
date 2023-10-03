import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import { useState } from 'react';
import ReactInputMask from 'react-input-mask';

export default function Cadastro() {
    const imgLogo = 'https://apaeleilaoimtphotos.s3.sa-east-1.amazonaws.com/logo-apaeleilao/logo-apaeleilao-branco.jpg'
    // Set Infos
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [Email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [termos, setTermos] = useState(false)
    const [len, setlen] = useState('')

    // ALERT
    const [statusCode, setStatusCode] = useState('')
    const [message, setMessage] = useState('')

    function back() {
        let cadastro1 = document.getElementById('cadastro1');
        let cadastro2 = document.getElementById('cadastro2');
        cadastro1.classList.remove('hidden');
        cadastro2.classList.add('hidden');
        setStatusCode('')
        setMessage('')
    }

    function next() {
        if(/[0-9]/.test(firstName) || /[0-9]/.test(lastName)){
            setStatusCode('422')
            setMessage('Nome não pode conter número')
            return
        }
        if(firstName === '' && firstName === ''){
            setStatusCode('422')
            setMessage('Nome Inválido')
            return
        }
        if(Email === ''){
            setStatusCode('422')
            setMessage('Email Inválido')
            return
        }
        let cadastro1 = document.getElementById('cadastro1');
        let cadastro2 = document.getElementById('cadastro2');
        cadastro1.classList.add('hidden');
        cadastro2.classList.remove('hidden');
        setStatusCode('')
        setMessage('')
    }

    function POSTCadastrar(){
        // VALIDAÇÕES
        var cpfFormat = cpf.replace(/-/g, '')
        cpfFormat = cpfFormat.replace(/\./g, '')
        cpfFormat = cpfFormat.replace(/_/g, '')
        if(cpfFormat.length !== 11){
            setStatusCode('422')
            setMessage('CPF Inválido')
            return
        }

        var phoneFormat = phone.replace(/\(/g, '')
        phoneFormat = phoneFormat.replace(/\)/g, '')
        phoneFormat = phoneFormat.replace(/-/g, '')
        phoneFormat = phoneFormat.replace(/_/g, '')
        if(phoneFormat.length !== 11){
            setStatusCode('422')
            setMessage('Telefone Inválido')
            return
        }
        
        if(termos !== true){
            setStatusCode('422')
            setMessage('Aceite os Termos')
            return
        }
        if(password !== ''){
            if(!/[A-Z]/.test(password)){
                setStatusCode('422')
                setMessage('Senha Inválida')
                return
            }
            if(!/[0-9]/.test(password)){
                setStatusCode('422')
                setMessage('Senha Inválida')
                return
            }
            if(!/[^A-Za-z0-9]/.test(password)){
                setStatusCode('422')
                setMessage('Senha Inválida')
                return
            }
            if(password.length < 8){
                setStatusCode('422')
                setMessage('Senha Inválida')
                return
            }
            if(password !== confirmPass){
                setStatusCode('422')
                setMessage('Senha Inválida')
                return
            }
        }else{
            setStatusCode('422')
            setMessage('Senha Inválida')
            return
        }
        
        const json = {
            'body': {
                'first_Name': firstName,
                'last_Name': lastName,
                'email': Email,
                'cpf': cpfFormat,
                'phone': phoneFormat,
                'password': password,
                'is_veri': true,
            }
        }

        fetch('', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json),
        }).then(response => response.json())
        .then(data => {
            console.log(JSON.stringify(data))
            setStatusCode(data.status)
            setMessage(data.body)
        })
    }

    return (
        <>
        {/* ALERTA */}
        <div>
            <i onClick={() => {setStatusCode('')}} className={`fa-solid fa-x fixed top-3 right-3 cursor-pointer z-20 ${statusCode === '' ? "hidden" : "block"}`}></i>
            <Alerta statusCode={statusCode} message={message}/>
        </div>

        <header className='bg-blue-600 flex justify-center p-4 rounded-b-2xl shadow-xl'>
            <img src={imgLogo} alt='logo da APAE leilão' className='w-[200px] self-center md:w-[250px]'/>
        </header>
        <main className="px-4 flex flex-col justify-center">
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
                        <label className="bg-yellow-300 py-4 px-16 text-xl rounded-full cursor-pointer" onClick={next}>Continuar</label>
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
                        <label className='self-start'>Sua senha deve conter:</label>
                        <ul className='pl-2 self-start'>
                            <li><i className={`fa-solid ${len.length < 8 ? 'fa-spinner animate-spin' : 'fa-check text-green-500'}`}></i> No mínimo 8 caracteres;</li>
                            <li><i className={`fa-solid ${/[A-Z]/.test(len) ? 'fa-check text-green-500' : 'fa-spinner animate-spin'}`}></i> Ao menos 1 letra maiúscula;</li>
                            <li><i className={`fa-solid ${/[0-9]/.test(len) ? 'fa-check text-green-500' : 'fa-spinner animate-spin'}`}></i> Ao menos 1 número;</li>
                            <li><i className={`fa-solid ${/[^A-Za-z0-9]/.test(len) ? "fa-check text-green-500" : "fa-spinner animate-spin"}`}></i> Ao menos 1 caracter especial;</li>
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
                        <label className="bg-yellow-300 py-4 px-10 text-xl rounded-full cursor-pointer" onClick={POSTCadastrar}>Cadastrar</label>
                    </div>
                </section>

            </form>
        </main>
        <footer className='md:fixed md:bottom-0 mt-4 w-full text-center font-semibold py-4 bg-blue-600 shadow-xl'>
            <p className='text-white'>Já possui uma conta? <Link className='text-yellow-400' to="/login">Clique Aqui</Link></p>
        </footer>
        </>
    )
}