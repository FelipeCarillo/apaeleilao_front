import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function Leilao(){
    return (
        <>
        <Navbar />

        <main className="h-screen flex w-full p-8 max-md:flex-col gap-4">
            {/* INFORMAÇÕES */}
            <section className="w-1/2 md:p-8 max-md:w-full h-full">
                <div className="bg-azul border-2 border-black rounded-xl h-full flex flex-col items-center justify-between">
                    <div className="w-full h-1/2 bg-cover bg-center rounded-t-lg bg-[url('http://via.placeholder.com/500x500')]"/>
                    <div className="text-center text-4xl text-white h-1/3 flex flex-col gap-4">
                        <h1>Fusca</h1>
                        <button className="underline">Informações</button>
                    </div>
                    <div className="text-white text-2xl text-center">
                        <label>Tempo Restante: 12 minutos e 30 segundos</label>
                    </div>
                </div>
            </section>
            {/* DAR LANCE */}
            <section className="w-1/2 md:p-8 max-md:w-full">
                <div className="bg-azul border-2 border-black rounded-xl h-full flex flex-col items-center justify-between">
                    <div className="flex flex-col w-full items-center">    
                        <div className="text-center py-4">
                            <h2 className="text-white font-bold text-4xl">Maior Lance:</h2>
                            <h4 className="text-white font-semibold text-4xl">R$ 27.000,00</h4>
                        </div>
                        <div className="bg-white h-[1px] w-[80%]"/>
                    </div>
                    <div className="w-full h-full m-16 text-2xl text-center text-white flex flex-col gap-2">
                        <p>Marcos Pereira: R$21.300,00</p>
                        <p>Maria Cristina: R$24.300,00</p>
                    </div>
                    <div className="w-full flex justify-center pb-8">
                        <input className="w-[80%] p-4 rounded-xl" type="number" placeholder="Digite seu lance aqui..."/>
                    </div>
                </div>
            </section>
        </main>

        <Footer/>
        </>
    )
}