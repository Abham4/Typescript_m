import axios from 'axios'
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'
import tokenService from '../service/token.service'

const CreateFamily = () => {
  
  
    let client=localStorage.getItem('client')

    const[cb,setCb]=useState(false)
    const[formValue,setformValue]=useState({
        firstName: "",   
        middleName: "",    
        lastName: "",  
        qualification: "", 
        phoneNumber: "",   
        age: 0,   
        isDepandant: true,  
        relationShip: "",  
        gender: "",    
        profession: "",    
        maritalStatus: "" ,
        dateOfBirth: "2022-02-18T06:14:39.346Z",  
        clientId: Number(client)
    })
    let navigate=useNavigate()
  
    const to = tokenService.getLocalAccessToken();

    const handleSubmit = async () => {
      try {
        // make axios post request
        const response = await axios({
          method: "post",
          url: "https://localhost:5001/api/FamilyMembers",
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

    const handleCheckbox=(cb:boolean)=>{
        setCb(!cb)
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
              <h1 className='text-4xl font-bold pt-5 text-gray-400'>Add New Family Member</h1>
              <div className='p-12'>
                <div className='px-20' onSubmit={handleSubmit}>
                    <label className="block"><span  className="font-serif block text-sm text-lg text-slate-700 ">First Name :</span></label>
                    <input name="firstName" type="text"  value={formValue.firstName} onChange={handleChange} className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "
                  />
                  <label className="block">
                    <span className="font-serif block text-sm text-lg text-slate-700 ">
                      Middle Name :
                    </span>
                  </label>

                  <input
                    name="middleName"
                    type="text"
                    value={formValue.middleName}
                    onChange={handleChange}
                    className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "
                  />
                  <label className="block">
                    <span className="font-serif block text-sm text-lg text-slate-700 ">
                      Last Name :
                    </span>
                  </label>

                  <input
                    name="lastName"
                    type="text"
                    value={formValue.lastName}
                    onChange={handleChange}
                    className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "
                  />
                  <label className="block">
                    <span className="font-serif block text-sm text-lg text-slate-700 ">
                      Qualification :
                    </span>
                  </label>

                  <input
                    name="qualification"
                    type="text"
                    value={formValue.qualification}
                    onChange={handleChange}
                    className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "
                  />
                  <label className="block">
                    <span className="font-serif block text-sm text-lg text-slate-700 ">
                      Phone Number :
                    </span>
                  </label>

                  <input
                    name="phoneNumber"
                    type="text"
                    value={formValue.phoneNumber}
                    onChange={handleChange}
                    className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "
                  />

                  <label className="block">
                    <span className="font-serif block text-sm text-lg text-slate-700 ">
                      Age :
                    </span>
                  </label>

                  <input
                    name="age"
                    type="text"
                    value={formValue.age}
                    onChange={handleChange}
                    className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "
                  />
                  <label className="block">
                    <span className="font-serif block text-sm text-lg text-slate-700 ">
                      IsDependent :
                    </span>
                  </label>

                  <input
                    name="isDepandant"
                    type="checkbox"
                    value={formValue.isDepandant.toString()}
                    onChange={handleChange}
                    className="mt-1 block1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "
                  />

              <label className="block">
                <span className="font-serif block text-sm text-lg text-slate-700 ">
                  Relationship :
                </span>
              </label>
              <select
                name="relationShip"
                value={formValue.relationShip}
                onChange={handleChange}
                className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "
              >
                <option value="wife">wife</option>
                <option value="daughter">Daughter</option>
                <option value="son">Son</option>
              </select>
              <label className="block">
                <span className="font-serif block text-sm text-lg text-slate-700 ">
                  Gender :
                </span>
              </label>
              <select
                name="gender"
                value={formValue.gender}
                onChange={handleChange}
                className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <label className="block">
                <span className="font-serif block text-sm text-lg text-slate-700 ">
                  Profession :
                </span>
              </label>
              <select
                name="profession"
                value={formValue.profession}
                onChange={handleChange}
                className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "
              >
                <option value="student">Student</option>
                <option value="manager">Manager</option>
              </select>
              <label className="block">
                <span className="font-serif block text-sm text-lg text-slate-700 ">
                  Marital Status :
                </span>
              </label>
              <select
                name="maritalStatus"
                value={formValue.maritalStatus}
                onChange={handleChange}
                className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "
              >
                <option value="Married">Married</option>
                <option value="single">Single</option>
              </select>
              <label className="block">
                <span className="font-serif block text-sm text-lg text-slate-700 ">
                  Date of Birth :
                </span>
              </label>
              <input
                name="dateOfBirth"
                type="date"
                value={formValue.dateOfBirth}
                onChange={handleChange}
                className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "
              />
              {/* <select name="dateOfBirth" value={formValue.dateOfBirth} onChange={handleChange} className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
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
                    </select>                     */}
              <input
                type="button"
                onClick={handleSubmit}
                className="float-right  my-5 bg-[#000] hover:bg-[#ffbb00] hover:text-black text-white font-bold py-2 px-4 border border-blue-700 rounded"
                value="Create"
              />
            </div>
          </div>
        </Container>
      </>
    );
}

export default CreateFamily