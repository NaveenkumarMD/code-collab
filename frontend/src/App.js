import react from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Editor from './Components/Editor'
import DB from './Components/Collabcode'
import Socket from './Components/Socket'
import Login from './Screens/Login'
import Editorpage from './Screens/Editorpage'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Editor />} />
        <Route path='/socket' element={<Socket />} />
        <Route path='/db' element={<DB />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App