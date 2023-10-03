import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import Principal from './pages/Principal'
import Cadastro from './pages/Cadastro'
import Participados from './pages/Participados'
import MeuPerfil from './pages/MeuPerfil'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Principal />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/cadastro' element={<Cadastro />}/>
        <Route path='/participados' element={<Participados />}/>
        <Route path='/meuPerfil' element={<MeuPerfil />} />
      </Routes>
    </Router>
  )
}
