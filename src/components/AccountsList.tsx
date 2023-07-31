// import { IconButton } from '@mui/material';
// import React from 'react'
// import { account, client } from '../pages/types';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Tooltip } from '@mui/material';
import { green, red, yellow } from '@mui/material/colors';

const AccountsList = ({account}:any) => {

    const accountType = (check:string) =>{
        if(check==="active"){
            return <Tooltip title="Active" placement="top-start"><CheckIcon sx={{color: green[500],fontSize: 30}} fontSize="inherit" /></Tooltip>
        }else if(check==="pending"){
            return <Tooltip title="Pending" placement="top-start"><MoreHorizIcon sx={{color: yellow[800],fontSize: 30}} fontSize="inherit" /></Tooltip>
        }
        else{
            return <Tooltip title="Not Active" placement="top-start"><ClearIcon sx={{color: red[500],fontSize: 30}} fontSize="inherit" /></Tooltip> 
        }
    }
  return (
    <>
        <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-900">
            {account?.accountNo}
        </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-900">
            {account?.passBookNumber}
        </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            {account?.originalLoan}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            {account?.loanBalance}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            {account?.amountPaid}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            {
                accountType(account?.status)
            }
        </td>
    </>
  )
}

export default AccountsList