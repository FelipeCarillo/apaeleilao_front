import NavbarAdmin from "../../components/NavbarAdmin";
import Footer from "../../components/Footer";

export default function Leiloes() {
    return (
        <>
            <NavbarAdmin />

            <main>
                <section>
                    <h1 className="text-5xl text-center my-4">Leilões</h1>
                    <div className="flex w-full gap-4 px-8 mb-4">
                        <input className="w-full border-2 border-black rounded-lg" text="text" placeholder="Pesquisar..."/>
                        <button className="flex items-center bg-yellow-400 px-8 py-2 rounded-lg border-2 border-black">Filtros <i className="fa-solid fa-filter"></i></button>
                    </div>
                </section>
            </main>
            
            <Footer />
        </>
    )
}