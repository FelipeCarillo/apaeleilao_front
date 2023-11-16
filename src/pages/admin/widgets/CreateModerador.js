import * as XLSX from 'xlsx';
import React, { useState } from 'react';
import ReactInputMask from 'react-input-mask';

export default function CreateModerador( {handleCloseModal} ){
    const [showResults, setShowResults] = useState(false)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [password, setPassword] = useState('');
    const [cpf, setCpf] = useState('');

    function signupModerador(){
        const data = {
            "firstName": firstName,
            "lastName": lastName,
            "cpf": cpf
        }
        fetch (process.env.REACT_APP_API + "/create_user_by_admin", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        }).then(response => {
            if(response.status === 201){
                alert("Moderador cadastrado com sucesso!")
                setShowResults(true)
                // setAccessCode(response.body.accessCode)
                setAccessCode(response.body.accessCode)
                // setPassword(response.body.password)
                setPassword(response.body.password)
            }
            else{
                alert("Erro ao cadastrar moderador!")
            }
        
        })
    }

    function handleDownload(){
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet([{
            "Código de Acesso": accessCode,
            "Senha": password
        }]);
        XLSX.utils.book_append_sheet(wb, ws, "Credenciais");
        XLSX.writeFile(wb, "Credenciais.xlsx");
    }



    return (
        <>
        <section className=''>
          { showResults ?
          <div className="mx-[100px] text-2xl mr-24 mt-4 ml-24 box-content h-100 w-2200">
            <div className="flex flex-col text-xl gap-2 mb-4 md:items-center">
              <label className='md:w-1/2' htmlFor="Perfil">Código de Acesso:</label>
              <input type="text" className="bg-gray-300 rounded-full py-1 px-3 w-full" value={accessCode} readOnly/>
            </div>
            <div className="flex flex-col text-xl gap-2 mb-4 md:items-center">
              <label className='md:w-1/2' htmlFor="Perfil">Senha:</label>
              <input type="password" className="bg-gray-300 rounded-full py-1 px-3 w-full" value={password} readOnly/>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleCloseModal}>Baixar Credenciais</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleCloseModal}>Fechar</button>
          </div>
          :
          <form className="mx-[100px] justify-center text-2xl mr-24 mt-24 ml-24 box-content h-100 w-2200" onSubmit={signupModerador} onABOR>
            <div className="flex flex-col text-xl gap-2 mb-4 md:items-center">
              <label className='md:w-1/2' htmlFor="Perfil">Nome:</label>
              <input type="text" className="bg-gray-300 rounded-full py-1 px-3 md:w-1/2" onChange={(e) => {setFirstName(e.target.value)}}/>
            </div>
            <div className="flex flex-col text-xl gap-2 mb-4 md:items-center">
              <label className='md:w-1/2' htmlFor="Perfil">Sobrenome:</label>
              <input type="text" className="bg-gray-300 rounded-full py-1 px-3 md:w-1/2" onChange={(e) => {setLastName(e.target.value)}}/>
            </div>
            <div className="flex flex-col text-xl gap-2 mb-4 md:items-center">
              <label className='md:w-1/2' htmlFor="cpf">CPF:</label>
              <ReactInputMask className="bg-gray-300 rounded-full py-1 px-3 md:w-1/2" onChange={(e) => {setCpf(e.target.value)}} mask="999.999.999-99" name="cpf" id="cpf"/>
            </div>
            <div className='flex text-xl gap-2 mb-4 md:items-center'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit">Cadastrar</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleCloseModal}>Cancelar</button>
            </div>
          </form>
          }
        </section>
        </>
    )
}