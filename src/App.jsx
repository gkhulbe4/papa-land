import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Home from './components/Home'
import AddLand from './components/AddLand'
import Header from './components/Header'
import Login from './components/Login'
import AllLands from './components/AllLands';
import Admin from './components/Admin'
import Edit from './components/Edit'
import { ChakraProvider } from '@chakra-ui/react'


function App() {
  const [count, setCount] = useState(0)

  return (
   <ChakraProvider>
    <div>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/addland" element={<AddLand/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/alllands' element={<AllLands/>}/>
        <Route path='/edit/:landId' element={<Edit/>}/>
      </Routes>
    </Router>
   </div>
   </ChakraProvider>
  )
}

export default App
