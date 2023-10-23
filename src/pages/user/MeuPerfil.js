import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function MeuPerfil() {
    return (
        <>
        <Navbar pag='Perfil'/>

        <main>
            <div className="mx-2 mt-2 grid justify-items-end">
                <button className="border bg-[#f4db33] text-2xl rounded-full py-1 px-2"><i class="fa-solid fa-headset"></i></button>
            </div>
            {/* <div>
            <button className="border bg-[#2c4fbc] text-2xl py-1 px-3"><i class="fa-solid fa-person"></i></button>
            </div> */}
            <section className="border-b border-black mx-[100px]">
                <div className="mb-16 mt-4 text-center">
                    <label className="border-2 border-black bg-[#d9d9d9] text-6xl rounded-full py-7 p-6">BG</label>
                </div>
            </section>
           <section class="border-black mx-[100px] text-4xl mr-24 mt-8 ml-24 box-content h-100 w-2200">
                <div className="flex justify-end">
                    <button className="border bg-[#f4db33] text-2xl rounded-full py-1 px-2"><i class="fa-solid fa-pen"></i></button>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label className='md:w-1/2' htmlFor="Perfil">Nome:</label>
                    <input type="text" className="border-2 border-black"/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label className='md:w-1/2' htmlFor="Perfil">Email:</label>
                    <input type="email" className="border-2 border-black"/>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label className='md:w-1/2' htmlFor="Perfil">Celular:</label>
                    <input type="text" className="border-2 border-black"/>
                </div>
                <div className="flex flex-col mb-4">
                    <label className='md:w-1/2' htmlFor="Perfil">Senha:</label>
                    <input type="password" className=" border-2 border-black"/>
                    <button className="text-lg underline underline-offset-2 mb-2 flex justify-items-start">Redefinir Senha</button>
                </div>
                
           </section>
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