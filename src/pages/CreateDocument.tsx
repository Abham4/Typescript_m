import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { Container } from "react-bootstrap"
import {useNavigate } from "react-router-dom";
import tokenService from "../service/token.service";

const img = '/res/Logo.png'

const CreateDocument = ({client}:any) => {


  const navigate = useNavigate();
  const[formValue,setformValue]=useState({
    file: img,
    description: "",
    reference: Number(client),
    objectType:"1",
    documentType:""
  })

  const to = tokenService.getLocalAccessToken();
  const handleSubmit = async (e:SyntheticEvent) => {
    e.preventDefault();
    const dat = new FormData();
    dat.append('file', formValue.file)
    dat.append('description', formValue.description)
    dat.append('reference', formValue.reference.toString())
    dat.append('objectType', formValue.objectType)
    dat.append('documentType', formValue.documentType)
      await axios({
        method: 'post',
        url: "https://localhost:5001/api/Documents",
        data: dat,
        headers: { "Authorization": `Bearer ${to}` }
      }).then((res) => {
        navigate('/Member/detail/')
      }).catch((err) => {
        console.log("Doc Error"+err);
      })


      
  }

  

  const handleChange = (event:any) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
      
    });
  }

  const change = (e: any) => {
    if(e.target.files && e.target.files[0])
    {
      let file = e.target.files[0]
      setformValue({
        ...formValue,
        file
      })
    }
  }
  // console.warn(formValue)

  return (<>
   
        
    <Container className='bg-yellow-100 mt-10 mb-20 pb-20 rounded-lg drop-shadow-lg'>
    <h1 className='pt-6 pl-16 text-xl font-bold'>Add Document</h1>
    <div className='p-12'>
      <form onSubmit={handleSubmit}>
      <div className='px-10 grid grid-cols-2 gap-2'>
        {/* left */}
        <div className='grid grid-cols-4 gap-2 mr-2'>
          <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">File to upload</span></label>
          
          <input name='file' type="file" accept=".pdf, .doc, .docx, .png" onChange={change}  className="mt-2 block w-full px-2 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 w-96
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            col-start-2 col-end-6
          "/>
          <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Description :</span></label>
          
          <input name='description' type="text" value={formValue.description} onChange={handleChange}  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            col-start-2 col-end-6
          "/>
         <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Document Type :</span></label>

         <select name="documentType" value={formValue.documentType} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            col-start-2 col-end-6
          ">
              <option value="" disabled>choose...</option>                    
              <option value="Image">Image</option>                    
              <option value="Pdf">Pdf</option>
          </select>
        
          
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

export default CreateDocument