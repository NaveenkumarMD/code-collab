import react from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Editor from './Components/Editor'
function App(){
  return(
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Editor/>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App