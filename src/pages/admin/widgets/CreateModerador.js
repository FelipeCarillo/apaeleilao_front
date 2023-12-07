import * as XLSX from 'xlsx';
import React, { useState } from 'react';
import ReactInputMask from 'react-input-mask';
import { ToastContainer, toast } from 'react-toastify';

export default function CreateModerador( {handleCloseModal} ){
    const [showResults, setShowResults] = useState(false)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [password, setPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [viewPass, setViewPass] = useState(false)

    function signupModerador(e){
        // desativando reload
        e.preventDefault();
        // tratando cpf
        var cpfFormat = cpf.replace(/-/g, '')
        cpfFormat = cpfFormat.replace(/\./g, '')
        cpfFormat = cpfFormat.replace(/_/g, '')
        // Criando json
        const data = {
            "first_name": firstName,
            "last_name": lastName,
            "cpf": cpfFormat,
        }
        fetch (process.env.REACT_APP_API + "/create-user-by-admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token"),
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        }).then((data) => {
            setShowResults(true)
            setAccessCode(data.body.access_key)
            setPassword(data.body.password)
        }).catch((error) => {
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
        })
    }

    const createDocument = () => {
      const userData = {
        'Código de Acesso': accessCode, // Substitua pelo código de acesso do usuário
        'Senha': password,   // Substitua pela senha do usuário
      };
  
      const ws = XLSX.utils.json_to_sheet([userData]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, firstName + ' ' + lastName); // Substitua pelo nome do usuário
  
      XLSX.writeFile(wb, firstName + '_' + lastName + '.xlsx');
    };

    return (
        <>
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        <section className=''>
          { showResults ?
          <div className="text-2xl px-20 py-16 box-content">
            <p className='text-3xl mb-4 mx-auto text-center'>Criar Moderador</p>
            <div className="flex flex-col text-xl gap-2 mb-4 md:items-start">
              <label className='md:w-1/2 ms-2' htmlFor="Perfil">Código de Acesso:</label>
              <input type="text" className="bg-gray-300 rounded-full py-1 px-3 w-full" value={accessCode} readOnly/>
            </div>
            <div className="flex flex-col text-xl gap-2 mb-4 md:items-start">
              <label className='md:w-1/2 ms-2' htmlFor="Perfil">Senha:</label>
              <input type={viewPass === true ? 'text' : 'password'} className="bg-gray-300 rounded-full py-1 px-3 w-full" value={password} readOnly/>
              <label className="cursor-pointer text-lg ms-2" onClick={(e) => {setViewPass(!viewPass)}} tabIndex={0} onKeyDown={(event)=> event.keyCode === 13 && setViewPass(!viewPass)}>Mostrar Senha</label>
            </div>
            <div className='text-center'>
              <button className="bg-blue-500 hover:bg-blue-700 text-white w-[35%] mx-10 font-bold py-2 px-4 rounded-full" onClick={createDocument}>Baixar Credenciais<i class="fa-solid fa-file-arrow-down mx-2"></i></button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white w-[20%] mx-10 font-bold py-2 px-4 rounded-full" onClick={handleCloseModal}>Fechar</button>
            </div>
          </div>
          :
          <form className="text-center py-6" onSubmit={signupModerador}>
            <p className='text-3xl mb-4'>Criar Moderador</p>
            <div className="flex flex-col text-xl gap-2 mb-4 text-left md:items-center">
              <label className='md:w-1/2' htmlFor="Perfil">Nome:</label>
              <input type="text" className="bg-gray-300 rounded-full py-1 px-3 md:w-1/2" onChange={(e) => {setFirstName(e.target.value)}}/>
            </div>
            <div className="flex flex-col text-xl gap-2 mb-4 text-left md:items-center">
              <label className='md:w-1/2' htmlFor="Perfil">Sobrenome:</label>
              <input type="text" className="bg-gray-300 rounded-full py-1 px-3 md:w-1/2" onChange={(e) => {setLastName(e.target.value)}}/>
            </div>
            <div className="flex flex-col text-xl gap-2 mb-4 text-left md:items-center">
              <label className='md:w-1/2' htmlFor="cpf">CPF:</label>
              <ReactInputMask className="bg-gray-300 rounded-full py-1 px-3 md:w-1/2" onChange={(e) => {setCpf(e.target.value)}} mask="999.999.999-99" name="cpf" id="cpf"/>
            </div>
            <div className='flex text-xl gap-10 mt-10 mb-4 justify-center md:items-center'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit">Cadastrar</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleCloseModal}>Cancelar</button>
            </div>
          </form>
          }
        </section>
        </>
    )
}