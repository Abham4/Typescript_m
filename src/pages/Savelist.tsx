import React from 'react'
import { Link } from 'react-router-dom';

const Savelist = ({save}:any) => {
  return (
        <>
           <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-900">
                {save.name}
            </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-900">
                {save.shortName}
            </span>
            </td>
           
            <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-900">
                {save.productType} 
            </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-900">
                {save.originalLoan.toLocaleString(undefined, {maximumFractionDigits:2})} 
            </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-900">
                {save.loanBalance} 
            </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-900">
                {save.amountPaid} 
            </span>
            </td>
             
        </>
  )
}

export default Savelist