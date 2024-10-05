import './App.css'
import { Blog } from './pages/Blog'
import { SignIn } from './pages/Signin'
import { Signup } from './pages/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path= "/signup" element={<Signup/>}/>
      <Route path= "/signin" element={<SignIn/>}/>
      <Route path= "/blog" element={<Blog/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
