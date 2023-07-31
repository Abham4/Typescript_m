import {
  Breadcrumbs,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Savelist from "./Savelist";
import Sharelist from "./Sharelist";
import { product } from "./types";
import tokenService from "../service/token.service";

const ViewSharing = () => {
  const baseURL = "https://localhost:5001/api/Products";

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const to = tokenService.getLocalAccessToken();

  const [rows, setRows] = useState<product[]>(products);
  const [searched, setSearched] = useState<string>("");
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const requestSearch = (searchedVal: string) => {
    const filteredRows = products?.filter((row: product) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  useEffect(() => {
    const cli: any = localStorage.getItem("client");
    setProduct(cli);
    axios
      .get(baseURL, {
        headers: {
          Authorization: `Bearer ${to}`,
        },
      })
      .then((response) => {
        setProducts(response.data);
        setRows(response.data);
      });
  }, []);

  const handleOnChange = (e: any) => {
    requestSearch(e.target.value);
    setSearched(e.target.value);
    e.preventDefualt();
  };

  return (
    <>
      <Container className="bg-yellow-100 mt-10 mb-20 pb-20 rounded-lg drop-shadow-lg">
        <Breadcrumbs className="p-5" aria-label="breadcrumb">
          <Link color="inherit" to="/" className=" hover:underline">
            Home
          </Link>
          <Link color="inherit" to="/Products" className=" hover:underline">
            Products
          </Link>
          <Typography className="text-black">Sharing Products List</Typography>
        </Breadcrumbs>
        <h1 className="text-4xl font-bold pt-5 text-gray-400"> </h1>

        <div className="flex flex-row ">
          <input
            onChange={(e) => handleOnChange(e)}
            className="flex flex-col my-5 placeholder:italic placeholder:text-slate-400 bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-3/5"
            type="text"
            name="search"
          />
          <div className="float-right">
            <Link to="/Products/ShareProduct/Create">
              <button className="mx-5 my-5 bg-[#000] hover:bg-[#ffbb00] hover:text-black text-white font-bold py-2 px-4 border border-blue-700 rounded">
                Create Sharing Product{" "}
              </button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col">
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
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Share Name
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Product Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Original Loan
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Loan Balance
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount Paid
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rows.map((share: any) => (
                      <tr key={share.id}>
                        {share.productType.toLowerCase() === "sharing" ? (
                          <Sharelist share={share} />
                        ) : (
                          <></>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
export default ViewSharing;
