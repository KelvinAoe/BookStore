import { useState, useEffect } from 'react'
import axios from "axios";
import { Route, Routes } from 'react-router-dom';
import Home from '../src/pages/Home';
import CreateBooks from '../src/pages/CreateBooks';
import ShowBook from '../src/pages/ShowBook';
import EditBooks from './pages/EditBook';
import DeleteBooks from '../src/pages/DeleteBooks';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/books/create' element={<CreateBooks/>}></Route>
    <Route path='/books/details/:id' element={<ShowBook/>}></Route>
    <Route path='/books/edit/:id' element={<EditBooks/>}></Route>
    <Route path='/books/delete/:id' element={<DeleteBooks/>}></Route>
  </Routes>
  )
}

export default App
