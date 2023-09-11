import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import Principal from './pages/Principal'
import Cadastro from './pages/Cadastro'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Principal />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/cadastro' element={<Cadastro />}/>
      </Routes>
    </Router>
  )
}
