import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useState } from "react";

export default function Feedback() {
    const [process,setProcess] = useState(false)
    const [placeholder, setPlaceholder] = useState(false)
    return(
        <>
        {/* NAVBAR */}
        <Navbar pag='Perfil'/>
        
        <main>
                <section className="border-black mx-[100px] text-2xl mr-24 mt-4 ml-24 box-content h-100 w-2200">
                    <div className="flex flex-col gap-2 mb-4 text-center">
                     <label className="text-5xl "htmlFor="Perfil">Feedback</label>
                     </div>
                 </section>
                 <form className="border-black mx-[100px] text-xl mr-24 mt-4 box-content h-100 w-2200">
                     <label className="block">
                        <div className="flex flex-col gap-2 mt-4 mb-4">
                                <span className='block'htmlFor="Perfil">Informe seu Email</span>
                                    <input type="email" className="w-full peer border-2 bg-gray-300 rounded-full py-1 px-3" placeholder={placeholder ? "exemplo@gmail.com" : ""} onBlur={() => {setPlaceholder(false)}} onFocus={() => {setPlaceholder(true)}}/>
                                        <p className="hidden peer-invalid:block text-red-600 text-base">
                                             Insira um email valido!
                                        </p>
                        </div>
                    </label>
                </form>
                <section className="border-black mx-[100px] text-2xl mt-4 box-content h-100 w-2200"> 
                    <div className="flex flex-col gap-2 text-center">                
                            <h1 className="text-xl">Por favor, nos informe o que você está achando do site e sobre os leilões!</h1>
                        <textarea className=" bg-gray-300 rounded-lg py-6 px-6 mb-8" placeholder="Digite aqui..."cols={25}></textarea>
                    </div>
                </section>
                <section>
                    <div className="flex justify-center">
                        <button className="bg-yellow-300 py-4 px-16 text-xl mb-4 rounded-full cursor-pointer flex items-center gap-2" onClick={()=>{setProcess(!process)}}><i className={`fa-solid fa-circle-notch animate-spin ${process ? 'block' : 'hidden'}`}></i>Enviar</button>
                        </div>
                </section>
            
        </main>
        {/* FOOTER */}
        <Footer />
        </>
    )
}
