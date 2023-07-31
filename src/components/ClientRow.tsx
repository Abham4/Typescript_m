import { TableCell } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const ClientRow = ({client}:any) => {
  return (
    <>
        <TableCell className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm text-gray-900">
            {client.firstName+" "+client.middleName}
          </span>
        </TableCell>
        <TableCell className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            {client.passBookNumber}
          </div>
        </TableCell>
        <TableCell className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm text-gray-900">
            {client.phoneNumber}
          </span>
        </TableCell>
        <TableCell className="px-6 py-4 whitespace-nowrap">
        {client.status === "Active" ?
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{client.status}</span> :
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-yellow-600">{client.status}</span> }
        </TableCell>
        <TableCell className="px-6 py-4 whitespace-nowrap">
            {client.isStaff ?
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Yes</span> :
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-green-800">No</span> }
        </TableCell>
        <TableCell className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm text-gray-900">
            {client.branch.address}
          </span>
        </TableCell>       
    </>
  )
}

export default ClientRow