import { useState } from "react"
import Navbar from "../../components/Navbar"
import { Link } from "react-router-dom"

export default function Login(){
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    async function Login(){
        if(login === ''){
            return
        }
        if(password === ''){
            return
        }

        await fetch('https://w5os3zgc5d.execute-api.sa-east-1.amazonaws.com/dev/apae-leilao/get-user?email='+login+'&password='+password, {
            mode: 'cors',
            method: 'GET',
        }).then(response => {
            if(response.ok){
                return response.json()
            }else{
                return Promise.reject(response);
            }
        }).then(data => {
            // AQUI VC CONTROLA O JSON DE RETORNO
            console.log("data: " + JSON.stringify(data.body.user))
        }).catch(error => {
            // AQUI VC CONTROLA O RESULTADO (STATUS CODE + MESSAGE)
            console.log("ERROOOO" + error.status);
            // 3. get error messages, if any
            error.json().then((json: any) => {
              console.log(json);
              console.log(json.message);
            })
        })       

    }

    return (
        <>
        <Navbar />
        
        <main className="px-4 my-8 flex flex-col justify-center">
            <h1 className="text-4xl text-center mt-4 font-medium text-blue-900 md:text-5xl">Login</h1>
            <div className="flex justify-center">
                <div className="w-[90%] h-[2px] bg-gray-200 my-2 md:my-4" />
            </div>

            {/* FORMULARIO DE LOGIN */}
            <form>
                <div className="flex flex-col text-xl gap-2 mb-4 md:items-center">
                    <label className='md:w-1/2' htmlFor="login">Email:</label>
                    <input onChange={(e) => {setLogin(e.target.value)}} className="bg-gray-200 rounded-full py-1 px-3 md:w-1/2" type="text" name="login" id="login"/>
                </div>

                <div className="flex flex-col text-xl gap-2 mb-4 md:items-center">
                    <label className='md:w-1/2' htmlFor="password">Senha:</label>
                    <input onChange={(e) => {setPassword(e.target.value)}} className="bg-gray-200 rounded-full py-1 px-3 md:w-1/2" type="password" name="password" id="password"/>
                    <Link className='underline max-md:self-start md:w-1/2' to="/">Esqueceu sua Senha?</Link>
                </div>

                <div className="flex justify-center mt-8">
                    <div className="w-[90%] h-[2px] bg-gray-200" />
                </div>

                <div className="flex flex-col items-center text-xl gap-4 my-4">
                    <div className='flex items-center max-md:self-start gap-1 md:w-1/2'>
                        <input className="w-4 h-4" type="checkbox" id="conected" name="conected"/>
                        <label htmlFor="conected">Deseja continuar conectado?</label>
                    </div>
                </div>
                
                <div className="flex justify-center mt-4">
                    <label onClick={Login} className="bg-yellow-300 py-4 px-16 text-xl rounded-full cursor-pointer">LOGIN</label>
                </div>
            </form>
        </main>

        <footer className='fixed bottom-0 mt-8 w-full text-center font-medium py-4 bg-azul shadow-xl'>
            <p className='text-white'>Ainda não possui uma conta? <Link className='text-yellow-400' to="/cadastro">Clique Aqui</Link> </p>
        </footer>
        </>
    )
}