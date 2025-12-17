import logoheader from './assets/logoheader.png'
import favicon from './assets/favicon.png'
import './styles/App.css'
import { Welcome, SignIn, SignUp, Auth2 } from './pages/index.js'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Auth2" element={<Auth2 />} />
    </Routes>
  )
}

export default App
