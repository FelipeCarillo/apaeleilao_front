import { useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ReactInputMask from "react-input-mask";
import { ToastContainer, toast } from 'react-toastify';

export default function MeuPerfil() {
    const [inicials, setInicials] = useState('')
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const [edit,setEdit] = useState(false)
    const [viewPass,setviewPass] =useState(false)

    const [placeholder, setPlaceholder] = useState(false)

    function sair() {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }

    function getUser() {
        fetch(process.env.REACT_APP_API+'/get-user', {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        }).then(response => {
            if(response.ok){
                return response.json()
            }else{
                return Promise.reject(response);
            }
        }).then(data => {
            setInicials(data.body.first_name.charAt(0) + data.body.last_name.charAt(0))
            setFirstName(data.body.first_name)
            setEmail(data.body.email)
            setPhone(data.body.phone)
            setPassword(data.body.password)
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
        {/* NAVBAR */}
        <Navbar pag='Perfil'/>

        <main>
            {getUser()}
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            {/* BOTOES DO TOPO */}
            <div className="mx-2 mt-2 grid justify-items-end">
                <button className="border bg-[#f4db33] text-2xl rounded-full py-1 px-2"><i className="fa-solid fa-headset"></i></button>
            </div>
            <section className="border-b border-black mx-[100px]">
                <div className="mb-24 mt-4 text-center">
                    <label className="border-2 border-black bg-[#d9d9d9] text-6xl rounded-full py-7 p-6">{inicials}</label>
                </div>
            {/* DADOS */}
            </section>
           <form className="mx-[100px] text-2xl mr-24 mt-4 ml-24 box-content h-100 w-2200">
                <div className="flex flex-col gap-2 mb-4">
                    <label className='md:w-1/2' htmlFor="Perfil">Nome:</label>
                    <input type="text" className="bg-gray-300 rounded-full py-1 px-3 w-full" disabled value={firstName}/>
                </div>
                <div className="flex flex-col gap-2 mb-4 ">
                    <label className="block">
                        <span className='block'htmlFor="Perfil">Email</span>
                            <input type="email" className="w-full peer border-2 bg-gray-300 rounded-full py-1 px-3" placeholder={placeholder ? "exemplo@gmail.com" : ""} onBlur={() => {setPlaceholder(false)}} onFocus={() => {setPlaceholder(true)}} value={email} disabled/>
                                <p className="hidden peer-invalid:block text-red-600 text-base">
                                     Insira um email valido!
                                </p>
                    </label>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label className='md:w-1/2' htmlFor="Perfil">Celular:</label>
                    <ReactInputMask className="flex bg-gray-300 rounded-full py-1 px-3 w-full" mask="(99)99999-9999" name="tel" id="tel" value={phone} disabled/>
                </div>
                <div className="flex flex-col mb-4">
                    <label className='md:w-1/2' htmlFor="Perfil">Senha:</label>
                        <input type={`${viewPass ?'text': 'password'}`} className="bg-gray-300 rounded-full py-1 px-3 w-full" value={password} disabled/>
                    <div className="flex items-center justify-between">
                        <label className="text-lg underline underline-offset-2 mb-2 flex justify-items-start cursor-pointer">Redefinir Senha</label>
                        <label className={`text-lg flex items-end cursor-pointer mb-2`}onClick={()=>{setviewPass(!viewPass)}}>Mostrar Senha</label>
                    </div>
                    
                </div>
                
           </form>
           <div className="flex justify-between px-24 max-md:flex-col">
                <button className="bg-yellow-300 py-4 px-16 text-xl mb-4 rounded-full cursor-pointer flex items-center gap-2" onClick={()=>{setEdit(!edit)}}><i className={`fa-solid fa-pen ${edit ? '' : ''}`}></i>Editar</button>
                <button className="bg-red-500 py-4 px-16 text-xl mb-4 rounded-full cursor-pointer flex items-center gap-2 text-white" onClick={sair}>Sair</button>
            </div>
        </main>

        <Footer />
        </>
    )
}