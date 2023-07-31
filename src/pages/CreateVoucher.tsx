import { Breadcrumbs, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import useStore from "../Store";
import { Link, useNavigate } from "react-router-dom";
import { purchasedproduct, Schedule, token, Voucher } from "./types";
import date from "date-and-time";
import jwtDecode from "jwt-decode";
import tokenService from "../service/token.service";

const CreateVoucher = () => {
  const { purchasedProduct, clientt } = useStore();
  const to = tokenService.getLocalAccessToken();

  const [voucher, setVouture] = useState<Voucher[]>();
  const [useAccount, setUseAccount] = useState<boolean>(false);
  const baseURL2 =
    "https://localhost:5001/api/Vouchers/GetVouchersListByClient/";
  const mydate = new Date();

  const [formValue, setformValue] = useState({
    // voucherType:"",
    timeStamp: mydate.toISOString().substring(0, 16),
    clientId: localStorage.getItem("client"),
    reason: "Repayment",
    amount: 0,
    purchasedProductId: purchasedProduct.id,
    reference: 0,
    branchId: 0,
  });

  useEffect(() => {
    const at = tokenService.getLocalAccessToken();
    const token: token =
      at !== null ? jwtDecode(at) : { FirstName: "", LastName: "" };
    token.BranchId !== undefined
      ? setformValue({
          ...formValue,
          branchId: parseInt(token.BranchId),
        })
      : setformValue({
          ...formValue,
          branchId: 0,
        });
  }, [formValue.amount]);

  const setAmmount = () => {
    let x = 0;
    purchasedProduct?.paymentSchedules instanceof Array ? (
      <>
        {purchasedProduct?.paymentSchedules.forEach((element: Schedule) => {
          if ((element.paid === element.due) === false && x === 0) {
            formValue.amount = element.due - element.paid;
            x = 1;
            return true;
          }
        })}
      </>
    ) : (
      <></>
    );
  };

  useEffect(() => {
    setformValue({
      ...formValue,
      reference: 0,
    });
  }, [useAccount]);
  const handleUseAccount = (event: any) => {
    if (event.target.value === "true") {
      setUseAccount(true);
    } else {
      setUseAccount(false);
    }
  };

  const navigate = useNavigate();

  const getSelectedAccountBalance = () => {
    let balance = -1;
    clientt?.account instanceof Array ? (
      clientt?.account?.map((acct) =>
        acct.accountType.toLocaleLowerCase() !== "loan" ? (
          acct.purchasedProducts.map((pp: purchasedproduct) =>
            pp.id === formValue.reference ? (balance = pp.originalLoan) : <></>
          )
        ) : (
          <></>
        )
      )
    ) : (
      <></>
    );
    return balance;
  };
  useEffect(() => {
    setAmmount();
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
    getVouture();
  }, []);

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
  const calculatePaidVoucher = () => {
    let value = 0;
    if (voucher === undefined) {
      value = 0;
    } else {
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
      );
    }

    return value;
  };

  // const calculatePaidinterest = () => {
  //   let value = 0;
  //   voucher instanceof Array ? (
  //     <>
  //       {" "}
  //       {voucher.map((v) => {
  //         if (v.purchasedProductId === purchasedProduct?.id) value += v.amount;
  //       })}
  //     </>
  //   ) : (
  //     <></>
  //   );
  //   return value * purchasedProduct?.rate;
  // };
  const calculateTotalBalance = () => {
    return purchasedProduct?.originalLoan - calculatePaidVoucher();
  };

  const calculateRemainingBalance = () => {
    return (
      Math.round(
        (calculateTotalBalance() +
          calculateInterestVoucher() +
          Number.EPSILON) *
          100
      ) / 100
    );
  };

  const calculateLastVoitureDate = () => {
    let lastDate = "0";
    let dateToreturn = "0";

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
              dateToreturn = v.createdDate;
            }
          }
        })}
      </>
    ) : (
      <></>
    );
    return dateToreturn;
  };

  const calculateDateDifference = () => {
    const lastDate = calculateLastVoitureDate();
    const now = new Date();
    if (Number(lastDate) === 0) {
      return 0;
    } else {
      return Math.floor(date.subtract(now, new Date(lastDate)).toDays());
    }
  };

  const calculateInterest = () => {
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
  };

  const handleSubmit = async () => {
    try {
      // make axios post request
      const response = await axios({
        method: "post",
        url: "https://localhost:5001/api/Vouchers",
        data: formValue,
        headers: { Authorization: `Bearer ${to}` },
      }).then((response) => {
        console.warn(response);
        navigate("/Member/Product");
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
    // console.log(formValue)
  };

  const handleChange = (event: any) => {
    if (event.target.name === "reference") {
      setformValue({
        ...formValue,
        [event.target.name]: parseInt(event.target.value),
      });
    } else {
      setformValue({
        ...formValue,
        [event.target.name]: event.target.value,
      });
    }
  };

  return (
    <>
      <Container className="pl-10 ml-10 bg-yellow-100 mt-10 mb-20 pb-20 rounded-lg drop-shadow-lg">
        <Breadcrumbs className=" p-5" aria-label="breadcrumb">
          <Link color="inherit" to="/" className=" hover:underline">
            Home
          </Link>
          <Link color="inherit" to="/Members/" className=" hover:underline">
            Members List
          </Link>
          <Link
            color="inherit"
            to="/Member/detail/"
            className=" hover:underline"
          >
            Member
          </Link>
          <Link
            color="inherit"
            to="/Member/Product/"
            className=" hover:underline"
          >
            Product
          </Link>
          <Typography className="text-black">Make Payment</Typography>
        </Breadcrumbs>
        <h1 className="text-4xl font-bold pt-5 text-gray-400">Transaction </h1>
        <div className="p-12">
          <div className="px-20" onSubmit={handleSubmit}>
            {purchasedProduct?.account.accountType.toLocaleLowerCase() ===
            "loan" ? (
              <></>
            ) : (
              <>
                <label className="block">
                  <span className="font-serif block text-sm text-lg text-slate-700 ">
                    Payment Type :
                  </span>
                </label>
                <select
                  name="voucherType"
                  defaultValue={""}
                  onChange={handleChange}
                  className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "
                >
                  <option value="" disabled>
                    Choose ...
                  </option>
                  <option value="Deposit">Deposit</option>
                </select>
              </>
            )}

            {purchasedProduct?.account.accountType.toLocaleLowerCase() ===
            "loan" ? (
              <>
                <label className="block">
                  <span className="font-serif block text-sm text-lg text-slate-700 ">
                    Source :
                  </span>
                </label>
                {getSelectedAccountBalance() !== -1 &&
                getSelectedAccountBalance() < formValue.amount ? (
                  <span className="text-red-700">
                    This account have insufficent balance please change Account
                  </span>
                ) : (
                  <></>
                )}
                <select
                  name="useaccount"
                  defaultValue={"false"}
                  onChange={handleUseAccount}
                  className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                          invalid:border-pink-500 invalid:text-pink-600
                          focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                        "
                >
                  <option value="false">Cash</option>
                  <option value="true">from account</option>
                </select>
              </>
            ) : (
              <></>
            )}
            {purchasedProduct?.account.accountType.toLocaleLowerCase() ===
              "loan" && useAccount ? (
              <>
                <label className="block">
                  <span className="font-serif block text-sm text-lg text-slate-700 ">
                    From Account :
                  </span>
                </label>
                {getSelectedAccountBalance() !== -1 &&
                getSelectedAccountBalance() < formValue.amount ? (
                  <span className="text-red-700">
                    This account have insufficent balance please change Account
                  </span>
                ) : (
                  <></>
                )}
                <select
                  name="reference"
                  defaultValue={""}
                  onChange={handleChange}
                  className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                          invalid:border-pink-500 invalid:text-pink-600
                          focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                        "
                >
                  <option value="" disabled>
                    Choose ...
                  </option>
                  {clientt?.account instanceof Array ? (
                    clientt?.account?.map((acct) =>
                      acct.accountType.toLocaleLowerCase() !== "loan" ? (
                        acct.purchasedProducts.map((pp: purchasedproduct) => (
                          <option value={pp.id}>
                            {pp.id} from account {acct.accountType}(
                            {acct.accountNo})
                          </option>
                        ))
                      ) : (
                        <></>
                      )
                    )
                  ) : (
                    <></>
                  )}
                </select>
              </>
            ) : (
              <></>
            )}

            <label className="block">
              <span className="font-serif block text-sm text-lg text-slate-700 ">
                Aproval Date :
              </span>
            </label>

            <input
              name="timeStamp"
              type="datetime-local"
              min={mydate.toISOString().substring(0, 16)}
              value={formValue.timeStamp}
              onChange={handleChange}
              className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                            col-start-2 col-end-5
                            "
            />

            <label className="block">
              <span className="font-serif block text-sm text-lg text-slate-700 ">
                Amount :
              </span>
            </label>
            {purchasedProduct?.account.accountType.toLocaleLowerCase() ===
            "loan" ? (
              <input
                name="amount"
                type="decimal"
                value={formValue.amount}
                onChange={handleChange}
                className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                        invalid:border-pink-500 invalid:text-pink-600
                        focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                      "
              />
            ) : (
              <input
                name="amount"
                type="number"
                value={formValue.amount}
                onChange={handleChange}
                className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                        invalid:border-pink-500 invalid:text-pink-600
                        focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                      "
              />
            )}

            <div>
              <h1>You are About To pay</h1>
              <h1>
                Principal Amount of :{" "}
                {formValue.amount === 0
                  ? 0
                  : Math.round(
                      (formValue.amount -
                        calculateInterest() +
                        Number.EPSILON) *
                        100
                    ) / 100}
              </h1>
              <h1>
                Intrest Amount of :{" "}
                {formValue.amount === 0 ? 0 : calculateInterest()}{" "}
              </h1>
              <h1>Penality Amount of : {} </h1>
              <h1>Total Amount of : {formValue.amount}</h1>
            </div>
            <input
              type="button"
              onClick={handleSubmit}
              className="float-right  my-5 bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              value="Submit"
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default CreateVoucher;
