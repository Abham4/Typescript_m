import { Card, CardActionArea, CardContent, CardMedia, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountsRow from '../components/AccountsRow';
import ClientRow from '../components/ClientRow';
import {accounts, client} from './types'

export default function Accounting(
  props: {name: string, setName: (name: string) => void}
  ) {
  const baseURL = "https://localhost:5001/api/Accounts";

  const [clients,setClients] = useState([]);
  const [client,setClient] = useState([]);
  var to = localStorage.getItem('AccessToken')

  const [rows, setRows] = useState<accounts[]>(clients);
  const [searched, setSearched] = useState<string>("");
  const navigate = useNavigate();

  const requestSearch = (searchedVal: string) => {
    const filteredRows = clients?.filter((row:accounts) => {
        return row.accountName.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };


  useEffect(()=>{

    if(props.name === '')
      navigate('/Login')
    else{
    const cli:any=localStorage.getItem('client')
    setClient(cli);
    axios.get(baseURL, {
      headers: {
        'Authorization': `Bearer ${to}`
      }
    }).then((response)=>{
      setClients(response.data);
      setRows(response.data);
    });
  }
  },[])

  const handleOnChange = (e:any) => {
    requestSearch(e.target.value);
    setSearched(e.target.value);
  }


    return (
      <>
        <Container className='bg-gray-100 mt-10 mb-20 pb-20 rounded-lg drop-shadow-lg'>
          <h1 className='text-4xl font-bold pt-5 text-gray-400'>Accounts</h1>

          <div className="flex flex-row ">
                <input value={searched} onChange={e => handleOnChange(e)} className="flex flex-col my-5 placeholder:italic placeholder:text-slate-400 bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-3/5" placeholder="Search for Username..." type="text" name="search"/>
                <div className="float-right">
                <Link to="/Accounts/Create"><button  className='mx-5 my-5 bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>New Accounts </button>
                </Link>
                <Link to="/Accounting/tree"><button  className=' mx-10 my-5 bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>Tree view</button>
                </Link> 
              </div> 
          </div>
        
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
                        Account
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
                        Account Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Disabled
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Are Manual Entries Allowed?
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Used As
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rows.map((account:any) => (
                      <tr key={account.id}>
                        <AccountsRow account={account} />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        </Container>
  
  </>
  )
  }
