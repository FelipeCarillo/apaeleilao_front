import Footer from "../../components/Footer";
import NavbarAdmin from "../../components/NavbarAdmin";
import CreateModerador from "./widgets/CreateModerador";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import LinhaUsuario from "../../components/LinhaUsuario";


Modal.setAppElement("#root");

export function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
    useEffect(() => {
        fetch (process.env.REACT_APP_API + "/get-all-users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token"),
            },
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        }).then((data) => {
            console.log(data);
            setUsuarios(data.body.users);
        }).catch((error) => {
            // console.log(error.json());
        });
    }, []);
    

    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleCreateModerador() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    function filtro(opcao){
        console.log(usuarios);
        if (opcao === 'todos'){
            // terminar aqui
        } else if (opcao === 'penalidades'){
            usuarios.map((usuario) => {
                console.log(usuario.suspensions);
            })
        }
    }

    return (
        <>
            <NavbarAdmin pag="usuarios" />
            <main>
                <h1 className="text-4xl text-center mt-8">O que você deseja?</h1>
                <div className="flex flex-col md:flex-row px-5 justify-center my-10">
                    <section>
                        <button className="bg-yellow-300 w-[100%] md:w-96 justify-center border-2 border-black py-4 px-16 text-xl mb-4 rounded-full cursor-pointer flex items-center gap-2 md:mx-20
                            md:hover:text-2xl md:hover:w-[450px]" onClick={() => {filtro('todos')}}>Todos os usuários</button>
                    </section>
                    <section>
                        <button className="bg-yellow-300 w-[100%] md:w-96 justify-center border-2 border-black py-4 px-16 text-xl mb-4 rounded-full cursor-pointer flex items-center gap-2 md:mx-20
                            md:hover:text-2xl md:hover:w-[450px]" onClick={() => {filtro('penalidades')}}>Usuários com penalidades</button>
                    </section>
                    <section>
                        <button className="bg-yellow-300 w-[100%] md:w-96 justify-center border-2 border-black py-4 px-16 text-xl mb-4 rounded-full cursor-pointer flex items-center gap-2 md:mx-20
                            md:hover:text-2xl md:hover:w-[450px]"onClick={handleCreateModerador}><i className="fa-solid fa-pen"></i>Criar</button>
                        <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
                            <CreateModerador handleCloseModal={handleCloseModal}/>
                        </Modal>
                    </section>
                </div>
                {/* Exibição dos Usuários */}
                <div id="linhaUsuario" className="md:px-10 snap-y mb-5">
                    <table className="table-fixed w-full border-spacing-2">
                        {window.innerWidth >= 768 ?
                        <thead>
                            <tr className="bg-azul text-white">
                                <th className="w-[20%] text-2xl border-2 border-white">Nome</th>
                                <th className="w-[20%] text-2xl border-2 border-white">CPF</th>
                                <th className="w-[20%] text-2xl border-2 border-white">Telefone</th>
                                <th className="w-[20%] text-2xl border-2 border-white">Email</th>
                                <th className="w-[20%] text-2xl border-2 border-white">Penalidades</th>
                            </tr>
                        </thead>
                        : ''
                        }
                        <tbody className="border-2 border-white">
                            <LinhaUsuario data={usuarios}/>
                        </tbody>
                    </table>
                    {/* <LinhaUsuario data={usuarios}/> */}
                </div>
            </main>
            <Footer />
        </>
    );
}