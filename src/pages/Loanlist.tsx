import React from 'react'
import { Link } from 'react-router-dom';

const Loanlist = ({loan}:any) => {
  return (
        <>
            <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-900">
                {loan.name}
            </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-900">
                {loan.shortName}
            </span>
            
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-900">
                {loan.productType} 
            </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-900">
                {loan.originalLoan.toLocaleString(undefined, {maximumFractionDigits:2})} 
            </span>
            </td>
           
          
            <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-900">
                {loan.loanBalance} 
            </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-900">
                {loan.amountPaid} 
            </span>
            </td>
           
             
        </>
  )
}

export default Loanlist