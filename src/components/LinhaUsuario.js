import { useEffect, useState } from "react";
import Modal from "react-modal";
import { ToastContainer, toast } from 'react-toastify';

export default function LinhaUsuario({ data }) {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [penalidadeId, setPenalidadeId] = useState(null);
  const [penalidadeData, setPenalidadeData] = useState(null);
  const [penalidadeMotivo, setPenalidadeMotivo] = useState(null);
  const [penalidadeDescricao, setPenalidadeDescricao] = useState(null);
  const [penalidadeStatus, setPenalidadeStatus] = useState(null);

  function penalidadesIcon (penalidade) {
    setIsOpen(true);
    setPenalidadeId(penalidade.suspension_id);
    setPenalidadeData(penalidade.date_suspension);
    setPenalidadeMotivo(penalidade.reason);
    setPenalidadeDescricao(penalidade.description);
    setPenalidadeStatus(penalidade.status_suspension);
  }
  function closeModal() {
    setIsOpen(false);
  }  
  function removePenalidade (idP) {
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
  function convertData (data) {
    var date = new Date(data*1000);
    return date.toLocaleDateString();
}

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      {window.innerWidth >= 768 ? 
        data.map((usuario) => (
          <tr key={usuario.user_id} id={usuario.type_account === 'MODERATOR' ? usuario.access_key : usuario.user_id} className="bg-azul text-white border-b-2 border-white h-[40px] linha-tabela">
              <td className="p-1">{usuario.first_name} {usuario.last_name} ({usuario.type_account === 'USER' ? 'USUÁRIO' : 'MODERADOR '})</td>
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
                              width: '50%',
                              height: '50%',
                              margin: 'auto',
                              padding: 0,
                              }
                          }}
                          contentLabel="Example Modal"
                          >
                          <div className="flex flex-col items-center py-10">
                              <p className="text-5xl mb-10">Penalidade</p>
                              <div className="flex flex-col items-center">
                              <p className="text-2xl">ID: {penalidadeId}</p>
                              <p className="text-2xl">Data: {convertData(penalidadeData)}</p>
                              <p className="text-2xl">Motivo: {penalidadeMotivo}</p>
                              <p className="text-2xl">Descrição: {penalidadeDescricao}</p>
                              <p className="text-2xl">Estado: {penalidadeStatus === 'ACTIVE' ? 'ATIVO' : 'CANCELADO'}</p>
                              </div>
                              <button className="text-3xl bg-azul text-white rounded-full px-5 py-2 mt-5" onClick={() => { removePenalidade(penalidadeId) }}>Remover</button>
                          </div>
                          </Modal>
                      </li>
                      ))}
                  </ul>
              </td>
          </tr>
      ))
      : 
        data.map((usuario) => (
          <tr key={usuario.user_id} id={usuario.type_account === 'MODERATOR' ? usuario.access_key : usuario.user_id} className="bg-azul text-white border-b-2 border-white h-[40px] linha-tabela">
            <td>
              <p className="p-1">Nome: {usuario.first_name} {usuario.last_name} ({usuario.type_account === 'USER' ? 'USUÁRIO' : 'MODERADOR '})</p>
              <p className="p-1">CPF: {usuario.cpf}</p>
              <p className="p-1">Telefone: {usuario.phone}</p>
              <p className="p-1">Email: {usuario.email}</p>
              <div className="p-1">
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
                              height: '60%',
                              margin: 'auto',
                              padding: 0,
                              }
                          }}
                          contentLabel="Example Modal"
                          >
                          <div className="flex flex-col items-center py-10">
                              <p className="text-5xl mb-10">Penalidade</p>
                              <div className="flex flex-col items-center">
                              <p className="text-2xl">ID: {penalidadeId}</p>
                              <p className="text-2xl">Data: {convertData(penalidadeData)}</p>
                              <p className="text-2xl">Motivo:</p>
                              <p className="text-xl">{penalidadeMotivo}</p>
                              <p className="text-2xl">Descrição: {penalidadeDescricao}</p>
                              <p className="text-2xl">Estado: {penalidadeStatus === 'ACTIVE' ? 'ATIVO' : 'CANCELADO'}</p>
                              </div>
                              <button className="text-3xl bg-azul text-white rounded-full px-5 py-2 mt-5" onClick={() => { removePenalidade(penalidadeId) }}>Remover</button>
                          </div>
                          </Modal>
                      </li>
                      ))}
                  </ul>
              </div>
            </td>
          </tr>
      ))
      }
    </>
  );
}