import React from 'react'
import { Link } from 'react-router-dom';

const AccountsRow = ({account}:any) => {
  return (
        <>
            <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-900">
                {account.accountName}
            </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-900">
                {account.glCode}
            </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-900">
                {account.accountType}
            </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">
            <span className="text-sm text-gray-900">
                to be done
            </span>
            </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                
                {account.manualEntriesAllowed ?
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Yes</span> :
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-green-800">No</span> }
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-900">
                {account.accountUsage}
            </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
            <Link to="#" className="text-indigo-600 hover:text-indigo-900">
                <button onClick={()=>{localStorage.setItem('account',account.id);}}>
                View
                </button> 
            </Link>
            </td>         
        </>
  )
}

export default AccountsRow