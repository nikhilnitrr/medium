import './App.css'
import { BlogDetail } from './pages/BlogDetail'
import { Blog } from './pages/Blog'
import { SignIn } from './pages/Signin'
import { Signup } from './pages/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path= "/" element={<Signup/>}/>
      <Route path= "/signin" element={<SignIn/>}/>
      <Route path= "/blogs" element={<Blog/>}/>
      <Route path= "/blog/:id" element={<BlogDetail/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
