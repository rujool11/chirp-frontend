import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import ErrorPage from './pages/ErrorPage'

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthPage/>}></Route>
        <Route path='/home' element={<HomePage/>}></Route>
        <Route path='*' element={<ErrorPage/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
