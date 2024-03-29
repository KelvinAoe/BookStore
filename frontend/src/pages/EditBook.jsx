import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const EditBook = () => {
  const [title,setTile] = useState('');
  const [author,setAuthor] = useState('');
  const [publishYear,setPublishYear] = useState('');
  const [loading ,setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const{ enqueueSnackbar} = useSnackbar()

  useEffect(()=>{
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response)=>{
        setTile(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        
        setLoading(false);
      })
      .catch((error)=>{
        setLoading(false);
        alert('An error happened. Please Check console');
        console.log(error);
      })
  },[])
  
  const handleEditBook = ()=>{
    const data = {
      title,author,publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`,data)
      .then(()=>{
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', {variant:'success'})
        navigate('/')
      })
      .catch((error)=>{
        setLoading(false);
        // alert('An error happened. Please Check console');
        enqueueSnackbar('Error', {variant:'error'})
        console.log(error);
      });

  }

  return (
    <div className='p-4 '>
      <BackButton />
      <h1 className='my-4 text-3xl'>Edit Book</h1>
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4 '>
          <label className='mr-4 text-xl text-gray-400'> TItle</label>
          <input type="text" value={title} onChange={(e)=> setTile(e.target.value)} className='w-full px-4 py-2 border-2 border-gray-500'/>
        </div>
        <div className='my-4 '>
          <label className='mr-4 text-xl text-gray-400'> Author</label>
          <input type="text" value={author} onChange={(e)=> setAuthor(e.target.value)} className='w-full px-4 py-2 border-2 border-gray-500'/>
        </div>
        <div className='my-4 '>
          <label className='mr-4 text-xl text-gray-400'> Publish Year</label>
          <input type="text" value={publishYear} onChange={(e)=> setPublishYear(e.target.value)} className='w-full px-4 py-2 border-2 border-gray-500'/>
        </div>
        <button className='p-2 m-8 bg-sky-300' onClick={handleEditBook}>Update</button>
      </div>
    </div>
  )
}

export default EditBook