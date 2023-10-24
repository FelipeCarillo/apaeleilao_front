import { useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ReactInputMask from "react-input-mask";

export default function MeuPerfil() {
    const [process,setProcess] = useState(false)
    const [viewPass,setviewPass] =useState(false)

    const [placeholder, setPlaceholder] = useState(false)
    return (
        <>
        {/* NAVBAR */}
        <Navbar pag='Perfil'/>

        <main>
            {/* BOTOES DO TOPO */}
            <div className="mx-2 mt-2 grid justify-items-end">
                <button className="border bg-[#f4db33] text-2xl rounded-full py-1 px-2"><i className="fa-solid fa-headset"></i></button>
            </div>
            {/* <div>
            <button className="border bg-[#2c4fbc] text-2xl py-1 px-3"><i class="fa-solid fa-person"></i></button>
            </div> */}
            <section className="border-b border-black mx-[100px]">
                <div className="mb-24 mt-4 text-center">
                    <label className="border-2 border-black bg-[#d9d9d9] text-6xl rounded-full py-7 p-6">BG</label>
                </div>
            {/* DADOS */}
            </section>
           <form className="mx-[100px] text-2xl mr-24 mt-4 ml-24 box-content h-100 w-2200">
                {/* <div className="flex justify-end">
                    <button className="border bg-[#f4db33] text-xl rounded-full py-1 px-2"><i className="fa-solid fa-pen"></i></button>
                </div> */}
                <div className="flex flex-col gap-2 mb-4">
                    <label className='md:w-1/2' htmlFor="Perfil">Nome:</label>
                    <input type="text" className="bg-gray-300 rounded-full py-1 px-3 w-full"/>
                </div>
                <div className="flex flex-col gap-2 mb-4 ">
                    <label className="block">
                        <span className='block'htmlFor="Perfil">Email</span>
                            <input type="email" className="w-full peer border-2 bg-gray-300 rounded-full py-1 px-3" placeholder={placeholder ? "exemplo@gmail.com" : ""} onBlur={() => {setPlaceholder(false)}} onFocus={() => {setPlaceholder(true)}}/>
                                <p className="hidden peer-invalid:block text-red-600 text-base">
                                     Insira um email valido!
                                </p>
                    </label>
                    {/* <label className='md:w-1/2' htmlFor="Perfil">Email:</label>
                    <input type="email" className="border-2 border-black"/>
                    <p class="mt-2 invisible peer-invalid:visible text-red-600 text-sm">
                        Informe um email valido!
                    </p> */}
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label className='md:w-1/2' htmlFor="Perfil">Celular:</label>
                    <ReactInputMask className="flex bg-gray-300 rounded-full py-1 px-3 w-full" mask="(99)99999-9999" name="tel" id="tel"/>
                </div>
                <div className="flex flex-col mb-4">
                    <label className='md:w-1/2' htmlFor="Perfil">Senha:</label>
                        <input type={`${viewPass ?'text': 'password'}`} className="bg-gray-300 rounded-full py-1 px-3 w-full"/>
                    <div className="flex items-center justify-between">
                        <label className="text-lg underline underline-offset-2 mb-2 flex justify-items-start cursor-pointer">Redefinir Senha</label>
                        <label className={`text-lg flex items-end cursor-pointer mb-2`}onClick={()=>{setviewPass(!viewPass)}}>Mostrar Senha</label>
                    </div>
                    
                </div>
                
           </form>
           <div className="flex justify-center">
                <button className="bg-yellow-300 py-4 px-16 text-xl mb-4 rounded-full cursor-pointer flex items-center gap-2" onClick={()=>{setProcess(!process)}}><i className={`fa-solid fa-pen ${process ? '' : ''}`}></i>Editar</button>
            </div>
           {/* <section>
            <div className="flex flex-col gap-2 mb-4 mt-4 text-center">
                <label className="text-5xl "htmlFor="Perfil">Feedback</label>
                <h1 className="text-xl">Por favor, nos informe o que você está achando do site e sobre os leilões</h1>
                <textarea className="border-2 border-black p-2 mx-80" placeholder="Digite aqui..."cols={25}></textarea>

            </div>
           </section> */}
        </main>

        <Footer />
        </>
    )
}