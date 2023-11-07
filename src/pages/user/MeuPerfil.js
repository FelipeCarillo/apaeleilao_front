import { useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ReactInputMask from "react-input-mask";
import { ToastContainer, toast } from 'react-toastify';

export default function MeuPerfil() {
    // GETUSER
    const [inicials, setInicials] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    // UPDATEUSER
    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')
    const [newPhone, setNewPhone] = useState('')

    // MODAL EDITAR
    const [modal, setModal] = useState(false)

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
            setLastName(data.body.last_name)
            setEmail(data.body.email)
            setPhone(data.body.phone)
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

    function updateUser() {
        const json = {}
        const first_name = newFirstName === '' ? firstName : newFirstName
        const last_name = newLastName === '' ? lastName : newLastName
        const telefone = newPhone === '' ? phone : newPhone

        if (first_name !== firstName) {
            json.first_name = first_name
        }
        if (last_name !== lastName) {
            json.last_name = last_name
        }
        if (telefone !== phone) {
            json.phone = telefone
        }

        console.log(json)
        fetch(process.env.REACT_APP_API+"/update-user",{
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(json)
        }).then((response)=>{
            if(response.ok){
                return response.json()
            }else{
                return Promise.reject(response);
            }
        }).then((data)=>{
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
            getUser()
        }).catch((error)=>{
            console.log(error)
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
                
           </form>
           <div className="flex justify-between px-24 max-md:flex-col">
                <button className="bg-yellow-300 py-4 px-16 text-xl mb-4 rounded-full cursor-pointer flex items-center gap-2" onClick={()=>{setModal(true)}}><i className="fa-solid fa-pen"></i>Editar</button>
                <button className="bg-red-500 py-4 px-16 text-xl mb-4 rounded-full cursor-pointer flex items-center gap-2 text-white" onClick={sair}>Sair</button>
            </div>
        </main>

        <Footer />

        {/* MODAL */}
        <div className={`${modal ? 'relative z-10' : 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <h3 className="font-semibold text-center text-azul text-2xl mb-4">Editar Perfil</h3>
                    <div className="flex flex-col gap-2">
                        <div>
                            <label>Nome:</label>
                            <input className="w-full border-2 rounded-lg p-1" placeholder={firstName} type="text" onChange={(e)=>{setNewFirstName(e.target.value)}}/>
                        </div>
                        <div>
                            <label>Sobrenome:</label>
                            <input className="w-full border-2 rounded-lg p-1" placeholder={lastName} type="text" onChange={(e)=>{setNewLastName(e.target.value)}}/>
                        </div>
                        <div>
                            <label>Celular:</label>
                            <input className="w-full border-2 rounded-lg p-1" placeholder={phone} type="text" onChange={(e)=>{setNewPhone(e.target.value)}}/>
                        </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" className="inline-flex w-full justify-center rounded-md bg-yellow-300 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-yellow-400 sm:ml-3 sm:w-auto" onClick={()=> {updateUser()}}>Atualizar</button>
                    <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={()=>{setModal(false)}}>Voltar</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </>
    )
}