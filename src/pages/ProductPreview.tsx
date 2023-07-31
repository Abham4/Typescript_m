import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Tabs,
  Tab,
  Breadcrumbs,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { product, purchasedproduct, Schedule, Voucher } from "./types";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import TabView from "../components/TabView";
import ViewVoucher from "../components/ViewVoucher";
import useStore from "../Store";
import ViewSchecdule from "../components/ViewSchecdule";
import tokenService from "../service/token.service";

const ProductPreview = () => {
  const baseURL = "https://localhost:5001/api/PurchasedProduct";
  const baseURL2 =
    "https://localhost:5001/api/Vouchers/GetVouchersListByClient/";
  const to = tokenService.getLocalAccessToken();

  const [voucher, setVouture] = useState<Voucher[]>();
  const [value, setValue] = React.useState(0);
  const { purchasedProduct, setPurchasedProduct } = useStore();

  const navigate = useNavigate();

  let total = {
    principal: 0,
    interest: 0,
    loanBalance: 0,
    penality: 0,
    due: 0,
  };
  const getTotalValues = () => {
    purchasedProduct?.paymentSchedules instanceof Array ? (
      purchasedProduct.paymentSchedules.map((schedule: Schedule) => (
        <>
          {(total.principal = total.principal + schedule.pricipalDue)}
          {(total.interest = total.interest + schedule.interest)}
          {(total.loanBalance = total.loanBalance + schedule.loanBalance)}
          {(total.penality = total.penality + schedule.penality)}
          {(total.due = total.due + schedule.due)}
        </>
      ))
    ) : (
      <></>
    );
    return total;
  };
  getTotalValues();

  const calculateTotalInterest = () => {
    let totalInterest = 0;
    purchasedProduct?.paymentSchedules instanceof Array ? (
      purchasedProduct.paymentSchedules.map(
        (schedule: Schedule) =>
          (totalInterest = totalInterest + schedule.interest)
      )
    ) : (
      <></>
    );

    return totalInterest;
  };

  const goToCreateVoucher = () => {
    navigate("/Transaction/Create");
  };

  useEffect(() => {
    const getpurchasedProduct = async () => {
      const ppId: any = localStorage.getItem("ppId");
      await axios
        .get(baseURL + "/" + ppId, {
          headers: {
            Authorization: `Bearer ${to}`,
          },
        })
        .then((responce) => {
          setPurchasedProduct(responce.data);
        });
    };
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
    };
    getpurchasedProduct();
    getVouture();
  }, []);

  const calculatePaidVoucher = () => {
    let value = 0;
    purchasedProduct?.account.accountType.toLocaleLowerCase() === "loan" ? (
      voucher instanceof Array ? (
        <>
          {" "}
          {voucher.map((v) => {
            if (
              v.purchasedProductId === purchasedProduct?.id &&
              v.voucherType?.toLocaleLowerCase() === "principal"
            )
              value += v.amount;
          })}
        </>
      ) : (
        <></>
      )
    ) : (
      <></>
    );
    purchasedProduct?.account.accountType.toLocaleLowerCase() !== "loan" ? (
      voucher instanceof Array ? (
        <>
          {" "}
          {voucher.map((v) => {
            if (
              v.purchasedProductId === purchasedProduct?.id &&
              v.voucherType?.toLocaleLowerCase() === "deposit"
            )
              value -= v.amount;
          })}
        </>
      ) : (
        <></>
      )
    ) : (
      <></>
    );
    return value;
  };
  const calculateInterestVoucher = () => {
    let value = 0;
    purchasedProduct?.account.accountType.toLocaleLowerCase() === "loan" ? (
      voucher instanceof Array ? (
        <>
          {" "}
          {voucher.map((v) => {
            if (
              v.purchasedProductId === purchasedProduct?.id &&
              v.voucherType?.toLocaleLowerCase() === "interest"
            )
              value += v.amount;
          })}
        </>
      ) : (
        <></>
      )
    ) : (
      <></>
    );
    return value;
  };

  //   const calculatePaidinterest = () =>{
  //     let value=0
  //         voucher instanceof Array?
  //        <> {voucher.map((v) => {
  //            if(v.purchasedProductId===purchasedProduct?.id)
  //             value+=v.amount
  //         })
  //         }
  //         </>:<></>

  //         return (Math.round(((calculateDateDifference()*value*purchasedProduct?.rate / 365)+Number.EPSILON)*100)/100)
  //     }
  const calculateTotalBalance = () => {
    return purchasedProduct?.originalLoan - calculatePaidVoucher();
  };

  const calculateRemainingBalance = () => {
    return Math.round((calculateTotalBalance() + Number.EPSILON) * 100) / 100;
  };

  const calculateLastVoitureDate = () => {
    let lastDate = "0";

    voucher instanceof Array ? (
      <>
        {" "}
        {voucher.map((v) => {
          if (
            v.purchasedProductId === purchasedProduct?.id &&
            v.voucherType?.toLocaleLowerCase() === "principal"
          ) {
            if (
              parseInt(v.createdDate.replace(/\D/g, "")) > parseInt(lastDate)
            ) {
              lastDate = v.createdDate.replace(/\D/g, "");
            }
          }
        })}
      </>
    ) : (
      <></>
    );
    return lastDate;
  };

  const calculateDateDifference = () => {
    const lastDate = calculateLastVoitureDate();
    const now = new Date().toISOString().replace(/\D/g, "");
    const year = parseInt(now.substr(0, 4)) - parseInt(lastDate.substr(0, 4));
    const month = parseInt(now.substr(4, 2)) - parseInt(lastDate.substr(4, 2));
    const day =
      parseInt(now.substr(6, 2)) -
      parseInt(lastDate.substr(6, 2)) +
      month * 30 +
      year * 365;
    if (day === 0) {
      return 1;
    } else {
      return day;
    }
  };

  const calculateInterest = () => {
    if (calculateDateDifference() === 1) {
      return 1;
    } else {
      return (
        Math.round(
          ((calculateDateDifference() *
            calculateRemainingBalance() *
            purchasedProduct?.rate) /
            365 +
            Number.EPSILON) *
            100
        ) / 100
      );
    }
  };

  const roundoff = (num: number) => {
    const value = Math.round((num + Number.EPSILON) * 100) / 100;
    return value;
  };
  // const calculatePaidPrincipal = () =>{
  //     let value=0
  //     voucher instanceof Array?
  //        <> {voucher.map((v) => {
  //            if(v.purchasedProductId===purchasedProduct?.id)
  //             value+=v.amount
  //         })
  //         }
  //         </>:<></>
  //         return value-value*purchasedProduct?.rate
  // }
  // const calculatePaidinterest = () =>{
  //     let value=0
  //     voucher instanceof Array?
  //        <> {voucher.map((v) => {
  //            if(v.purchasedProductId===purchasedProduct?.id)
  //             value+=v.amount
  //         })
  //         }
  //         </>:<></>
  //         return value*purchasedProduct?.rate
  // }

  // const calculateTotalBalance = () => {
  //     return (purchasedProduct?.originalLoan +(purchasedProduct?.originalLoan * purchasedProduct?.rate))-(calculatePaidPrincipal() + calculatePaidinterest())
  // }
  // start of functions used for tab

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  // end of functions used for tab

  return (
    <>
      <Container className="bg-yellow-100 mt-28 mb-20 pb-20 rounded-lg drop-shadow-lg ">
        <Breadcrumbs className=" p-5" aria-label="breadcrumb">
          <Link color="inherit" to="/" className=" hover:underline">
            <Typography className="text-black">Home</Typography>
          </Link>
          <Link color="inherit" to="/Members/" className=" hover:underline">
            <Typography className="text-black">Members List</Typography>
          </Link>
          <Link
            color="inherit"
            to="/Member/detail/"
            className=" hover:underline"
          >
            <Typography className="text-black">Member</Typography>
          </Link>
          <Typography className="text-black">Product</Typography>
        </Breadcrumbs>
        <div className="p-5">
          <ButtonGroup>
            <Button>
              <EditIcon />
              Add LoanCharge
            </Button>
            {purchasedProduct?.account.accountType.toLocaleLowerCase() ===
            "loan" ? (
              <Button onClick={goToCreateVoucher}>
                <AddIcon />
                Make Re-Payment
              </Button>
            ) : (
              <Button onClick={goToCreateVoucher}>
                <AddIcon />
                Make Deposit
              </Button>
            )}
          </ButtonGroup>
          <h1 className="text-4xl font-bold pt-5 color: rgb(0 0 0)">
            Current Balance : ETB{" "}
            {roundoff(
              purchasedProduct?.originalLoan -
                calculatePaidVoucher() +
                calculateTotalInterest() -
                calculateInterestVoucher()
            )}
          </h1>
          <div className="grid gap-2 grid-cols-3 grid-rows-1 pt-8">
            <div className="col-span-2">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                    ></th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                    >
                      Original
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                    >
                      Paid
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                    >
                      Waived
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                    >
                      Written off
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                    >
                      Outstanding
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                    >
                      Over Due
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider">
                      Principal
                    </td>
                    <td>
                      {purchasedProduct?.originalLoan.toLocaleString(
                        undefined,
                        { maximumFractionDigits: 2 }
                      )}
                    </td>
                    <td>
                      {Math.abs(
                        roundoff(calculatePaidVoucher())
                      ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </td>
                    <td>0</td>
                    <td>0</td>
                    <td>
                      {roundoff(
                        purchasedProduct?.originalLoan - calculatePaidVoucher()
                      ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider">
                      Interest
                    </td>
                    <td>
                      {roundoff(calculateTotalInterest()).toLocaleString(
                        undefined,
                        { maximumFractionDigits: 2 }
                      )}
                    </td>
                    <td>
                      {purchasedProduct?.account.accountType.toLocaleLowerCase() ===
                      "loan"
                        ? roundoff(calculateInterestVoucher()).toLocaleString(
                            undefined,
                            { maximumFractionDigits: 2 }
                          )
                        : 0}
                    </td>
                    <td>0</td>
                    <td>0</td>
                    <td>
                      {purchasedProduct?.account.accountType.toLocaleLowerCase() ===
                      "loan"
                        ? roundoff(
                            calculateTotalInterest() -
                              calculateInterestVoucher()
                          ).toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })
                        : 0}
                    </td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider">
                      Penality
                    </td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider">
                      Total
                    </td>
                    <td>
                      {roundoff(
                        calculateTotalInterest() +
                          purchasedProduct?.originalLoan
                      ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </td>
                    <td>
                      {Math.abs(
                        roundoff(
                          calculateInterestVoucher() + calculatePaidVoucher()
                        )
                      ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </td>
                    <td>0</td>
                    <td>0</td>
                    <td>
                      {roundoff(
                        purchasedProduct?.originalLoan -
                          calculatePaidVoucher() +
                          calculateTotalInterest() -
                          calculateInterestVoucher()
                      ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </td>
                    <td>0</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* product detail */}
            <div className="grid gap-2 grid-cols-1 grid-rows-1 ">
              <table className="bg-white divide-y divide-gray-200">
                <thead>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                  >
                    product detail
                  </th>
                </thead>
                <tbody className="bg-gray-50">
                  <tr>
                    <td
                      scope="col"
                      colSpan={2}
                      className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider col-span-2"
                    >
                      Expiry date
                    </td>
                    <td
                      scope="col"
                      colSpan={2}
                      className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider col-span-2"
                    >
                      {purchasedProduct?.expiryDate.substring(0, 10)}
                    </td>
                  </tr>
                  <tr>
                    <td
                      scope="col"
                      colSpan={2}
                      className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider col-span-2"
                    >
                      Account Type
                    </td>
                    <td
                      scope="col"
                      colSpan={2}
                      className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider col-span-2"
                    >
                      {purchasedProduct?.account.accountType}
                    </td>
                  </tr>
                  <tr>
                    <td
                      scope="col"
                      colSpan={2}
                      className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider col-span-2"
                    >
                      Product Name
                    </td>
                    <td
                      scope="col"
                      colSpan={2}
                      className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider col-span-2"
                    >
                      {purchasedProduct?.products instanceof Array ? (
                        purchasedProduct.products[0].product.name
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td
                      scope="col"
                      colSpan={2}
                      className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider col-span-2"
                    >
                      Short Name
                    </td>
                    <td
                      scope="col"
                      colSpan={2}
                      className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider col-span-2"
                    >
                      {purchasedProduct?.products instanceof Array ? (
                        purchasedProduct.products[0].product.shortName
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td
                      scope="col"
                      colSpan={2}
                      className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider col-span-2"
                    >
                      Rate
                    </td>
                    <td
                      scope="col"
                      colSpan={2}
                      className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider col-span-2"
                    >
                      {purchasedProduct?.products instanceof Array ? (
                        purchasedProduct.rate * 100
                      ) : (
                        <></>
                      )}
                      %
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <Box sx={{ width: "100%" }} className="pt-5">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Product actions"
              >
                <Tab label="Transactions" {...a11yProps(0)} />
                {purchasedProduct?.account.accountType.toLocaleLowerCase() ===
                "loan" ? (
                  <Tab label="Schedule" {...a11yProps(1)} />
                ) : (
                  <></>
                )}
              </Tabs>
            </Box>

            {/* Payment Schedule tab  */}
            {purchasedProduct?.account.accountType.toLocaleLowerCase() ===
            "loan" ? (
              <TabView value={value} index={1}>
                <div className="flex flex-row m-8">
                  <table className="min-w-full divide-y divide-gray-200 table-auto">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                        >
                          Paid Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                        >
                          Principal Due
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                        >
                          Loan Balance
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                        >
                          Interest
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                        >
                          Penality
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                        >
                          Due
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                        >
                          Paid
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {purchasedProduct?.paymentSchedules instanceof Array ? (
                        purchasedProduct.paymentSchedules.map(
                          (schedule: Schedule) => (
                            <tr>
                              <ViewSchecdule schedule={schedule} />
                            </tr>
                          )
                        )
                      ) : (
                        <></>
                      )}
                      <tr className="bg-gray-100">
                        <td className="px-6 bg-gray-200">Total</td>
                        <td className="px-6 bg-gray-200">-</td>
                        <td className="px-6 bg-gray-200">
                          {roundoff(total.principal).toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-6 bg-gray-200"></td>
                        <td className="px-6 bg-gray-200">
                          {roundoff(total.interest).toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-6 bg-gray-200">
                          {roundoff(total.penality).toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-6 bg-gray-200">
                          {roundoff(total.due).toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-6 bg-gray-200">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabView>
            ) : (
              <></>
            )}

            {/* Transaction tab  */}

            <TabView value={value} index={0}>
              <div className="flex flex-row m-8">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                      >
                        Transaction Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                      >
                        Transaction Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {voucher?.map((v: Voucher) =>
                      v.purchasedProductId === purchasedProduct?.id ? (
                        <tr>
                          <ViewVoucher voucher={v} />
                        </tr>
                      ) : (
                        <></>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </TabView>
          </Box>
        </div>
      </Container>
    </>
  );
};

export default ProductPreview;
