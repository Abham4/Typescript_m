import React, { SyntheticEvent } from "react";
import axios from "axios";
import "./convert.css";
import { useState, useRef, useEffect } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { branch, client, purchasedproduct } from "./types";
import { Container } from "@mui/material";
import useStore from "../Store";
import { useNavigate } from "react-router-dom";
import { faListSquares } from "@fortawesome/free-solid-svg-icons";
import GenerateReport from "./GenerateReport";
import tokenService from "../service/token.service";
const Convert = () => {
  const [clients, setClients] = useState<client>();
  const [branchList, setBranchList] = useState<branch[]>();
  const [viewReport,setViewReport] =useState(false)
  const navigate = useNavigate();
  const baseURL = "https://localhost:5001/api/Clients";
  const baseUrl2 = "https://localhost:5001/api/Branch";
  const to = tokenService.getLocalAccessToken();

  const date = new Date();
  date.setFullYear(date.getFullYear());
  const { filterValue, setFilterValue } = useStore();

  const [formValue, setformValue] = useState({
    branch: "",
    startDate: date.toISOString().substring(0, 16),
    endDate: date.toISOString().substring(0, 16),
    transactionType: "member",
    detail: "",
    level: "",
  });
  const handleChange = (event: any) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
    setFilterValue({
      ...filterValue,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const getBranch = async () => {
      await axios({
        method: "get",
        url: baseUrl2,
        headers: { Authorization: `Bearer ${to}` },
      }).then((response) => {
        setBranchList(response.data);
      });
    };
    getBranch();

    setFilterValue({
      branch: "all",
      startDate: date.toISOString().substring(0, 16),
      endDate: date.toISOString().substring(0, 16),
      transactionType: "member",
      detail: "",
      level: "summary",
    });
  }, []);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setViewReport(true)
  };
  const pdfExportComponent = useRef<PDFExport>(null);
  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };
  let Totlal = {
    total: 0,
  };

  useEffect(() => {
    const cli: any = localStorage.getItem("client");
    setClients(cli);
    axios
      .get(baseURL, {
        headers: {
          Authorization: `Bearer ${to}`,
        },
      })
      .then((response) => {
        setClients(response.data);
      });
  }, []);
  const getTotalsave = () => {
    let totalsave = 0;

    clients instanceof Array ? (
      clients.map((client: client) => {
        client.account instanceof Array ? (
          client.account?.map((acct) => (
            <>
              {acct.accountType.toLowerCase() === "saving" ? (
                acct.purchasedProducts instanceof Array ? (
                  acct.purchasedProducts.map((pp: purchasedproduct) => {
                    totalsave += pp.originalLoan;
                  })
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </>
          ))
        ) : (
          <></>
        );
      })
    ) : (
      <></>
    );

    return totalsave;
  };

  const getTotalshare = () => {
    let totalsave = 0;

    clients instanceof Array ? (
      clients.map((client: client) => {
        client.account instanceof Array ? (
          client.account?.map((acct) => (
            <>
              {acct.accountType.toLowerCase() === "sharing" ? (
                acct.purchasedProducts instanceof Array ? (
                  acct.purchasedProducts.map((pp: purchasedproduct) => {
                    totalsave += pp.originalLoan;
                  })
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </>
          ))
        ) : (
          <></>
        );
      })
    ) : (
      <></>
    );

    return totalsave;
  };

  const getTotalloan = () => {
    let totalsave = 0;

    clients instanceof Array ? (
      clients.map((client: client) => {
        client.account instanceof Array ? (
          client.account?.map((acct) => (
            <>
              {acct.accountType.toLowerCase() === "loan" ? (
                acct.purchasedProducts instanceof Array ? (
                  acct.purchasedProducts.map((pp: purchasedproduct) => {
                    totalsave += pp.originalLoan;
                  })
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </>
          ))
        ) : (
          <></>
        );
      })
    ) : (
      <></>
    );

    return totalsave;
  };

  // console.log(clients)
  return (
    //   <div id="example">
    //   <div className="box wide hidden-on-narrow">

    //     <div className="box-col">

    //       <button  className="border-solid border-2 border-indigo-600"onClick={exportPDFWithComponent}>Export PDF</button>
    //     </div>
    //   </div>
    //   <div className="page-container hidden-on-narrow">
    //     <PDFExport ref={pdfExportComponent}>
    //       <div className={ `pdf-page ` }>
    //         <div className="inner-page">

    //           <div className="addresses">
    //             <div className="form">
    //             <div className='all'>All Report</div>
    //             <div className='totalsave'>
    //               <h3>Total Save=</h3>
    //               <p>
    //               {getTotalsave().toLocaleString(undefined, {maximumFractionDigits:2})}
    //               </p>
    //               </div>
    //               <div className='totalshare'>
    //               <h3>Total Share=</h3>
    //               <p>
    //               {getTotalshare().toLocaleString(undefined, {maximumFractionDigits:2})}
    //               </p>
    //               </div>
    //               <div className='totalloan'>
    //               <h3>Total Loan=</h3>
    //               <p>
    //               {getTotalloan().toLocaleString(undefined, {maximumFractionDigits:2})}
    //               </p>
    //               </div>
    //             </div>
    //           </div>

    //         </div>
    //       </div>
    //     </PDFExport>
    //   </div>
    // </div>
    <>
      <Container className=" bg-yellow-100 mt-10 mb-20 pb-20 rounded-lg drop-shadow-lg">
        <div className="p-12">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 gap-2 mr-2">
              <label className="block">
                <span className="font-serif block text-sm text-lg text-slate-700 ">
                  Branch :
                </span>
              </label>

              <select
                name="branch"
                value={formValue.branch}
                onChange={handleChange}
                className="mt-1 block1 w-1/2 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  col-start-2 col-end-5
                  "
              >
                <option value="all">All</option>
                {branchList?.map((b: any) => (
                  <option value={b.id} key={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
              <label className="block">
                <span className="font-serif block text-sm text-lg text-slate-700 ">
                  From date:
                </span>
              </label>
              <input
                name="startDate"
                type="datetime-local"
                value={formValue.startDate}
                onChange={handleChange}
                className="mt-1 block1 w-1/2 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  col-start-2 col-end-5
                "
              />
              <label className="block">
                <span className="font-serif block text-sm text-lg text-slate-700 ">
                  To date:
                </span>
              </label>
              <input
                name="endDate"
                type="datetime-local"
                value={formValue.endDate}
                onChange={handleChange}
                className="mt-1 block1 w-1/2 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  col-start-2 col-end-5
                "
              />
              <label className="block">
                <span className="font-serif block text-sm text-lg text-slate-700 ">
                  Transaction Type :
                </span>
              </label>
              <select
                name="transactionType"
                value={formValue.transactionType}
                onChange={handleChange}
                className="mt-1 block1 w-1/2 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  col-start-2 col-end-5
                  "
              >
                <option value="member">Member</option>
                <option value="saving">Save</option>
                <option value="sharing">Share</option>
                <option value="loan">Loan</option>
              </select>

              {formValue.transactionType === "saving" ||
              formValue.transactionType === "loan" ? (
                <>
                  <label className="block">
                    <span className="font-serif block text-sm text-lg text-slate-700 ">
                      Detail :
                    </span>
                  </label>
                  <select
                    name="detail"
                    value={formValue.detail}
                    onChange={handleChange}
                    className="mt-1 block1 w-1/2 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  col-start-2 col-end-5
                  "
                  >
                    <option value="" disabled>
                      choose ...{" "}
                    </option>
                    {formValue.transactionType === "saving" ? (
                      <>
                        <option value="deposit">Deposit</option>
                        <option value="withdrawal">Withdrawal</option>
                      </>
                    ) : (
                      <>
                        <option value="disbursment">Disbursment</option>
                        <option value="return">Return</option>
                      </>
                    )}
                  </select>
                </>
              ) : (
                <></>
              )}

              <label className="block">
                <span className="font-serif block text-sm text-lg text-slate-700 ">
                  Level :
                </span>
              </label>
              <select
                name="level"
                value={formValue.level}
                onChange={handleChange}
                className="mt-1 block1 w-1/2 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                  col-start-2 col-end-5
                  "
              >
                <option value="summary">Summary</option>
                <option value="detail">Detail</option>
              </select>
              <div className="col-span-3">
                <input
                  type="submit"
                  className=" float-right mr-10  my-5 bg-[#000] hover:bg-[#ffbb00] hover:text-black text-white font-bold py-2 px-4 border border-yellow-400 rounded"
                  value="Generate Report"
                />
              </div>
            </div>
          </form>
        </div>
      </Container>
      {viewReport === true ?
      <div className="mb-28">
        <GenerateReport/>
      </div>
      :<></>}
    </>
  );
};

export default Convert;
