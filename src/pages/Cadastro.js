import {Link} from 'react-router-dom'

export default function Cadastro() {
    return (
        <>
        <header></header>
        <main></main>
        <footer className='fixed bottom-0 w-full text-center font-semibold py-4 bg-blue-600 shadow-xl'>
            <p className='text-white'>Já possui uma conta? <Link className='text-yellow-400' to="/cadastro">Clique Aqui</Link> </p>
        </footer>
        </>
    )
}