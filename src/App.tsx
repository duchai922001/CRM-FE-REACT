import { BrowserRouter } from 'react-router-dom'
import './App.css'
import MainRouter from './routers/main.router'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <BrowserRouter>
      <MainRouter/>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  )
}

export default App
