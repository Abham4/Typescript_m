import React from 'react'
import { Voucher } from '../pages/types'

const ViewVoucher = (props:{voucher:Voucher}) => {

  const roundoff = (num:number ) =>{
    const value=Math.round((num+Number.EPSILON)*100)/100
    return value
}
  return (
    <>
        <td className="px-6 bg-gray-50">
          {props.voucher.timeStamp.toString().substr(0,10)}
        </td>
        <td className="px-6 bg-gray-50">
          {props.voucher.voucherType}
        </td>
        <td className="px-6 bg-gray-50">
          {roundoff(props.voucher.amount).toLocaleString(undefined, {maximumFractionDigits:2})}
        </td>
    </>
  )
}

export default ViewVoucher