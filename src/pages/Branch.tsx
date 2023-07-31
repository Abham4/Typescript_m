import { Breadcrumbs, Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BranchList from "../components/BranchList";
import tokenService from "../service/token.service";

const Branch = (props: {name: string; setName: (name: string) => void; }) => {

    const baseURL = "https://localhost:5001/api/Branch";

    const [branches, setBranches] = useState([]);
    const navigate = useNavigate();

    var to = tokenService.getLocalAccessToken();

    useEffect(() => {
        if (props.name === "") 
        navigate("/Login");
        else {
        axios
            .get(baseURL, {
            headers: {
                Authorization: `Bearer ${to}`,
            },
            })
            .then((res) => {
                setBranches(res.data);
            });
        }
    });

    return (
        <Container className="bg-yellow-100 mt-10 mb-20 py-10 rounded-lg drop-shadow-lg min-h-screen">
            <Breadcrumbs className="p-5" aria-label="breadcrumb">
                <Link color="inherit" to="/" className=" hover:underline">
                Home
                </Link>
                <Typography className="text-black">Branch List</Typography>
            </Breadcrumbs>
            <h1 className="text-4xl font-bold mb-5">Branch List</h1>
            <Link to="/Branch/Create">
                <button className="btn bg-black hover:bg-yellow-200 hover:text-black text-white font-bold py-2 px-4 border border-red-700 rounded mb-5">
                Create Branch
                </button>
            </Link>
            <hr />
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                            >
                            Name
                            </th>
                            <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                            >
                            Address
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {branches.map((branch: any) => (
                            <tr key={branch.id}>
                            <BranchList branch={branch} />
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
            </div>
        </Container>
    )
}

export default Branch