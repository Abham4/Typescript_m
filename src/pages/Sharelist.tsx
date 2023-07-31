import React from 'react'
import { Link } from 'react-router-dom';

const Sharelist = ({share}:any) => {
  return (
        <>
            <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-900">
                {share.name}
            </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-900">
                {share.shortName}
            </span>
            </td>
           
            <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-900">
                {share.productType} 
            </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-900">
                {share.originalLoan.toLocaleString(undefined, {maximumFractionDigits:2})} 
            </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-900">
                {share.loanBalance} 
            </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-900">
                {share.amountPaid} 
            </span>
            </td>
        </>
  )
}

export default Sharelist