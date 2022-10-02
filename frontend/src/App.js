import react from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Editor from './Components/Editor'
import DB from './Components/DB'
import Socket from './Components/Socket'
function App(){
  return(
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Editor/>} />
          <Route path='/socket' element={<Socket/>} />
          <Route path='/db' element={<DB/>} />
          
        </Routes>
      </BrowserRouter>
  )
}

export default App