import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Tooltip } from "@mui/material";
import { green, red, yellow } from "@mui/material/colors";
import { purchasedproduct, Schedule, Voucher } from "../pages/types";
import axios from "axios";
import tokenService from "../service/token.service";

const PurchasedProductsList = (props: { pp: any }) => {
  const [loading, setLoading] = useState(true);
  const [voucher, setVouture] = useState<Voucher[]>();
  const baseURL2 =
    "https://localhost:5001/api/Vouchers/GetVouchersListByClient/";
  var to = tokenService.getLocalAccessToken();

  const roundoff = (num: number) => {
    const value = Math.round((num + Number.EPSILON) * 100) / 100;
    return value;
  };
  useEffect(() => {
    const getVouture = async () => {
      const cli: any = localStorage.getItem("client");
      await axios
        .get(baseURL2 + cli, {
          headers: {
            Authorization: `Bearer ${to}`,
          },
        })
        .then((responce) => {
          setVouture(responce.data);
        });
      setLoading(false);
    };
    getVouture();
  }, []);

  // const calculateInterestVoucher = () => {
  //   let value = 0;
  //     voucher instanceof Array ? (
  //       <>
  //         {" "}
  //         {voucher.map((v) => {
  //           if (
  //             v.purchasedProductId === props.pp?.id &&
  //             v.voucherType.toLocaleLowerCase() === "interest"
  //           )
  //             value += v.amount;
  //         })}
  //       </>
  //     ) : (
  //       <></>
  //     )
  //   return value;
  // };

  const calculatePaidVoucher = () => {
    let value = 0;
    voucher instanceof Array ? (
      <>
        {" "}
        {voucher.map((v) => {
          if (
            v.purchasedProductId === props.pp?.id &&
            v.voucherType.toLocaleLowerCase() === "principal"
          )
            value += v.amount;
        })}
      </>
    ) : (
      <></>
    );
    // voucher instanceof Array ? (
    //   <>
    //     {" "}
    //     {voucher.map((v) => {
    //       if (
    //         v.purchasedProductId === props.pp?.id &&
    //         v.voucherType.toLocaleLowerCase() === "deposit"
    //       )
    //         value -= v.amount;
    //     })}
    //   </>
    // ) : (
    //   <></>
    // )
    return value;
  };

  // const calculateTotalInterest = () => {
  //   let totalInterest = 0;
  //   props.pp?.paymentSchedules instanceof Array ? (
  //     props.pp.paymentSchedules.map(
  //       (schedule: Schedule) =>
  //         (totalInterest = totalInterest + schedule.interest)
  //     )
  //   ) : (
  //     <></>
  //   );

  //   return totalInterest;
  // };

  const accountType = (check: string) => {
    if (check === "active") {
      return (
        <Tooltip title="Active" placement="top-start">
          <CheckIcon
            sx={{ color: green[500], fontSize: 30 }}
            fontSize="inherit"
          />
        </Tooltip>
      );
    } else if (check === "pending") {
      return (
        <Tooltip title="Pending" placement="top-start">
          <MoreHorizIcon
            sx={{ color: yellow[800], fontSize: 30 }}
            fontSize="inherit"
          />
        </Tooltip>
      );
    } else {
      return (
        <Tooltip title="Due data passed" placement="top-start">
          <PriorityHighIcon
            sx={{ color: red[500], fontSize: 30 }}
            fontSize="inherit"
          />
        </Tooltip>
      );
    }
  };
  return (
    <>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-900">
          {props.pp.products[0].product.name}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-900">
          {props.pp.products[0].product.shortName}
        </span>
      </td>{" "}
      <td className="px-6 py-4 whitespace-nowrap">
        {props.pp.originalLoan.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}
      </td>
      {props.pp.products[0].product.productType.toLowerCase() === "loan" ? (
        <>
          <td className="px-6 py-4 whitespace-nowrap">
            {roundoff(
              props.pp?.originalLoan - calculatePaidVoucher()
            ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </td>{" "}
          <td className="px-6 py-4 whitespace-nowrap">
            {loading ? (
              <>loading ... </>
            ) : (
              Math.abs(roundoff(calculatePaidVoucher())).toLocaleString(
                undefined,
                { maximumFractionDigits: 2 }
              )
            )}
          </td>
        </>
      ) : (
        <></>
      )}
      <td className="px-6 py-4 whitespace-nowrap">
        {accountType(props.pp.status)}
      </td>
    </>
  );
};
export default PurchasedProductsList;
