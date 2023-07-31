import React from 'react';
import axios from 'axios';
import {Container} from "@mui/material";
import {useState,useEffect} from 'react'
import {client,branch, account} from './types';
import { useNavigate } from 'react-router-dom';
import useStore from "../Store";
import tokenService from '../service/token.service';

const AllSavingReport =()=> {
  const [branchId,setBranchId] = useState<number>();
  const [clients,setClients] = useState<client>();
  const baseURL = "https://localhost:5001/api/Clients";
  var to = tokenService.getLocalAccessToken();
  useEffect(() => {
    const setClientData = async () => {
      const branch: any = localStorage.getItem("branchId") ;
      await axios
        .get(baseURL + "/", {
          headers: {
            Authorization: `Bearer ${to}`,
          },
        })
        .then((responce) => {
          setClients(responce.data);
        });

        setBranchId(parseInt(branch))
    };
    setClientData();
  }, []);

const navigateToAllSavingReport = (id:any)=>{
    localStorage.setItem("branch.id",id);
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
                  name
                  </th>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                  Account No
                  </th>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                  Total Saving
                  </th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clients instanceof Array?(
                  clients.map((cl:client)=>(
                   cl.account instanceof Array?(
                   cl.account.map((acc)=>(
                     <>
                     {
                       acc.accountType.toLowerCase()==="saving" && cl.branchId === branchId?
                            <tr >
                              
                                <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">
                            {cl.firstName+' '+cl.lastName}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">
                            {acc.accountNo}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">
                            {cl.branchId}
                            </span>
                          </td>
                              
                            </tr>
                          
                         
                       :<></>
                     }
                     
                     </>
                   
                   )
                   )
                   ):<></>
                  )
                  )
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

export default AllSavingReport;