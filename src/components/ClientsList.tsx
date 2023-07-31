import {
  Breadcrumbs,
  Container,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ClientRow from "./ClientRow";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { client } from "../pages/types";
import EnhancedTableHead from "./EnhancedTableHead";

interface Data {
  staff: boolean;
  status: boolean;
  phoneNumber: number;
  passBookNumber: string;
  firstName: string;
  branchId: string;
}
type Order = "asc" | "desc";

export const ClientsList = (props: {
  clients: any[];
  rows: any;
  setRows: (row: client[]) => void;
}) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("firstName");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [dense, setDense] = React.useState(false);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = props.rows.map((n: any) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const [searched, setSearched] = useState<string>("");
  const [searchedbypbNo, setSearchedbypbNo] = useState<string>("");
  const [searchedbypNo, setSearchedbypNo] = useState<string>("");

  console.log(props.rows)
  const requestSearch = (searchedVal: string) => {
    const filteredRows = props.clients.filter((row: client) => {
      if (row.firstName.toLowerCase().includes(searchedVal.toLowerCase())) {
        return row.firstName.toLowerCase().includes(searchedVal.toLowerCase());
      }else if (row.lastName.toLowerCase().includes(searchedVal.toLowerCase())) {
        return row.lastName.toLowerCase().includes(searchedVal.toLowerCase());
      }else if (row.middleName.toLowerCase().includes(searchedVal.toLowerCase())) {
        return row.middleName.toLowerCase().includes(searchedVal.toLowerCase());
      } else if (row.passBookNumber.toString().includes(searchedVal)) {
        return row.passBookNumber.toString().includes(searchedVal);
      } else if (row.phoneNumber.toString().includes(searchedVal)) {
        return row.phoneNumber.toString().includes(searchedVal);
      }
    });
    props.setRows(filteredRows);
  };

  const navigate = useNavigate();

  const handleOnChange = (e: any) => {
    requestSearch(e.target.value);
    setSearched(e.target.value);
  };

  const navigateToAccount = (id: any) => {
    localStorage.setItem("client", id);
    navigate("/Member/detail/");
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Container className=" bg-yellow-100  mt-32 pl-40 ml-44 pl-60 pb-20 rounded-lg drop-shadow-lg min-h-screen">
        <Breadcrumbs className="p-5 color: rgb(0 0 0)" aria-label="breadcrumb">
          <Link
            color="black"
            to="/"
            className=" hover:underline color: rgb(0 0 0)"
          >
            <Typography className="text-black">Home</Typography>
          </Link>
          <Typography className="text-black">Members List</Typography>
        </Breadcrumbs>
        <h1 className="text-4xl font-bold pt-5 color: rgb(0 0 0)">
          Members List
        </h1>

        <div className="flex flex-row">
          <input
            value={searched}
            onChange={(e) => handleOnChange(e)}
            className="flex flex-col my-5 placeholder:italic placeholder:text-slate-400 bg-white border border-slate-300 rounded-md mx-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-3/5"
            placeholder="Search for Member First Name, Passbook Id or Phone number..."
            type="text"
            name="search"
          />
          <Link to="/Member/Create">
            <button className="flex mx-5 my-5 bg-black hover:bg-red-300 text-white font-bold py-2 px-4 border border-red-700 rounded">
              Create Member <PersonAddAltIcon />
            </button>
          </Link>
        </div>

        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <Table className="min-w-full divide-y divide-gray-200">
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={props.rows.length}
                  />
                  <TableBody className="bg-white divide-y divide-gray-200">
                    {props.rows
                      .slice()
                      .sort(getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((client: any) => (
                        <TableRow
                          className="hover:bg-[#ffab00]/50"
                          key={client.id}
                          onClick={() => navigateToAccount(client.id)}
                        >
                          <ClientRow client={client} />
                        </TableRow>
                      ))}
                  </TableBody>
                  <TableFooter className="bg-gray-100">
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        colSpan={6}
                        count={props.rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: {
                            "aria-label": "rows per page",
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
