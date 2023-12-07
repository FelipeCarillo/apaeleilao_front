import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Principal from './pages/Principal'
import Login from './pages/register/Login'
import Cadastro from './pages/register/Cadastro'
import MeuPerfil from './pages/user/MeuPerfil'
import Participados from './pages/user/Participados'
import Leiloes from './pages/admin/Leiloes'
import Verificacao from './pages/register/Verificacao'
import LoginAdmin from './pages/admin/LoginAdmin'
import Feedback from './pages/user/Feedback'
import RedefinirSenha from './pages/register/RedefinirSenha'
import { Usuarios } from './pages/admin/Usuarios'
import Leilao from './pages/leilao/Leilao'
import FeedbackAdmin from './pages/admin/Feedback'

// LIBRAS
import VLibras from '@djpfs/react-vlibras'

export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Principal />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/cadastro' element={<Cadastro />}/>
        <Route path='/verificacao' element={<Verificacao />}/>
        <Route path='/participados' element={<Participados />}/>
        <Route path='/meuPerfil' element={<MeuPerfil />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/redefinirSenha' element={<RedefinirSenha />} />
        {/* LEILAO ATIVO */}
        <Route path='/leilao' element={<Leilao />} />
        {/* ADMIN */}
        <Route path='/admin' element={<Leiloes />} />
        <Route path='/admin/login' element={<LoginAdmin />} />
        <Route path='/admin/usuarios' element={<Usuarios />} />
        <Route path='/admin/feedback' element={<FeedbackAdmin />} />
      </Routes>
    </Router>
    
    {/* LIBRAS API */}
    <div className='App'>
      <VLibras forceOnload={true}/>
    </div>
    </>
  )
}
