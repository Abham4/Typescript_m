import { Breadcrumbs, Container, Typography } from '@mui/material'
import axios from 'axios'
import { SyntheticEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import tokenService from '../service/token.service'

const CreateBranch = () => {

    const navigate = useNavigate();

    const[formValue, setformValue] = useState({
        name: "",
        address: ""
    })

    const to = tokenService.getLocalAccessToken();

    const handleSubmit = async (e:SyntheticEvent) => {
        e.preventDefault();
        // make axios post request
        await axios({
          method: "post",
          url:  "https://localhost:5001/api/Branch",
          data: formValue,
          headers: { "Authorization": `Bearer ${to}` },
        }).then(response => {
          // console.warn(response)
          navigate("/Branch")
        }).catch((err) => {
          console.log(err);
        })
    }

    const handleChange = (event:any) => {
        setformValue({
          ...formValue,
          [event.target.name]: event.target.value
        });
    }

    return (
        <Container className='bg-yellow-100 mt-10 mb-20 pb-20 rounded-lg drop-shadow-lg'>
            <Breadcrumbs className='p-5' aria-label="breadcrumb">
                <Link color="inherit" to="/" className=' hover:underline'>
                    Home
                </Link>
                <Link color="inherit" to="/Branch" className=' hover:underline'>
                    Branches
                </Link>
                <Typography className='text-black' >Create Branch</Typography>
            </Breadcrumbs>
            <h1 className='pt-6 pl-16 text-xl font-bold'>Create Branch</h1>
            <div className='p-12'>
                <form onSubmit={handleSubmit}>
                <div className='px-10 grid grid-cols-2 gap-2'>
                {/* left */}
                <div className='grid grid-cols-4 gap-2 mr-2'>
                    <label className="block"><span className="font-serif block text-sm text-lg color: rgb(0 0 0) ">Branch Name </span></label>
                    
                    <input name='name' type="text" value={formValue.name} onChange={handleChange}  className="mt-2 block w-full px-2 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 w-96
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    col-start-2 col-end-6
                    "/>
                    <label className="block"><span className="font-serif block text-sm text-lg color: rgb(0 0 0) ">Branch Address</span></label>
                    
                    <input name='address' type="text" value={formValue.address} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    col-start-2 col-end-6
                    "/>
                    <input type="submit" onClick={handleSubmit}className='float-right  my-5 bg-[#000] hover:bg-[#ffbb00] hover:text-black text-white font-bold py-2 px-4 border border-blue-700 rounded'   value="Create" /> 
                </div>
        
                {/* right */}
                <div className='grid grid-cols-4 gap-2 mr-2'>
                    
                </div>
                </div>
                
        
                </form>
            </div>
        </Container>
    )
}

export default CreateBranch