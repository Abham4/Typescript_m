import React from "react";
import axios from "axios";
import "./convert.css";
import { Container } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { client, purchasedproduct } from "./types";
import tokenService from "../service/token.service";

const LoanReports = () => {
  const [clients, setClients] = useState<client>();
  const baseURL = "https://localhost:5001/api/Clients";

  const to = tokenService.getLocalAccessToken();
  const pdfExportComponent = React.useRef<PDFExport>(null);
  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };
  // let Totlal={
  //   total:0
  // };

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

  const getIncome = (account: any) => {
    let result = 0;
    account.purchasedProducts.forEach((pp: purchasedproduct) => {
      result += pp.originalLoan;
    });
    return result;
  };

  const getTotalSold = (account: any) => {
    let result = 0;
    account.purchasedProducts.forEach((pp: purchasedproduct) => {
      result += 1;
    });
    return result;
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

  return (
    <>
      <div id="example">
        <div className="box wide hidden-on-narrow">
          <div className="box-col">
            <button
              className="border-solid border-2 border-indigo-600"
              onClick={exportPDFWithComponent}
            >
              Export PDF
            </button>
          </div>
        </div>
        <div className="page-container hidden-on-narrow">
          <PDFExport ref={pdfExportComponent}>
            <div className={`pdf-page `}>
              <div className="inner-page">
                <div className="addresses">
                  <div className="form">
                    <div className="all"></div>
                    <div className="totalsave">
                      <h3></h3>
                      <p>
                        <Container className="bg-white m-1 p-3 rounded-lg ">
                          <h1 className="text-xl font-bold pt-1 text-gray-400">
                            {/* Saving Accounts(
      {clients?.account instanceof Array ? (
        clients?.account?.map((acct) =>
          acct.accountType === "Saving" ? (
            <>{acct.accountType}</>
          ) : (
            <></>
          )
        )
      ) : (
        <></>
      )}
      ) */}
                            {clients instanceof Array ? (
                              clients.map((client: client) => {
                                console.log(client.branch.address);

                                client.account instanceof Array ? (
                                  client.account.map((report) =>
                                    // console.log(report.accountNo)
                                    report.accountType.toLowerCase() ===
                                    "loan" ? (
                                      <>{report.accountNo}</>
                                    ) : (
                                      <></>
                                    )
                                  )
                                ) : (
                                  <></>
                                );
                              })
                            ) : (
                              <>hi</>
                            )}
                          </h1>
                          <div className="flex flex-col mr-5">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                  <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                      <tr>
                                        <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          Member Name
                                        </th>
                                        <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          Account no
                                        </th>
                                        <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          Branch
                                        </th>
                                        <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          Total Loan Products
                                        </th>
                                        <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          Total Loan Products
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                      {clients instanceof Array ? (
                                        clients.map((client: client) =>
                                          client.account instanceof Array ? (
                                            client.account.map((acct) => (
                                              <tr key={acct.id}>
                                                {
                                                  // console.log(report.accountNo)
                                                  acct.accountType.toLowerCase() ===
                                                  "loan" ? (
                                                    <>
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm text-gray-900">
                                                          {client.firstName +
                                                            " " +
                                                            client.lastName}
                                                        </span>
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm text-gray-900">
                                                          {acct.accountNo}
                                                        </span>
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm text-gray-900">
                                                          {client.branch.name}
                                                        </span>
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm text-gray-900">
                                                          {getTotalSold(acct)}
                                                        </span>
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm text-gray-900">
                                                          {getIncome(
                                                            acct
                                                          ).toLocaleString(
                                                            undefined,
                                                            {
                                                              maximumFractionDigits: 2,
                                                            }
                                                          )}
                                                        </span>
                                                      </td>

                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm text-gray-900">
                                                          {acct.branch}
                                                        </span>
                                                      </td>
                                                    </>
                                                  ) : (
                                                    <></>
                                                  )
                                                }
                                              </tr>
                                            ))
                                          ) : (
                                            <></>
                                          )
                                        )
                                      ) : (
                                        <>hi</>
                                      )}
                                    </tbody>
                                    <tfoot>
                                      <tr>
                                        <td
                                          colSpan={4}
                                          className="px-6 py-4 whitespace-nowrap"
                                        >
                                          <span className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total
                                          </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <span className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {getTotalloan().toLocaleString(
                                              undefined,
                                              { maximumFractionDigits: 2 }
                                            )}
                                          </span>
                                        </td>
                                      </tr>
                                    </tfoot>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Container>
                      </p>
                    </div>
                    <div className="totalshare">
                      <p></p>
                    </div>
                    <div className="totalloan">
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PDFExport>
        </div>
      </div>
    </>
  );
};

export default LoanReports;
