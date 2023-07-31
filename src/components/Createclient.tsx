import { Breadcrumbs, Container, MenuItem, Select, Typography } from '@mui/material'
import axios from 'axios'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {client, token} from '../pages/types'
import jwtDecode from 'jwt-decode'
import tokenService from '../service/token.service'



const Createclient = () => {
  const[client,setClient]=useState<client>()  
  const navigate = useNavigate();
  const [ redirect, setRedirect ] = useState(false);
  const img = '/res/Logo.png'
  const at= tokenService.getLocalAccessToken();

  
  const date=new Date()
  date.setFullYear(date.getFullYear()-18)



  const [formValue, setformValue] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    activation_Date: "2022-02-18T06:14:39.346Z",
    activeSavings: 0,
    lastLoanAmount: 0,
    activeLoans: 0,
    phoneNumber: "",
    branchId: 0,
    address: "",
    dob: date.toISOString().substring(0, 16),
    gender: "Male",
    isStaff: true,
    noOfLoans: 0,
    status: "Active",
    passBookNumber: 0,
    img: img
  });
useEffect(() => {
  const token: token =
    at !== undefined ? jwtDecode(at) : { FirstName: "", LastName: "" };
  token.BranchId !== undefined
    ? setformValue({ ...formValue, branchId: parseInt(token.BranchId) })
    : setformValue({ ...formValue, branchId: 0 });
}, []);
  const to = localStorage.getItem("AccessToken");

  const handleSubmit = async (e: SyntheticEvent) => {
      e.preventDefault();
      const cdata = new FormData();
      cdata.append('firstName', formValue.firstName)
      cdata.append('middleName', formValue.middleName)
      cdata.append('lastName', formValue.lastName)
      cdata.append('activation_Date', formValue.activation_Date)
      cdata.append('activeSavings', formValue.activeSavings.toString())
      cdata.append('lastLoanAmount', formValue.lastLoanAmount.toString())
      cdata.append('activeLoans', formValue.activeLoans.toString())
      cdata.append('phoneNumber', formValue.phoneNumber)
      cdata.append('branchId', formValue.branchId.toString())
      cdata.append('address', formValue.address)
      cdata.append('dob', formValue.dob)
      cdata.append('gender', formValue.gender)
      cdata.append('isStaff', formValue.isStaff ? "true" : "false")
      cdata.append('noOfLoans', formValue.noOfLoans.toString())
      cdata.append('status', formValue.status)
      cdata.append('passBookNumber', formValue.passBookNumber.toString())
      cdata.append('img', formValue.img)
      
      // make axios post request
      await axios({
        method: "post",
        url: "https://localhost:5001/api/Clients",
        data: cdata,
        headers: { "Authorization": `Bearer ${at}` },
      }).then(() => {
        // console.warn(response)
        setRedirect(true);
      }).catch((x) => {
        console.log("Kai "+ x);
      });
  } 
 
  if(redirect)
  
    navigate("/Content")

  const handleChange = (event:any) => {
    console.log(formValue)
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }
  const change = (e: any) => {
    if(e.target.files && e.target.files[0])
    {
      let img = e.target.files[0]
      setformValue({
        ...formValue,
        img
      })
    }
  }
  return (
    <>
        <Container className='bg-yellow-100 mt-10 mb-20 pb-20 rounded-lg drop-shadow-lg'>
        <Breadcrumbs className='p-5' aria-label="breadcrumb">
          <Link color="inherit" to="/" className=' hover:underline'>
              Home
            </Link>
            <Link color="inherit" to="/Members" className=' hover:underline'>
              Members List
            </Link>
            <Typography className='text-black' >Create Member</Typography>
        </Breadcrumbs>
          <h1 className='pt-6 pl-16 text-xl font-bold'>Create New Member</h1>
          <div className='p-12'>
            <form onSubmit={handleSubmit}>
            <div className='px-10 grid grid-cols-2 gap-2'>
              {/* left */}
              <div className='grid grid-cols-4 gap-2 mr-2'>
                <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">First Name :</span></label>
                
                <input name='firstName' type="text" value={formValue.firstName} onChange={handleChange} placeholder='First Name' className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  col-start-2 col-end-5
                "/>
                
                <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Middle Name :</span></label>
                
                <input name='middleName' type="text" value={formValue.middleName} onChange={handleChange} placeholder='Middle Name' className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  col-start-2 col-end-5
                "/>
                <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Last Name :</span></label>
                
                <input name='lastName' type="text" value={formValue.lastName} onChange={handleChange} placeholder='Last Name' className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  col-start-2 col-end-5
                "/>
                <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Profile Pic</span></label>
                
                <input name='img' type="file" onChange={change} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  col-start-2 col-end-5
                "/>
                <label className="block"><span  className="font-serif block text-sm text-lg text-slate-700 ">Gender :</span></label>
                  <select name="gender" value={formValue.gender} onChange={handleChange} className="mt-1 block1 w-1/2 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  col-start-2 col-end-5
                  ">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Birth date :</span></label>
                
                <input name="dob" type="datetime-local" max={date.toISOString().substring(0,16)}  value={formValue.dob} onChange={handleChange} className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  col-start-2 col-end-5
                "/>
              </div>

              {/* right */}
              <div className='grid grid-cols-4 gap-2 mr-2'>
                <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">P.Number :</span></label>
                <input type="text" name='phoneNumber' value={formValue.phoneNumber} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  col-start-2 col-end-5

                "/> 
                <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Address :</span></label>
                <input type="text" name="address" value={formValue.address} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  col-start-2 col-end-5

                "/>
                <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Passbook No :</span></label>
                <input type="number" name="passBookNumber" value={formValue.passBookNumber} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  col-start-2 col-end-5

                "/>
                <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Is Staff :</span></label>
                <select name="isStaff" onChange={handleChange} className="mt-1 block1 w-1/2 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  col-start-2 col-end-5

                ">
                  <option value="true" >Yes</option>
                  <option value="false" >No</option>
                </select>
               
                <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Status :</span></label>
                <select value={formValue.status} name='status' onChange={handleChange}className="mt-1 block1 w-1/2 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  col-start-2 col-end-5

                ">
                  <option value="Active">Active</option>
                  <option value="Not Active">Not-Active</option>
                </select>

              </div>
            </div>
            <input type="submit" className='float-right  my-5 bg-[#000] hover:bg-[#ffbb00] hover:text-black text-white font-bold py-2 px-4 border border-yellow-400 rounded'   value="Create" />

            </form>
          </div>
        </Container>
    </>
  )
}

export default Createclient