import Footer from "../../components/Footer";
import NavbarAdmin from "../../components/NavbarAdmin";
import CreateModerador from "./widgets/CreateModerador";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import LinhaUsuario from "../../components/LinhaUsuario";
import { ToastContainer, toast } from 'react-toastify';


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
            setUsuarios(data.body.users);
        }).catch(error => {
            // 3. get error messages, if any
            error.json().then((json: any) => {
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
        if (opcao === 'todos'){
            usuarios.map((usuario) => {
                if (usuario.type_account === 'USER'){
                    document.getElementById(usuario.user_id).style.display = 'table-row';
                } else {
                    document.getElementById(usuario.access_key).style.display = 'table-row';
                }
            })
        } else if (opcao === 'penalidades'){
            usuarios.map((usuario) => {
                if (usuario.type_account === 'USER'){
                    if (usuario.suspensions != null || usuario.suspensions != undefined){
                    } else {
                        document.getElementById(usuario.user_id).style.display = 'none';
                    }
                } else {
                    document.getElementById(usuario.access_key).style.display = 'none';
                }
            })
        }
    }

    return (
        <>
            <NavbarAdmin pag="usuarios" />
            <main>
                <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
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
                            md:hover:text-2xl md:hover:w-[450px]"onClick={handleCreateModerador}><i className="fa-solid fa-pen"></i>Criar Moderador</button>
                        <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}
                        style={{
                            overlay: { backgroundColor: 'rgba(0,0,0,0.3)' },
                            content: {
                            backgroundColor: '#fff',
                            borderRadius: '25px',
                            width: '50%',
                            height: '50%',
                            margin: 'auto',
                            padding: 0,
                            }
                        }}
                        contentLabel="Example Modal"
                        >
                            <CreateModerador handleCloseModal={handleCloseModal}/>
                        </Modal>
                    </section>
                </div>
                {/* Exibição dos Usuários */}
                <div id="tabelaUsuario" className="md:px-10 snap-y mb-5">
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
                        <tbody id="linhaUsuario" className="border-2 border-white">
                            <LinhaUsuario data={usuarios}/>
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer />
        </>
    );
}