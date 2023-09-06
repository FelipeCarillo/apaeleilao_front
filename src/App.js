import axios from 'axios';
import './App.css';
import { useState } from 'react';

function App() {
  const [email, setEmail] = useState(null)
  const [passwd, setPasswd] = useState(null)
  
  function apiGetUser() {
    const apiUrl = "https://nad4eryio2anscac6c5ru3yeoi0qdyct.lambda-url.sa-east-1.on.aws"
    
    const requestData = {
      "email": email,
      "password": passwd,
    };
    axios.post(apiUrl, requestData).then(function (response) {
      // Manipule a resposta aqui
      console.log('Resposta do servidor:', response.data);
    })
    .catch(function (error) {
      // Manipule erros aqui
      console.error('Erro na requisição:', error);
    });
  }


  return (
    <main>
      <label htmlFor='email'>email:</label>
      <input type='text' name='email' id='email'  onChange={(e) => {setEmail(e.target.value)}}/>

      <label htmlFor='passwd'>Senha:</label>
      <input type='password' name='passwd' id='passwd' onChange={(e) => {setPasswd(e.target.value)}} />

      <button onClick={apiGetUser}>Enviar</button>
    </main>
  );
}

export default App;
