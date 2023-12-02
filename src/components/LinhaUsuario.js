import { useEffect, useState } from "react";
import Modal from "react-modal";

export default function LinhaUsuario({ data }) {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [penalidadeId, setPenalidadeId] = useState(null);
  const [penalidadeData, setPenalidadeData] = useState(null);
  const [penalidadeMotivo, setPenalidadeMotivo] = useState(null);
  const [penalidadeDescricao, setPenalidadeDescricao] = useState(null);

  function penalidadesIcon (penalidade) {
    setIsOpen(true);
    setPenalidadeId(penalidade.suspension_id);
    setPenalidadeData(penalidade.date);
    setPenalidadeMotivo(penalidade.reason);
    setPenalidadeDescricao(penalidade.description);
    console.log(penalidade);
  }
  function closeModal() {
    setIsOpen(false);
  }  
  function removePenalidade (idP) {
    console.log(idP);
    fetch (process.env.REACT_APP_API + "/delete-suspension?suspension_id=" + idP, {
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
            window.location.reload();
        }).catch((error) => {
            console.log(error.json());
    })
  }

  return (
    <>
      {data.map((usuario) => (
        <tr key={usuario.user_id} className="bg-azul text-white border-b-2 border-white h-[40px]">
            <td className="p-1">{usuario.first_name} {usuario.last_name}</td>
            <td className="p-1">{usuario.cpf}</td>
            <td className="p-1">{usuario.phone}</td>
            <td className="p-1">{usuario.email}</td>
            <td className="p-1">
                <ul className="flex flex-row items-center">
                    <p className="pe-5 text-lg">Penalidades:</p>
                    {usuario && usuario.suspensions && Object.values(usuario.suspensions).map((penalidade) => (
                    <li key={penalidade.suspension_id}>
                        {penalidade.status_suspension === 'ACTIVE' ?
                        <button className="text-yellow-300 me-5 rounded-full text-3xl hover:text-4xl" onClick={() => { penalidadesIcon(penalidade) }}>
                            <i className="fa-solid fa-circle-exclamation"></i>
                        </button>
                        :
                        <button className="text-gray-500-300 me-5 rounded-full text-3xl hover:text-4xl" onClick={() => { penalidadesIcon(penalidade) }}>
                            <i className="fa-solid fa-circle-exclamation"></i>
                        </button>}
                        <Modal isOpen={modalIsOpen} ariaHideApp={false} onRequestClose={closeModal}
                        style={{
                            overlay: { backgroundColor: 'rgba(0,0,0,0.3)' },
                            content: {
                            backgroundColor: '#fff',
                            borderRadius: '25px',
                            width: '80%',
                            height: window.innerWidth >= 768 ? '85%' : '75%',
                            margin: 'auto',
                            padding: 0,
                            }
                        }}
                        contentLabel="Example Modal"
                        >
                        <div className="flex flex-col items-center">
                            <p className="text-4xl">Penalidades</p>
                            <div className="flex flex-col items-center">
                            <p className="text-2xl">ID: {penalidadeId}</p>
                            <p className="text-2xl">Data: {penalidadeData}</p>
                            <p className="text-2xl">Motivo: {penalidadeMotivo}</p>
                            <p className="text-2xl">Descrição: {penalidadeDescricao}</p>
                            </div>
                            <button className="text-3xl bg-azul text-white rounded-full px-5 py-2 mt-5" onClick={() => { removePenalidade(penalidadeId) }}>Remover</button>
                        </div>
                        </Modal>
                    </li>
                    ))}
                </ul>
            </td>
        </tr>
      ))}
    </>
  );
}

// <div key={usuario.user_id} className="border p-4 my-2 flex flex-row justify-between items-center bg-azul text-white">
//           {/* <p className=" text-xl">ID: {usuario.user_id}</p> */}
//           <p className="w-[20%]">Nome: {usuario.first_name} {usuario.last_name}</p>
//           <p className="w-[20%]">CPF: {usuario.cpf}</p>
//           <p className="w-[20%]">Telefone: {usuario.phone}</p>
//           <p className="w-[20%]">Email: {usuario.email}</p>
//           <ul className="w-[20%] flex flex-row items-center">
//             <p className="pe-5 text-xl">Penalidades:</p>
//             {usuario && usuario.suspensions && Object.values(usuario.suspensions).map((penalidade) => (
//               <li>
//                 <button className="text-yellow-300 me-5 rounded-full text-4xl hover:text-5xl" onClick={() => { penalidadesIcon(penalidade) }}>
//                   <i className="fa-solid fa-circle-exclamation"></i>
//                 </button>
//                 <Modal isOpen={modalIsOpen} ariaHideApp={false} onRequestClose={closeModal}
//                   style={{
//                     overlay: { backgroundColor: 'rgba(0,0,0,0.3)' },
//                     content: {
//                       backgroundColor: '#fff',
//                       borderRadius: '25px',
//                       width: '80%',
//                       height: window.innerWidth >= 768 ? '85%' : '75%',
//                       margin: 'auto',
//                       padding: 0,
//                     }
//                   }}
//                   contentLabel="Example Modal"
//                 >
//                   <p></p>
//                 </Modal>
//               </li>
//             ))}
//           </ul>
//         </div>