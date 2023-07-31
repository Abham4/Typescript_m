import { Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useStore from "../Store";
import { product } from "./types";
import { Breadcrumbs, MenuItem, Select, Typography } from "@mui/material";
import tokenService from "../service/token.service";

const CreateProduct = () => {
  const { accountType, clientt } = useStore();
  let client = localStorage.getItem("client");
  let accountNo: string = "";
  let accountId: number = 0;
  const [products, setProducts] = useState<product[]>();
  const [product, setProduct] = useState<product>();
  const mydate = new Date();
  const [productid, setProductid] = useState({
    productId: 0,
  });
  const [formValue, setformValue] = useState({
    name: "",
    shortName: "",
    expiryDate: mydate.toISOString().substring(0, 16),
    status: "active",
    productType: "",
    accountId: accountId,
    products: [productid],
    originalLoan: 0,
    loanBalance: 0,
    amountPaid: 0,
    paymentContrat: 12,
    rate: 0.0,
    startingDate: mydate.toISOString().substring(0, 16),
  });
  let navigate = useNavigate();

  const to = tokenService.getLocalAccessToken();
  const baseURL = "https://localhost:5001/api/products";

  useEffect(() => {
    const setClientData = async () => {
      axios
        .get(baseURL, {
          headers: {
            Authorization: `Bearer ${to}`,
          },
        })
        .then((responce) => {
          setProducts(responce.data);
        });
    };
    setClientData();
  }, []);
  const handleSubmit = async () => {
    try {
      // make axios post request
      const response = await axios({
        method: "post",
        url: "https://localhost:5001/api/PurchasedProduct",
        data: formValue,
        headers: { Authorization: `Bearer ${to}` },
      }).then((response) => {
        console.warn(response);
        navigate("/Member/detail");
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
    // console.log(formValue)
  };

  const handleChange = (event: any) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  const handleProductChange = (event: any) => {
    const pd = products?.filter(
      (value, index) => value.id === parseInt(event.target.value)
    );
    const ol =
      pd !== undefined ? pd.map((product) => product.originalLoan) : [];
    setProductid({
      ...productid,
      [event.target.name]: event.target.value,
    });
    setformValue({
      ...formValue,
      originalLoan: ol[0],
    });
  };

  useEffect(() => {
    setformValue({
      ...formValue,
      ["products"]: [productid],
    });
    const setProductData = async () => {
      axios
        .get("https://localhost:5001/api/Products/" + productid.productId, {
          headers: {
            Authorization: `Bearer ${to}`,
          },
        })
        .then((responce) => {
          setProduct(responce.data);
        });
    };
    setProductData();
  }, [productid]);

  useEffect(() => {
    setformValue({
      ...formValue,
      ["accountId"]: accountId,
    });
  }, [accountId]);

  // preparing the account number

  for (const acctNo in clientt.account) {
    if (acctNo === "0" && accountType.toLocaleLowerCase() === "sharing") {
      if (clientt?.account instanceof Array) {
        accountNo = clientt?.account[0].accountNo;
        accountId = clientt?.account[0].id;
      }
    }
    if (acctNo === "1" && accountType.toLocaleLowerCase() === "loan") {
      if (clientt?.account instanceof Array) {
        accountNo = clientt?.account[1].accountNo;
        accountId = clientt?.account[1].id;
      }
    }

    if (acctNo === "2" && accountType.toLocaleLowerCase() === "saving") {
      if (clientt?.account instanceof Array) {
        accountNo = clientt?.account[2].accountNo;
        accountId = clientt?.account[2].id;
      }
    }
  }

  return (
    <>
      <Container className="bg-yellow-100 mt-10 mb-20 pb-20 rounded-lg drop-shadow-lg">
        <Breadcrumbs className="p-5" aria-label="breadcrumb">
          <Link color="inherit" to="/" className=" hover:underline">
            <Typography className="text-black">Home</Typography>
          </Link>
          <Link color="inherit" to="/Members" className=" hover:underline">
            <Typography className="text-black">Members List</Typography>
          </Link>
          <Link
            color="inherit"
            to="/Member/detail/"
            className=" hover:underline"
          >
            <Typography className="text-black">Members </Typography>
          </Link>
          <Typography className="text-black">Add Product</Typography>
        </Breadcrumbs>
        <h1 className="text-4xl font-bold pt-5 color: rgb(0 0 0)">
          Add Product on {accountType}
        </h1>
        <div className="p-12">
          <div className="px-20" onSubmit={handleSubmit}>
            <label className="block">
              <span className="font-serif block text-sm text-lg color: rgb(0 0 0) ">
                Products :
              </span>
            </label>
            <select
              name="productId"
              defaultValue={""}
              onChange={handleProductChange}
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
              {products?.map((product: product) =>
                product.productType.toLocaleLowerCase() ===
                accountType.toLocaleLowerCase() ? (
                  <option value={product.id} key={product.id}>
                    {product.name}
                  </option>
                ) : (
                  <></>
                )
              )}
            </select>

            {productid.productId !== 0 ? (
              <>
                {/* <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Product Name :</span></label>
                      <input name="pname" type="text" disabled value={formValue.name} className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                        invalid:border-pink-500 invalid:text-pink-600
                        focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                      "/>
                      <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Product Code :</span></label>
                      <input name="psname" type="text" disabled value={formValue.shortName} className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                        invalid:border-pink-500 invalid:text-pink-600
                        focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                      "/> */}
                <label className="block">
                  <span className="font-serif block text-sm text-lg text-slate-700 ">
                    {accountType.toLowerCase() === "loan" ? (
                      <> Original Loan :</>
                    ) : (
                      <> Paid Amount :</>
                    )}
                  </span>
                </label>
                <input
                  name="originalLoan"
                  type="number"
                  value={formValue.originalLoan}
                  onChange={handleChange}
                  className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                        invalid:border-pink-500 invalid:text-pink-600
                        focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                      "
                />
                {accountType.toLowerCase() === "loan" ? (
                  <>
                    <label className="block">
                      <span className="font-serif block text-sm text-lg color: rgb(0 0 0) ">
                        Contrat In Months :
                      </span>
                    </label>
                    <input
                      name="paymentContrat"
                      type="number"
                      value={formValue.paymentContrat}
                      onChange={handleChange}
                      className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                        invalid:border-pink-500 invalid:text-pink-600
                        focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                      "
                    />
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
            <label className="block">
              <span className="font-serif block text-sm text-lg color: rgb(0 0 0) ">
                Interest Rate:
              </span>
            </label>
            <input
              name="rate"
              type="decimal"
              value={formValue.rate}
              onChange={handleChange}
              className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                        invalid:border-pink-500 invalid:text-pink-600
                        focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                      "
            />
            <label className="block">
              <span className="font-serif block text-sm text-lg color: rgb(0 0 0) ">
                Starting Date :
              </span>
            </label>

            <input
              name="startingDate"
              min={mydate.toISOString().substring(0, 16)}
              value={formValue.startingDate}
              type="datetime-local"
              onChange={handleChange}
              className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "
            />
            {accountType.toLowerCase() === "loan" ? (
              <>
                <label className="block">
                  <span className="font-serif block text-sm text-lg color: rgb(0 0 0) ">
                    Expiry Date :
                  </span>
                </label>

                <input
                  name="expiryDate"
                  min={mydate.toISOString().substring(0, 16)}
                  value={formValue.expiryDate}
                  type="datetime-local"
                  onChange={handleChange}
                  className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "
                />
              </>
            ) : (
              <> </>
            )}

            <label className="block">
              <span className="font-serif block text-sm text-lg color: rgb(0 0 0) ">
                Status :
              </span>
            </label>
            <select
              name="status"
              defaultValue={""}
              value={formValue.status}
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
              <option value="active">Activated</option>
              <option value="pending">Pending</option>
            </select>

            <label className="block">
              <span className="font-serif block text-sm text-lg color: rgb(0 0 0) ">
                Acount Id :
              </span>
            </label>

            <select
              name="accountId"
              defaultValue={""}
              value={formValue.accountId}
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
              <option value={accountNo}>{accountNo}</option>
            </select>

            <input
              type="button"
              onClick={handleSubmit}
              className="float-right  my-5 bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              value="Create"
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default CreateProduct;
