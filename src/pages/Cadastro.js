import {Link} from 'react-router-dom'

function next() {
    let cadastro1 = document.getElementById('cadastro1');
    let cadastro2 = document.getElementById('cadastro2');
    cadastro1.classList.add('hidden');
    cadastro2.classList.remove('hidden');
}

function back() {
    let cadastro1 = document.getElementById('cadastro1');
    let cadastro2 = document.getElementById('cadastro2');
    cadastro1.classList.remove('hidden');
    cadastro2.classList.add('hidden');
}

export default function Cadastro() {
    const imgLogo = 'https://apaeleilaoimt.s3.sa-east-1.amazonaws.com/galery/logo-apaeleilao-branco.jpg'

    return (
        <>
        <header className='bg-blue-600 flex justify-center p-4 rounded-b-2xl shadow-xl'>
            <img src={imgLogo} alt='logo da APAE leilão' className='w-[200px] self-center md:w-[250px]'/>
        </header>
        <main className="px-4 flex flex-col justify-center">
            <h1 className="text-4xl text-center mt-4 font-medium text-blue-900 md:text-5xl">Registrar-se</h1>
            <div className="flex justify-center">
                <div className="w-[90%] h-[2px] bg-gray-200 my-2 md:my-4" />
            </div>

            {/* FORMULARIO DE CADASTRO */}
            <form>
                <section id='cadastro1'>
                    <div className="flex flex-col text-xl gap-2 mb-4 md:items-center">
                        <label className='md:w-1/2' htmlFor="name">Nome Completo:</label>
                        <input className="bg-gray-200 rounded-full py-1 px-3 md:w-1/2" type="text" name="name" id="name"/>
                    </div>

                    <div className="flex flex-col text-xl gap-2 mb-4 md:items-center">
                        <label className='md:w-1/2' htmlFor="email">Email:</label>
                        <input className="bg-gray-200 rounded-full py-1 px-3 md:w-1/2" type="email" name="email" id="email"/>
                    </div>

                    <div className="flex flex-col text-xl gap-2 mb-4 md:items-center">
                        <label className='md:w-1/2' htmlFor="cpf">CPF:</label>
                        <input className="bg-gray-200 rounded-full py-1 px-3 md:w-1/2" type="text" name="cpf" id="cpf"/>
                    </div>

                    <div className="flex flex-col text-xl gap-2 mb-4 md:items-center">
                        <label className='md:w-1/2' htmlFor="tel">Celular (Com DDD):</label>
                        <input className="bg-gray-200 rounded-full py-1 px-3 md:w-1/2" type="text" name="tel" id="tel"/>
                    </div>

                    <div className='flex justify-center'>
                        <label className="bg-yellow-300 py-4 px-16 text-xl rounded-full" onClick={next}>Continuar</label>
                    </div>
                </section>

                <section id='cadastro2' className='hidden'>
                    <div className="flex flex-col text-xl gap-2 mb-4 md:items-center">
                        <label className='md:w-1/2' htmlFor="password">Senha:</label>
                        <input className="bg-gray-200 rounded-full py-1 px-3 md:w-1/2" type="password" name="password" id="password"/>
                    </div>

                    <div className="flex flex-col text-xl gap-2 mb-4 md:items-center">
                        <label className='md:w-1/2' htmlFor="password">Confirmar a senha:</label>
                        <input className="bg-gray-200 rounded-full py-1 px-3 md:w-1/2" type="password" name="password" id="password"/>
                    </div>

                    <div>
                        <label className='pl-3'>Sua senha deve conter:</label>
                        <ul className='pl-2'>
                            <li><i className="fa-solid fa-spinner animate-spin"></i> No mínimo 8 caracteres</li>
                            <li><i className="fa-solid fa-spinner animate-spin"></i> Ao menos 1 letra maiúscula</li>
                            <li><i className="fa-solid fa-spinner animate-spin"></i> Ao menos 1 número</li>
                            <li><i className="fa-solid fa-spinner animate-spin"></i> Ao menos 1 caracter especial; Ex: (!,@,#,$)</li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center text-xl gap-4 my-4">
                        <div className='flex items-center max-md:self-start gap-1 md:w-1/2'>
                            <input className="w-4 h-4" type="checkbox" id="conected" name="conected" required/>
                            <label htmlFor="conected">Concordo com os Termos de Uso</label>
                        </div>
                    </div>

                    <div className='flex justify-between'>
                        <label className="py-4 px-10 text-xl rounded-full border-2 border-yellow-300" onClick={back}>Voltar</label>
                        <button className="bg-yellow-300 py-4 px-10 text-xl rounded-full">Cadastrar</button>
                    </div>
                </section>

            </form>
        </main>
        <footer className='max-md:fixed max-md:bottom-0 mt-4 w-full text-center font-semibold py-4 bg-blue-600 shadow-xl'>
            <p className='text-white'>Já possui uma conta? <Link className='text-yellow-400' to="/login">Clique Aqui</Link></p>
        </footer>
        </>
    )
}