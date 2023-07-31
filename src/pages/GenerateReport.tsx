import axios from "axios";
import React, { useEffect, useState } from "react";
import { client, branch, account, purchasedproduct } from "./types";
import useStore from "../Store";
import tokenService from "../service/token.service";


const GenerateReport = () => {
  const [branchs, setBranch] = useState<branch>();
  const [clients, setClients] = useState<client>();
  const [isLoading, setLoading] = useState(true);

  const baseURL2 = "https://localhost:5001/api/Branch";
  const baseURL = "https://localhost:5001/api/Clients";

  const to = tokenService.getLocalAccessToken();

  const { filterValue } = useStore();

  useEffect(() => {
    const client: any = localStorage.getItem("client");
    setClients(client);
    axios
      .get(baseURL, {
        headers: {
          Authorization: `Bearer ${to}`,
        },
      })
      .then((response) => {
        setClients(response.data);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    const branchs: any = localStorage.getItem("branch");
    setBranch(branchs);
    axios
      .get(baseURL2, {
        headers: {
          Authorization: `Bearer ${to}`,
        },
      })
      .then((response) => {
        setBranch(response.data);
      });
  }, []);
  const getTotalClient = (clients: any, branch: number) => {
    let result = 0;
    clients.forEach((client: client) => {
      if (client.branchId === branch) {
        filterValue.startDate.substring(0, 10) <=
          client.createdDate.toString().substring(0, 10) &&
        filterValue.endDate.substring(0, 10) >=
          client.createdDate.toString().substring(0, 10)
          ? (result += 1)
          : (result = result);
      }
    });
    return result;
  };

  const getallsharebyid = (pp: purchasedproduct[]) => {
    let total = 0;
    pp.forEach((product) => {
      total += product.originalLoan;
    });
    return total;
  };

  const getallshare = () => {
    let total = 0;
    clients instanceof Array ? (
      clients.map((cl: client) =>
        cl.account instanceof Array ? (
          cl.account.map((acc) => (
            <>
              {acc.accountType.toLowerCase() === "sharing" ? (
                acc.purchasedProducts instanceof Array ? (
                  acc.purchasedProducts.map((pp: purchasedproduct) => {
                    total = total + pp.originalLoan;
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
        )
      )
    ) : (
      <></>
    );
    return total;
  };
  const getTotalsave = (branch: number) => {
    let total = 0;
    clients instanceof Array ? (
      clients.map((cl: client) =>
        cl.account instanceof Array ? (
          cl.account.map((acc) => (
            <>
              {acc.accountType.toLowerCase() === "saving" ? (
                acc.purchasedProducts instanceof Array ? (
                  acc.purchasedProducts.forEach((pp: purchasedproduct) => {
                    if (cl.branchId === branch) {
                      filterValue.startDate.substring(0, 10) <=
                        pp.createdDate.toString().substring(0, 10) &&
                      filterValue.endDate.substring(0, 10) >=
                        pp.createdDate.toString().substring(0, 10)
                        ? (total = total + pp.originalLoan)
                        : (total = total);
                    }
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
        )
      )
    ) : (
      <></>
    );
    return total;
  };
  const getTotalShare = (branch: number) => {
    let total = 0;
    clients instanceof Array ? (
      clients.map((cl: client) =>
        cl.account instanceof Array ? (
          cl.account.map((acc) => (
            <>
              {acc.accountType.toLowerCase() === "sharing" ? (
                acc.purchasedProducts instanceof Array ? (
                  acc.purchasedProducts.forEach((pp: purchasedproduct) => {
                    console.log(cl);
                    if (cl.branchId === branch) {
                      filterValue.startDate.substring(0, 10) <=
                        pp.createdDate.toString().substring(0, 10) &&
                      filterValue.endDate.substring(0, 10) >=
                        pp.createdDate.toString().substring(0, 10)
                        ? (total = total + pp.originalLoan)
                        : (total = total);
                    }
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
        )
      )
    ) : (
      <></>
    );
    return total;
  };
  const getTotalLoan = (branch: number) => {
    let total = 0;
    clients instanceof Array ? (
      clients.map((cl: client) =>
        cl.account instanceof Array ? (
          cl.account.map((acc) => (
            <>
              {acc.accountType.toLowerCase() === "loan" ? (
                acc.purchasedProducts.forEach((pp: purchasedproduct) => {
                  if (cl.branchId === branch) {
                    filterValue.startDate.substring(0, 10) <=
                      pp.createdDate.toString().substring(0, 10) &&
                    filterValue.endDate.substring(0, 10) >=
                      pp.createdDate.toString().substring(0, 10)
                      ? (total = total + pp.originalLoan)
                      : (total = total);
                  }
                })
              ) : (
                <></>
              )}
            </>
          ))
        ) : (
          <></>
        )
      )
    ) : (
      <></>
    );
    return total;
  };

  if (isLoading) {
    return <>Loading</>;
  }
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <h1 className="text-2xl mb-5">
              This report is {filterValue.level} report of{" "}
              {filterValue.transactionType} from the date{" "}
              <i className="text-red-900">{filterValue.startDate.substring(0, 10)} </i>
              to date{" "}
              <i className="text-red-900">{filterValue.endDate.substring(0, 10)}</i>
            </h1>
            {/* member summary table  */}
            {filterValue.transactionType === "member" &&
            filterValue.level === "summary" ? (
              <>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                      >
                        Branch
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                      >
                        Member
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {branchs instanceof Array ? (
                      branchs.map((br: branch) =>
                        filterValue.branch !== "all" ? (
                          <>
                            {br.id === parseInt(filterValue.branch) ? (
                              <tr key={br.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="text-sm text-gray-900">
                                    {br.address}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="text-sm text-gray-900">
                                    {getTotalClient(clients, br.id).toLocaleString(undefined, {maximumFractionDigits:2})}
                                  </span>
                                </td>
                              </tr>
                            ) : (
                              <></>
                            )}
                          </>
                        ) : (
                          <tr key={br.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900">
                                {br.address}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900">
                                {getTotalClient(clients, br.id)}
                              </span>
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <></>
                    )}
                    {/* {
                  clients instanceof Array?(
                  clients.map((cl:client)=>(
                    
                      cl.branch instanceof Array?(
                       cl.branch.map((br:branch)=>(
                           <tr key={br.id} >
                               
                             <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                        {cl.branch.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                          {}
                      </span>
                      </td>
                           </tr>
                       ))
                      ):<></>
                  ))
                  ):<></>
              }    */}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td></td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </>
            ) : (
              <></>
            )}

            {/* member detail table  */}

            {filterValue.transactionType === "member" &&
            filterValue.level === "detail" ? (
              <>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                      >
                        Branch
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                      >
                        Full Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                      >
                        Share Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {clients instanceof Array ? (
                      clients.map((cl: client) =>
                        filterValue.branch !== "all" ? (
                          cl.branchId === parseInt(filterValue.branch) ? (
                            filterValue.startDate.substring(0, 10) <=
                              cl.createdDate.toString().substring(0, 10) &&
                            filterValue.endDate.substring(0, 10) >=
                              cl.createdDate.toString().substring(0, 10) ? (
                              <>
                                <tr key={cl.id}>
                                  {
                                    <>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">
                                          {cl.branch.name}
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">
                                          {cl.firstName + " " + cl.lastName}
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">
                                          {cl.account instanceof Array ? (
                                            cl.account.map((acc) =>
                                              acc.accountType.toLowerCase() ===
                                              "sharing" ? (
                                                getallsharebyid(
                                                  acc.purchasedProducts
                                                ).toLocaleString(undefined, {maximumFractionDigits:2})
                                              ) : (
                                                <></>
                                              )
                                            )
                                          ) : (
                                            <></>
                                          )}
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">
                                          {cl.createdDate
                                            .toString()
                                            .substring(0, 10)}
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">
                                          {}
                                        </span>
                                      </td>
                                    </>
                                  }
                                </tr>
                              </>
                            ) : (
                              <></>
                            )
                          ) : (
                            <></>
                          )
                        ) : (
                          <>
                            {filterValue.startDate.substring(0, 10) <=
                              cl.createdDate.toString().substring(0, 10) &&
                            filterValue.endDate.substring(0, 10) >=
                              cl.createdDate.toString().substring(0, 10) ? (
                              <>
                                <tr key={cl.id}>
                                  {
                                    <>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">
                                          {cl.branch.name + "hi"}
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">
                                          {cl.firstName + " " + cl.lastName}
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">
                                          {cl.account instanceof Array ? (
                                            cl.account.map((acc) =>
                                              acc.accountType.toLowerCase() ===
                                              "sharing" ? (
                                                getallsharebyid(
                                                  acc.purchasedProducts
                                                )
                                              ) : (
                                                <></>
                                              )
                                            )
                                          ) : (
                                            <></>
                                          )}
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">
                                          {cl.createdDate
                                            .toString()
                                            .substring(0, 10)}
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">
                                          {}
                                        </span>
                                      </td>
                                    </>
                                  }
                                </tr>
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        )
                      )
                    ) : (
                      <></>
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td>total</td>
                      <td>{getallshare().toLocaleString(undefined, {maximumFractionDigits:2})}</td>
                    </tr>
                  </tfoot>
                </table>
              </>
            ) : (
              <></>
            )}

            {/* Saving report summary        */}
            {filterValue.transactionType === "saving" &&
            filterValue.level === "summary" ? (
              <>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                      >
                        Branch
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {branchs instanceof Array ? (
                      branchs.map((br: branch) =>
                        filterValue.branch !== "all" ? (
                          <>
                            {br.id === parseInt(filterValue.branch) ? (
                              <tr key={br.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="text-sm text-gray-900">
                                    {br.address}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="text-sm text-gray-900">
                                    {getTotalsave(br.id).toLocaleString(undefined, {maximumFractionDigits:2})}
                                  </span>
                                </td>
                              </tr>
                            ) : (
                              <></>
                            )}
                          </>
                        ) : (
                          <tr key={br.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900">
                                {br.address}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900">
                                {getTotalsave(br.id).toLocaleString(undefined, {maximumFractionDigits:2})}
                              </span>
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
              </>
            ) : (
              <></>
            )}

            {/* saving report detail  */}
            {filterValue.transactionType === "saving" &&
            filterValue.level === "detail" ? (
              <>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                      >
                        Branch
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {clients instanceof Array ? (
                      clients.map((client: client) =>
                        client.account instanceof Array ? (
                          client.account.map((acct) =>
                            acct.accountType.toLowerCase() === "saving" ? (
                              acct.purchasedProducts instanceof Array ? (
                                acct.purchasedProducts.map(
                                  (pp: purchasedproduct) =>
                                    filterValue.branch !== "all" ? (
                                      client.branchId ===
                                      parseInt(filterValue.branch) ? (
                                        filterValue.startDate.substring(
                                          0,
                                          10
                                        ) <=
                                          client.createdDate
                                            .toString()
                                            .substring(0, 10) &&
                                        filterValue.endDate.substring(0, 10) >=
                                          client.createdDate
                                            .toString()
                                            .substring(0, 10) ? (
                                          <tr key={pp.id}>
                                            {console.log(pp)}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              <span className="text-sm text-gray-900">
                                                {client.branch.name}
                                              </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              <span className="text-sm text-gray-900">
                                                {client.firstName +
                                                  " " +
                                                  client.lastName}
                                              </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              <span className="text-sm text-gray-900">
                                                {client.createdDate
                                                  .toString()
                                                  .substring(0, 10)}
                                              </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              <span className="text-sm text-gray-900">
                                                {pp.originalLoan.toLocaleString(undefined, {maximumFractionDigits:2})}
                                              </span>
                                            </td>
                                          </tr>
                                        ) : (
                                          <></>
                                        )
                                      ) : (
                                        <></>
                                      )
                                    ) : filterValue.startDate.substring(
                                        0,
                                        10
                                      ) <=
                                        client.createdDate
                                          .toString()
                                          .substring(0, 10) &&
                                      filterValue.endDate.substring(0, 10) >=
                                        client.createdDate
                                          .toString()
                                          .substring(0, 10) ? (
                                      <tr key={pp.id}>
                                        {console.log(pp)}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <span className="text-sm text-gray-900">
                                            {client.branch.name}
                                          </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <span className="text-sm text-gray-900">
                                            {client.firstName +
                                              " " +
                                              client.lastName}
                                          </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <span className="text-sm text-gray-900">
                                            {client.createdDate
                                              .toString()
                                              .substring(0, 10)}
                                          </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <span className="text-sm text-gray-900">
                                            {pp.originalLoan}
                                          </span>
                                        </td>
                                      </tr>
                                    ) : (
                                      <></>
                                    )
                                  // <tr key={pp.id}>
                                  //   {console.log(pp)}
                                  //   <td className="px-6 py-4 whitespace-nowrap">
                                  //     <span className="text-sm text-gray-900">
                                  //       {client.branch.name}
                                  //     </span>
                                  //   </td>
                                  //   <td className="px-6 py-4 whitespace-nowrap">
                                  //     <span className="text-sm text-gray-900">
                                  //       {client.firstName +
                                  //         " " +
                                  //         client.lastName}
                                  //     </span>
                                  //   </td>
                                  //   <td className="px-6 py-4 whitespace-nowrap">
                                  //     <span className="text-sm text-gray-900">
                                  //       {client.createdDate
                                  //         .toString()
                                  //         .substring(0, 10)}
                                  //     </span>
                                  //   </td>
                                  //   <td className="px-6 py-4 whitespace-nowrap">
                                  //     <span className="text-sm text-gray-900">
                                  //       {pp.originalLoan}
                                  //     </span>
                                  //   </td>
                                  // </tr>
                                )
                              ) : (
                                <></>
                              )
                            ) : (
                              <></>
                            )
                          )
                        ) : (
                          <></>
                        )
                      )
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
              </>
            ) : (
              <></>
            )}

            {/* sharing report summary  */}
            {filterValue.transactionType === "sharing" &&
            filterValue.level === "summary" ? (
              <>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                      >
                        Branch
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {branchs instanceof Array ? (
                      branchs.map((br: branch) =>
                        filterValue.branch !== "all" ? (
                          br.id === parseInt(filterValue.branch) ? (
                            <tr key={br.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm text-gray-900">
                                  {br.address}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm text-gray-900">
                                  {getTotalShare(br.id)}
                                </span>
                              </td>
                            </tr>
                          ) : (
                            <></>
                          )
                        ) : (
                          <tr key={br.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900">
                                {br.address}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900">
                                {getTotalShare(br.id)}
                              </span>
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
              </>
            ) : (
              <></>
            )}

            {/* sharing report detail */}
            {filterValue.transactionType === "sharing" &&
            filterValue.level === "detail" ? (
              <>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                      >
                        Branch
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {clients instanceof Array ? (
                      clients.map((client: client) =>
                        client.account instanceof Array ? (
                          client.account.map((acct) =>
                            acct.accountType.toLowerCase() === "sharing" ? (
                              acct.purchasedProducts instanceof Array ? (
                                acct.purchasedProducts.map(
                                  (pp: purchasedproduct) =>
                                    filterValue.branch !== "all" ? (
                                      client.branchId ===
                                      parseInt(filterValue.branch) ? (
                                        filterValue.startDate.substring(
                                          0,
                                          10
                                        ) <=
                                          pp.createdDate
                                            .toString()
                                            .substring(0, 10) &&
                                        filterValue.endDate.substring(0, 10) >=
                                          pp.createdDate
                                            .toString()
                                            .substring(0, 10) ? (
                                          <tr key={pp.id}>
                                            {console.log(pp)}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              <span className="text-sm text-gray-900">
                                                {client.branch.name}
                                              </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              <span className="text-sm text-gray-900">
                                                {client.firstName +
                                                  " " +
                                                  client.lastName}
                                              </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              <span className="text-sm text-gray-900">
                                                {client.createdDate
                                                  .toString()
                                                  .substring(0, 10)}
                                              </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              <span className="text-sm text-gray-900">
                                                {pp.originalLoan}
                                              </span>
                                            </td>
                                          </tr>
                                        ) : (
                                          <></>
                                        )
                                      ) : (
                                        <></>
                                      )
                                    ) : filterValue.startDate.substring(
                                        0,
                                        10
                                      ) <=
                                        pp.createdDate
                                          .toString()
                                          .substring(0, 10) &&
                                      filterValue.endDate.substring(0, 10) >=
                                        pp.createdDate
                                          .toString()
                                          .substring(0, 10) ? (
                                      <tr key={pp.id}>
                                        {console.log(pp)}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <span className="text-sm text-gray-900">
                                            {client.branch.name}
                                          </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <span className="text-sm text-gray-900">
                                            {client.firstName +
                                              " " +
                                              client.lastName}
                                          </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <span className="text-sm text-gray-900">
                                            {client.createdDate
                                              .toString()
                                              .substring(0, 10)}
                                          </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <span className="text-sm text-gray-900">
                                            {pp.originalLoan}
                                          </span>
                                        </td>
                                      </tr>
                                    ) : (
                                      <></>
                                    )
                                )
                              ) : (
                                <></>
                              )
                            ) : (
                              <></>
                            )
                          )
                        ) : (
                          <></>
                        )
                      )
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
              </>
            ) : (
              <></>
            )}

            {/* loan report summary  */}
            {filterValue.transactionType === "loan" &&
            filterValue.level === "summary" ? (
              <>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                      >
                        Branch
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {branchs instanceof Array ? (
                      branchs.map((br: branch) =>
                        filterValue.branch !== "all" ? (
                          br.id === parseInt(filterValue.branch) ? (
                            <tr key={br.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm text-gray-900">
                                  {br.address}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm text-gray-900">
                                  {getTotalLoan(br.id).toLocaleString(undefined, {maximumFractionDigits:2})}
                                </span>
                              </td>
                            </tr>
                          ) : (
                            <></>
                          )
                        ) : (
                          <tr key={br.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900">
                                {br.address}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900">
                                {getTotalLoan(br.id).toLocaleString(undefined, {maximumFractionDigits:2})}
                              </span>
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
              </>
            ) : (
              <></>
            )}

            {/* loan report detail  */}
            {filterValue.transactionType === "loan" &&
            filterValue.level === "detail" ? (
              <>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                      >
                        Branch
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {clients instanceof Array ? (
                      clients.map((client: client) =>
                        client.account instanceof Array ? (
                          client.account.map((acct) =>
                            acct.accountType.toLowerCase() === "loan" ? (
                              acct.purchasedProducts instanceof Array ? (
                                acct.purchasedProducts.map(
                                  (pp: purchasedproduct) =>
                                    filterValue.branch !== "all" ? (
                                      client.branchId ===
                                      parseInt(filterValue.branch) ? (
                                        filterValue.startDate.substring(
                                          0,
                                          10
                                        ) <=
                                          pp.createdDate
                                            .toString()
                                            .substring(0, 10) &&
                                        filterValue.endDate.substring(0, 10) >=
                                          pp.createdDate
                                            .toString()
                                            .substring(0, 10) ? (
                                          <tr key={pp.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              <span className="text-sm text-gray-900">
                                                {client.branch.name}
                                              </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              <span className="text-sm text-gray-900">
                                                {client.firstName +
                                                  " " +
                                                  client.lastName}
                                              </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              <span className="text-sm text-gray-900">
                                                {client.createdDate
                                                  .toString()
                                                  .substring(0, 10)}
                                              </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              <span className="text-sm text-gray-900">
                                                {pp.originalLoan}
                                              </span>
                                            </td>
                                          </tr>
                                        ) : (
                                          <></>
                                        )
                                      ) : (
                                        <></>
                                      )
                                    ) : filterValue.startDate.substring(
                                        0,
                                        10
                                      ) <=
                                        pp.createdDate
                                          .toString()
                                          .substring(0, 10) &&
                                      filterValue.endDate.substring(0, 10) >=
                                        pp.createdDate
                                          .toString()
                                          .substring(0, 10) ? (
                                      <tr key={pp.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <span className="text-sm text-gray-900">
                                            {client.branch.name}
                                          </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <span className="text-sm text-gray-900">
                                            {client.firstName +
                                              " " +
                                              client.lastName}
                                          </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <span className="text-sm text-gray-900">
                                            {client.createdDate
                                              .toString()
                                              .substring(0, 10)}
                                          </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <span className="text-sm text-gray-900">
                                            {pp.originalLoan}
                                          </span>
                                        </td>
                                      </tr>
                                    ) : (
                                      <></>
                                    )
                                )
                              ) : (
                                <></>
                              )
                            ) : (
                              <></>
                            )
                          )
                        ) : (
                          <></>
                        )
                      )
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateReport;
