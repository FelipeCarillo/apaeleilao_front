import Footer from "../../components/Footer";
import NavbarAdmin from "../../components/NavbarAdmin";
import CreateModerador from "./widgets/CreateModerador";
import { useState } from "react";
import Modal from "react-modal";


Modal.setAppElement("#root");

export function Usuarios() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleCreateModerador() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    return (
        <>
            <NavbarAdmin pag="usuarios" />
            <main>
                <section>
                <button className="bg-yellow-300 py-4 px-16 text-xl mb-4 rounded-full cursor-pointer flex items-center gap-2"onClick={handleCreateModerador}><i className="fa-solid fa-pen"></i>Criar</button>
                    <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
                        <CreateModerador handleCloseModal={handleCloseModal}/>
                        
                    </Modal>
                </section>
            </main>
            <Footer />
        </>
    );
}