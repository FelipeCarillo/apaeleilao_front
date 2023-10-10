import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Principal from './pages/Principal'
import Login from './pages/register/Login'
import Cadastro from './pages/register/Cadastro'
import MeuPerfil from './pages/user/MeuPerfil'
import Participados from './pages/user/Participados'
import Leiloes from './pages/admin/Leiloes'

export default function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Principal />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/cadastro' element={<Cadastro />}/>
        <Route path='/participados' element={<Participados />}/>
        <Route path='/meuPerfil' element={<MeuPerfil />} />
        {/* ADMIN */}
        <Route path='/admin/leiloes' element={<Leiloes />} />
      </Routes>
    </Router>
  )
}
