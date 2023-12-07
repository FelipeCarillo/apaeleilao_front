import Estrelas from "../../components/Estrelas";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";

export default function Feedback() {
    const [loading,setLoading] = useState(false)
    const [grade,setGrade] = useState('')

    function sendFeedback(e){
        e.preventDefault();
        var feedback = document.getElementById("texto").value;
        var headers = {
            "Content-Type": "application/json",
        }
        setLoading(!loading)
        var data = {}
        if (localStorage.getItem("token")){
            data = {
                "content": feedback,
                "grade" : grade,
            }
            headers.Authorization = localStorage.getItem("token")
        }
        else{
            var email = document.getElementById("email").value;
            data = {                
                "email": email,
                "content": feedback,
                "grade" : grade,
        }}
        fetch (process.env.REACT_APP_API + "/create-feedback", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        }).then((data) => {
            toast.success(data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setTimeout(() => {
                window.location.reload();
              }, 3000);
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
                setLoading(false)
            })
        });
    }

    return(
        <>
        {/* NAVBAR */}
        <Navbar pag='Perfil'/>
        
        <main>
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            <h1 className="text-center text-6xl my-10">Feedback</h1>
            <form className="w-[80%] md:w-[40%] mx-auto" onSubmit={sendFeedback}>
                <div className="flex flex-col gap-2 mb-4 text-center">
                    <Estrelas grade={grade} setGrade={setGrade}></Estrelas>
                </div>
                {localStorage.getItem("token") === null ? 
                <div>
                    <label className="flex flex-col mb-2">
                        <span className="ms-2 text-2xl">Email</span>
                        <input id="email" type="email" placeholder="Exemplo@gmail.com" className="text-xl p-2 rounded-full border-2 border-gray-600 bg-gray-200"></input>
                    </label>
                </div>
                : ''}
                <div>
                    <label className="flex flex-col mb-4">
                        <span className="ms-2 text-2xl">Mensagem</span>
                        <textarea id="texto" className="text-xl p-2 rounded-lg border-2 h-[200px] border-gray-600 bg-gray-200 text-justify" placeholder="Digite aqui..." cols={50}></textarea>
                    </label>
                </div>
                <div className="flex justify-center">
                    <button className="bg-yellow-300 py-4 px-16 text-xl mb-4 rounded-full cursor-pointer flex items-center gap-2" type="submit"><i className={`fa-solid fa-circle-notch animate-spin ${loading ? 'block' : 'hidden'}`}></i>Enviar</button>
                </div>
            </form>
        </main>
        {/* FOOTER */}
        <Footer />
        </>
    )
}