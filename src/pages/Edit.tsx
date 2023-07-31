import React from 'react'
import  './but.css';
import { Container, MenuItem, Select } from '@mui/material'

const Edit = () => {
    
  return (
    <>
   
    <Container className='bg-gray-100 mt-10 mb-20 pb-20 rounded-lg drop-shadow-lg'>
    <h1 className='pt-6 pl-16 text-xl font-bold'>Edit Client</h1>
      <div className='p-12'>
        <div className='px-20' >
          <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Name :</span></label>
            
            <input name='name' type="text"   placeholder='Client Name' className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            "/>
          <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Age :</span></label>
            
            <input name="age" type="number"    className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            "/>
          <label className="block"><span  className="font-serif block text-sm text-lg text-slate-700 ">Gender :</span></label>
            <select name="gender"  className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            ">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Address :</span></label>
            <input type="text" name="address"  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            "/>
            <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Activation Date :</span></label>
            <input type="date" name='createdDate'    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            "/>
            <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Is Staff :</span></label>
            <select name="isStaff"  className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            ">
              <option value="true" >Yes</option>
              <option value="false" >No</option>
            </select>
            <label className="number"><span className="font-serif block text-sm text-lg text-slate-700 ">NoOfLoans :</span></label>
            <input type="text" name='noOfLoans'   className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            "/>
            <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Active Savings :</span></label>
            <input type="number" name='activeSavings'   className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            "/>
            <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Status :</span></label>
            <select  name='status' className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            ">
              <option value="Active">Active</option>
              <option value="Not Active">Not-Active</option>
            </select>
            <input type="button"  className='float-right  my-5 bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 border border-blue-700 rounded'   value="Edit" />
        </div>
      </div>
    </Container>
</>
  
  )
}

export default Edit