import { Container, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import tokenService from '../service/token.service';



const CreateAddress = () => {
  
  let client=localStorage.getItem('client')

  const[formValue,setformValue]=useState({
    addressType: "Resedencial",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    phoneNumber: "",
    city: "",
    stateProvince: "addisAbaba",
    country: "ethiopia",
    clientId: Number(client)
  })
  let navigate=useNavigate()

  const to = tokenService.getLocalAccessToken();

  const handleSubmit = async () => {
    try {
      // make axios post request
      const response = await axios({
        method: "post",
        url: "https://localhost:5001/api/Addresses",
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
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

  return (
      <>
     
         <Container className='bg-yellow-100 mt-10 mb-20 pb-20 rounded-lg drop-shadow-lg'>
            <h1 className='text-4xl font-bold pt-5 text-gray-400'>Add New Adress</h1>
            <div className='p-12'>
              <div className='px-20' onSubmit={handleSubmit}>
                  <label className="block"><span  className="font-serif block text-sm text-lg text-slate-700 ">Address Type :</span></label>
                  <select name="addressType" value={formValue.addressType} onChange={handleChange} className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  ">
                    <option value="resedencial" >Resedencial</option>
                    <option value="citizen">Citizen</option>
                  </select>
                  <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Address Line 1 :</span></label>

                  <input name="addressLine1" type="text"  value={formValue.addressLine1} onChange={handleChange} className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  "/>
                  <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Address Line 2 :</span></label>

                  <input name="addressLine2" type="text"  value={formValue.addressLine2} onChange={handleChange} className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  "/>
                  <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Address Line 3 :</span></label>

                  <input name="addressLine3" type="text"  value={formValue.addressLine3} onChange={handleChange} className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  "/>
                  <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Phone Number :</span></label>

                  <input name="phoneNumber" type="text"  value={formValue.phoneNumber} onChange={handleChange} className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  "/>
                  
                  <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">City :</span></label>

                  <input name="city" type="text"  value={formValue.city} onChange={handleChange} className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  "/>
                  <label className="block"><span  className="font-serif block text-sm text-lg text-slate-700 ">State :</span></label>
                  <select name="stateProvince" value={formValue.stateProvince} onChange={handleChange} className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  ">
                    <option value="addisAbaba" >Addis Ababa</option>                    
                    <option value="afar">Afar</option>
                    <option value="amhara">Amhara</option>
                    <option value="oromiya">Oromiya</option>
                    <option value="snnp">SNNP</option>
                  </select>
                  <label className="block"><span  className="font-serif block text-sm text-lg text-slate-700 ">Country :</span></label>
                  <select name="country" value={formValue.country} onChange={handleChange} className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  ">
                    <option value="ethiopia" >Ethiopia</option>
                  </select>
                  
                  
                  <input type="button" onClick={handleSubmit} className='float-right  my-5 bg-[#000] hover:bg-[#ffbb00] hover:text-black text-white font-bold py-2 px-4 border border-blue-700 rounded'   value="Create" />
              </div>
            </div>
        </Container>
      </>
    )
}

export default CreateAddress