import React from 'react';
import axios from 'axios';
import {Container} from "@mui/material";
import {useState,useEffect} from 'react'
import {client,branch,account,purchasedproduct} from './types';
import { useNavigate } from 'react-router-dom';
import { totalmem } from 'os';
import { ppid } from 'process';
import tokenService from "../service/token.service";


const MemberDetail =()=> {
  const [branch,setBranch] = useState<branch>();
  const [clients,setClients] = useState<client>();
  const [account,setAccount] = useState<account>();
  const baseURL = "https://localhost:5001/api/Clients";
  const to = tokenService.getLocalAccessToken();
  const navigate=useNavigate()
useEffect(()=>{
  const branch:any=localStorage.getItem('client')
  setClients(branch);
  axios.get(baseURL, {
    headers: {
      'Authorization': `Bearer ${to}`
    }
  }).then((response)=>{
    setClients(response.data);
  });

},[])

const getallshare=()=>{
    let total=0;
    clients instanceof Array?(
        clients.map((cl:client)=>(
         cl.account instanceof Array?(
          cl.account.map((acc)=>(
              <>
              {
                  acc.accountType.toLowerCase()==="sharing"?(
                      acc.purchasedProducts instanceof Array?(
                       acc.purchasedProducts.map((pp:purchasedproduct)=>
                        {
                            total=total+pp.originalLoan
                        }
                       )
                      ):<></>
                  ):<></>
              }
              </>
          ))
         ):<></>
        ))
    ):<></>
    return total;  
}

const getallsharebyid=(pp:purchasedproduct[])=>{
  console.log(pp)
    let total=0;
    pp.forEach(product => {
       total += product.originalLoan
    });
    return total;  
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
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                  Branch
                  </th>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                 Full Name
                  </th>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                  Share Amount
                  </th>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                  Date
                  </th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                { 
                    clients instanceof Array?(
                    clients.map((cl:client)=>(
                        cl.account instanceof Array?(
                         cl.account.map((acc)=>(
                             
                             <tr key={acc.id}>
                                 {
                                     acc.accountType.toLowerCase()==="sharing"?
                              <>
                             <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                        {cl.branch.name}
                            
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                        {cl.firstName+' '+cl.lastName}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                        {getallsharebyid(acc.purchasedProducts)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                          {cl.createdDate.toString().substring(0,10)}
                      </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                          {}
                      </span>
                      </td>
                      </>:<></>
                       }
                             </tr>
                         ))
                        ):<></>
                    ))
                    ):<></>
                } 
              </tbody>
              <tfoot>
                  <tr>
                      <td >total</td>
                      <td>{getallshare()}</td>
                  </tr>
              </tfoot>
          </table>
        </div>
    </div>
    </div>
</div>
  )
   
 
    
}

export default MemberDetail;