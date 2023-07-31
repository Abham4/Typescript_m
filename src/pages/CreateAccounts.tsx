import { Route } from '@mui/icons-material'
import { Container } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { accounts } from './types'

const CreateAccounts = () => {
  const[client,setClient]=useState<accounts>()

  const[isStaff,setIsStaff]=useState()
  const[formValue,setformValue]=useState({
    accountType: "ASSET",
    glCode: 0,
    accountUsage: "Usage 1",
    parent: "BANK",
    accountName: "",
    tag: "Tag A",
    manualEntriesAllowed: true,
    description: ""

  })
  let navigate=useNavigate()
  const handleSubmit = async () => {
    try {
      // make axios post request
      const response = await axios({
        method: "post",
        url: "https://localhost:5001/api/Accounts",
        data: formValue,
        headers: { "Content-Type": "application/json" },
      }).then(response => {
        console.warn(response)
        navigate("/Accounting")
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
            <Container className='bg-gray-100 mt-10 mb-20 pb-20 rounded-lg drop-shadow-lg'>
            <h1 className='text-4xl font-bold pt-5 text-gray-400'>Create GL Accounts</h1>
            <div className='p-12'>
              <div className='px-20' onSubmit={handleSubmit}>
                <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">glCode :</span></label>
                  
                  <input name="glCode" type="number"  value={formValue.glCode} onChange={handleChange} className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  "/>
                <label className="block"><span  className="font-serif block text-sm text-lg text-slate-700 ">accountType :</span></label>
                  <select name="accountType" value={formValue.accountType} onChange={handleChange} className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  ">
                    <option value="ASSET" >ASSET</option>
                    <option value="LIABLITY">LIABLITY</option>
                    <option value="EQUITY">EQUITY</option>
                    <option value="INCOME" >INCOME</option>
                    <option value="EXPENCE">EXPENCE</option>
                  </select>
                  <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">accountUsage :</span></label>
                  <select name="accountUsage" onChange={handleChange} placeholder="usage" className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  ">
                    <option value="Usage 1" >Usage 1</option>
                    <option value="Usage 2" >Usage 2</option>
                  </select>
                  <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">parent :</span></label>
                  <select name="parent" onChange={handleChange} className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  ">
                    <option value="BANK" >BANK</option>
                    <option value="CASH" >CASH</option>
                  </select>
                  <label className="number"><span className="font-serif block text-sm text-lg text-slate-700 ">accountName :</span></label>
                  <input type="text" name='accountName' value={formValue.accountName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  "/>
                  <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">tag :</span></label>
                  <select value={formValue.tag} name='tag' onChange={handleChange}className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  ">
                    <option value="Tag A">Tag A</option>
                    <option value="Tag B">Tag B</option>
                  </select>
                  <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">manualEntriesAllowed :</span></label>
                  <select value={formValue.manualEntriesAllowed.toString()} name='manualEntriesAllowed' onChange={handleChange}className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  ">
                    <option value="Yes" >Yes</option>
                    <option value="No">No</option>
                  </select>
                  <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">description :</span></label>
                  <input type="text" name='description' value={formValue.description} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  "/>
                  <input type="button" onClick={handleSubmit} className='float-right  my-5 bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 border border-blue-700 rounded'   value="Create" />
              </div>
            </div>
            </Container>
        </>
  )
}

export default CreateAccounts