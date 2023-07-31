import Container from '@mui/material/Container'
import { TreeItem ,TreeView} from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { accounts } from './types';

const AccountingTree = () => {
    const baseURL = "https://localhost:5001/api/Accounts";
    var to = localStorage.getItem('AccessToken')
    const [accounts,setAccounts] = useState([]);
    const [rows, setRows] = useState<accounts[]>(accounts);
    const [temp, setTemp] = useState<accounts>();


    useEffect(()=>{
        const getData = async () => {
          await axios.get(baseURL, {
            headers: {
              'Authorization': `Bearer ${to}`
            }
          }).then((response)=>{
            setAccounts(response.data);
            if(rows.length===0){
                setRows(response.data)
              }
          });
        }
        getData().catch(console.error)
        
      },[])
      
      const handleChange = (value:any) =>{
        setTemp(value)
      }

      function filteringParent(value:accounts,compareWith:String,parent:String){
          if(value.accountType.toLocaleLowerCase()===compareWith && value.parent.toLocaleLowerCase()==="bank"){
            
          }
      }

      function filtering(value:any,compareWith:String):any{
        if(value.accountType.toLocaleLowerCase()===compareWith){
            return <TreeItem onClick={()=>handleChange(value)} key={value.id} nodeId={value.id.toString()} label={value.accountName}/>
          }
        }
        

  return (
    <>
        <Container className='bg-gray-100 mt-10 pb-20 rounded-lg drop-shadow-lg flex flex-row'>
        <h1 className='text-4xl font-bold pt-5 text-gray-400'>Accounts Tree</h1>
            <div className="flex flex-row m-8">
              <div className='basis-1/2'>

                 <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{  flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
              >
                    <TreeItem nodeId="9876543" label="Accounting">
                        <TreeItem nodeId="Asset" label="ASSETS">
                        <TreeItem nodeId="assetBank" label="bank">
                            {
                              rows.filter(row=>{return row.parent.toLocaleLowerCase().includes("bank")}).map((account:any)=>(
                                filtering(account,"asset")
                              ))
                            }
                          </TreeItem>
                          {
                              rows.filter(row=>{return row.parent.toLocaleLowerCase().includes("cash")}).map((account:any)=>(
                                filtering(account,"asset")
                              ))
                            }
                        </TreeItem>
                        <TreeItem nodeId="Liablity" label="LIABLITY">
                        <TreeItem nodeId="liablityBank" label="bank">
                            {
                              rows.filter(row=>{return row.parent.toLocaleLowerCase().includes("bank")}).map((account:any)=>(
                                filtering(account,"liablity")
                              ))
                            }
                          </TreeItem>
                        {rows.map((account:any)=>
                            (
                              filtering(account,"liablity") 
                            )
                        )}
                        </TreeItem>
                        <TreeItem nodeId="Equity" label="EQUITY">
                        <TreeItem nodeId="equityBank" label="bank">
                            {
                              rows.filter(row=>{return row.parent.toLocaleLowerCase().includes("bank")}).map((account:any)=>(
                                filtering(account,"equity")
                              ))
                            }
                          </TreeItem>
                        {rows.map((account:any)=>
                            (
                              filtering(account,"equity") 
                            )
                        )}
                        </TreeItem>
                        <TreeItem nodeId="Income" label="INCOME">
                        <TreeItem nodeId="incomeBank" label="bank">
                            {
                              rows.filter(row=>{return row.parent.toLocaleLowerCase().includes("bank")}).map((account:any)=>(
                                filtering(account,"income")
                              ))
                            }
                          </TreeItem>
                        {rows.map((account:any)=>
                            (
                              filtering(account,"income") 
                            )
                        )}
                        </TreeItem>
                        <TreeItem nodeId="Expence" label="EXPENCE">
                        <TreeItem nodeId="expenceBank" label="bank">
                            {
                              rows.filter(row=>{return row.parent.toLocaleLowerCase().includes("bank")}).map((account:any)=>(
                                filtering(account,"expence")
                              ))
                            }
                          </TreeItem>
                        {rows.map((account:any)=>
                            (
                              filtering(account,"expence") 
                            )
                        )}
                        </TreeItem>
                    </TreeItem>
                </TreeView>
                </div>
            <div className='basis-1/2'>
                <div className="flex flex-col mr-5">
                   <div className="basis-1/2">
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
                                        Account Type
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                        GL Code
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                        Account Usage
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                        Description
                                      </th>
                                      </tr>

                                      <tr>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">
                                            {temp?.accountType}
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">
                                            {temp?.glCode}
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">
                                            {temp?.accountUsage}
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">
                                            {temp?.description}
                                        </span>
                                      </td>
                                      </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200">
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        </div>
                  </div>
                </div>
            </div>
          </Container>
        
  </>
  )
}

export default AccountingTree