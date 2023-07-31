import React from 'react';
import axios from 'axios';
import {Container} from "@mui/material";
import {useState,useEffect} from 'react'
import {branch} from './types';
import { useNavigate } from 'react-router-dom';
import AllSavingReport from './AllSavingReport';
import tokenService from '../service/token.service';

const LoanReports =()=> {
  const [branchs,setBranchs] = useState<branch>();
  const baseURL = "https://localhost:5001/api/Branch";
  var to = tokenService.getLocalAccessToken();
  const navigate=useNavigate()
useEffect(()=>{
  const branch:any=localStorage.getItem('branch')
  setBranchs(branch);
  axios.get(baseURL, {
    headers: {
      'Authorization': `Bearer ${to}`
    }
  }).then((response)=>{
    setBranchs(response.data);
   
  });

},[])

const navigateToAllSavingReport = (id:any)=>{
    localStorage.setItem("branchId",id);
    localStorage.setItem("client",id);
    navigate('/AllSavingReport')
}


  return (
    <div className="flex flex-col">
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
                
                <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                >
                Address
                </th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
           {
               branchs instanceof Array?(
                   branchs.map((branch:branch)=>(
                       <tr 
                       className="hover:bg-[#ffab00]/50"
                       key={branch.id}
                       onClick={()=>navigateToAllSavingReport(branch.id)}
                       >
                           {branch.address}
                         
                       </tr>
                   ))
               ):<></>
           }
            </tbody>
        </table>
        </div>
    </div>
    </div>
</div>
  )
   
 
    
}

export default LoanReports;