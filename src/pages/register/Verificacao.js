import Navbar from '../../components/Navbar'
import Footer from "../../components/Footer"

export default function Verificacao() {
    return (
        <>
        <Navbar />
        <main>
            <section className='h-screen bg-gray-200 flex items-center justify-center'>
                <div className='w-5/6 bg-white rounded-xl py-4 md:w-1/2 lg:w-1/3'>
                    <h2 className='text-center text-4xl text-azul font-semibold mb-8 max-md:text-2xl'>Validação de E-mail</h2>
                    <p className='text-center px-2'>Por favor, verifique seu e-mail e copie o código de verificação para continuar.</p>
                    <div className='flex justify-center gap-1 mt-8'>
                        <input className='w-[50px] h-14 border-2 text-2xl text-center' type='number'/>
                        <input className='w-[50px] h-14 border-2 text-2xl text-center' type='number'/>
                        <input className='w-[50px] h-14 border-2 text-2xl text-center' type='number'/>
                        <input className='w-[50px] h-14 border-2 text-2xl text-center' type='number'/>
                        <input className='w-[50px] h-14 border-2 text-2xl text-center' type='number'/>
                    </div>
                    <div className='flex justify-center'>
                        <button className='bg-azul text-white rounded-xl p-4 mt-8 hover:bg-blue-700'>Validar</button>
                    </div>
                </div>
            </section>
        </main>
        <Footer />
        </>
    )
}