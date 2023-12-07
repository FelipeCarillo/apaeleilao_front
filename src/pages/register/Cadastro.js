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

    const [modal, setModal] = useState(false)
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
        }).catch(error => {
            // 3. get error messages, if any
            error.json().then((json: any) => {
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

    const keyDown = (event) => {
        if (event.keyCode === 13) {
            POSTCadastrar()
        }
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
                        <label type="button" htmlFor="" className="bg-yellow-300 py-4 px-16 text-xl rounded-full cursor-pointer" onClick={next} tabIndex={0} onKeyDown={(event)=> event.keyCode === 13 && next()}>Continuar</label>
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
                            <label className="underline text-blue-500 cursor-pointer" onClick={()=> {setModal(true)}}>Concordo com os Termos de Uso</label>
                        </div>
                    </div>

                    <div className='flex max-sm:flex-col-reverse text-center justify-between md:justify-center gap-4'>
                        <label className="py-4 px-10 text-xl rounded-full border-2 border-yellow-300 cursor-pointer" onClick={back} tabIndex={0} onKeyDown={(event)=> event.keyCode === 13 && back()}>Voltar</label>
                        <label className="bg-yellow-300 py-4 px-10 text-xl rounded-full cursor-pointer" onClick={POSTCadastrar} tabIndex={0} onKeyDown={keyDown}><i className={`fa-solid fa-circle-notch animate-spin ${loading ? '' : 'hidden'}`}></i> Cadastrar</label>
                    </div>
                </section>

            </form>
            <p className='text-lg text-center my-4'>Já possui uma conta? <Link className='text-azul' to="/login">Clique Aqui</Link></p>
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
                        <h3 className="font-semibold text-center text-xl mb-8">TERMOS DE USO</h3>
                        <div>
                            <h2 className="text-center">Termos de Uso do Site de Leilão Online para a APAE São Caetano do Sul</h2>
                            <p>
                            1.1 Ao se cadastrar em nosso site de leilão online beneficente, você concorda em fornecer informações precisas, atualizadas e completas sobre si mesmo, conforme solicitado no formulário de registro. 

1.2 Idade Mínima: Ao se cadastrar, você declara e garante que tem pelo menos 18 anos de idade. Se você tiver menos de 18 anos, não é permitida a participação em nosso site. 

1.3 Você é responsável por manter a confidencialidade de sua senha e nome de usuário. Qualquer atividade realizada em sua conta é de sua inteira responsabilidade. 

1.4 Ao se cadastrar, você concorda em receber comunicações relacionadas ao site, incluindo notificações de leilões, ofertas e eventos beneficentes. 

1.5 Você concorda que seus dados pessoais fornecidos durante o cadastro serão usados no sistema, de acordo com nossa Política de Privacidade. 

 

Termos de Participação no Leilão 

2.1 Nosso site de leilão online beneficente tem o propósito de arrecadar fundos para a APAE São Caetano do Sul. Ao participar de leilões em nosso site, você concorda em respeitar as regras estabelecidas por nós e em agir de forma ética e justa. 

2.2 Você se compromete a não realizar lances falsos ou fraudulentos, bem como a não interromper ou prejudicar o funcionamento do site. 

2.3 Os itens leiloados são doados com o propósito beneficente. Ao vencer um leilão, você concorda em efetuar o pagamento conforme os termos estabelecidos. 

2.4 Reservamo-nos o direito de cancelar ou suspender sua participação em leilões em caso de violação destes termos ou de qualquer comportamento inadequado. 

 

Termos de Pagamento via Pix - Adendo sobre Penalidades 

3.1 O pagamento dos itens leiloados deve ser efetuado exclusivamente via Pix. 

3.2 Você concorda em efetuar o pagamento dentro do prazo especificado no leilão. Os detalhes para o pagamento via Pix serão fornecidos a você no momento da vitória no leilão. 

3.3 Caso não efetue o pagamento no prazo estabelecido, sua vitória no leilão será anulada, e serão aplicadas penalidades conforme descritas abaixo: 

Primeiro Não Pagamento: Banimento da participação em leilões por 1 semana. 

Segundo Não Pagamento: Banimento da participação em leilões por 2 semanas. 

Terceiro Não Pagamento: Banimento permanente da participação em leilões. 

3.4 Além das penalidades mencionadas acima, reservamo-nos o direito de tomar as medidas legais cabíveis para recuperar o valor do leilão não pago. 

3.5 Em caso de qualquer contratempo relacionado ao pagamento, solicitamos que entre em contato imediatamente com a APAE São Caetano do Sul, utilizando as informações de contato fornecidas no site. Estamos comprometidos em encontrar soluções adequadas e manter a transparência em todas as transações. 

 

Estes termos de uso regem a sua utilização do site de leilão online beneficente em apoio à APAE Scsul. Ao se cadastrar, participar de leilões ou efetuar pagamentos via Pix, você concorda em cumprir esses termos. Se tiver dúvidas ou preocupações, entre em contato conosco por meio das informações de contato fornecidas no site. 
                            </p>
                        </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={()=>{setModal(false)}}>Voltar</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </>
    )
}