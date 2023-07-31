import { Container, MenuItem, Select } from '@mui/material'
import axios from 'axios'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {client} from '../pages/types'
import tokenService from '../service/token.service'



const ClientIdentity = () => {
  
  const [ redirect, setRedirect ] = useState(false);
  const navigate = useNavigate();
  
  let client=localStorage.getItem('client')
  const[formValue,setformValue]=useState({
   
    DocumentType: "",
    Status: "",
    Description: "",
    clientId: Number(client)
  })

  const to = tokenService.getLocalAccessToken();

  const handleSubmit = async (e:SyntheticEvent) => {
    e.preventDefault();
    try {
      // make axios post request
      const response = await axios({
        method: "post",
        url:  "https://localhost:5001/api/Identifiers",
        data: formValue,
        headers: { "Authorization": `Bearer ${to}` },
      }).then(response => {
        console.warn(response)
        navigate("/Member/detail")
      });
    } catch(error) {
      if(error instanceof Error){
        console.log(error)
      }
    }
  }

  

  const handleChange = (event:any) => {
    console.log(formValue)
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }
  console.warn(formValue)
  return (
    <>
    
        
      <Container className='bg-yellow-100 mt-10 mb-20 pb-20 rounded-lg drop-shadow-lg'>
      <h1 className='pt-6 pl-16 text-xl font-bold'>Add Client Identifier</h1>
      <div className='p-12'>
        <form onSubmit={handleSubmit}>
        <div className='px-10 grid grid-cols-2 gap-2'>
          {/* left */}
          <div className='grid grid-cols-4 gap-2 mr-2'>
            <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Document Type:</span></label>
            
            <input name='DocumentType' type="text" value={formValue.DocumentType} onChange={handleChange}  className="mt-2 block w-full px-2 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 w-96
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
              col-start-2 col-end-6
            "/>
            <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Status :</span></label>
            
            <input name='Status' type="text" value={formValue.Status} onChange={handleChange}  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
              col-start-2 col-end-6
            "/>
            <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Description :</span></label>
            
            <input name='Description' type="text" value={formValue.Description} onChange={handleChange}  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
              col-start-2 col-end-6
            "/>
           
          
          
            
            
          <input type="submit" onClick={handleSubmit} className='float-right  my-5 bg-[#000] hover:bg-[#ffbb00] hover:text-black text-white font-bold py-2 px-4 border border-blue-700 rounded'   value="Create" /> 
          </div>

          {/* right */}
          <div className='grid grid-cols-4 gap-2 mr-2'>
            
          </div>
        </div>
        

        </form>
      </div>
    </Container>
    </>
  )
}

export default ClientIdentity