import { Breadcrumbs, Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import tokenService from "../service/token.service";
import Users from "./Users";

const baseURL = "https://localhost:5001/api/User-Account";

const UsersList = (props: {
  name: string;
  setName: (name: string) => void;
}) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  var to = tokenService.getLocalAccessToken();

  useEffect(() => {
    if (props.name === "") navigate("/Login");
    else {
      axios
        .get(baseURL, {
          headers: {
            Authorization: `Bearer ${to}`,
          },
        })
        .then((res) => {
          setUsers(res.data);
        });
    }
  }, [setUsers]);

  return (
    <Container className="bg-yellow-100 mt-10 mb-20 py-10 rounded-lg drop-shadow-lg min-h-screen">
      <Breadcrumbs className="p-5" aria-label="breadcrumb">
        <Link color="inherit" to="/" className=" hover:underline">
          Home
        </Link>
        <Typography className="text-black">Users List</Typography>
      </Breadcrumbs>

      <h1 className="text-4xl font-bold mb-5">User List</h1>
      <Link to="/Users/CreateUser">
        <button className="btn bg-black hover:bg-yellow-200 hover:text-black text-white font-bold py-2 px-4 border border-red-700 rounded mb-5">
          Create User
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
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      First Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Last Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Phone Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Branch
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user: any) => (
                    <tr key={user.id}>
                      <Users user={user} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UsersList;
