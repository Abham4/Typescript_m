import axios from "axios";
import React, { useEffect, useState } from "react";
import { ClientsList } from "./ClientsList";
import { client } from "../pages/types";
import getServices from "../service/get.services";

const Content = () => {
  const [client, setClient] = useState([]);
  const baseURL = "https://localhost:5001/api/Clients";
  var to = localStorage.getItem("AccessToken");
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<client[]>(clients);

  useEffect(() => {
    const getData = async () => {
      getServices.getAllMembers().then(
        (response) => {
          setClients(response.data);
          setRows(response.data);
          setLoading(false)
        },
        (error) => {
          console.log(error.response);
        }
      );
    };
    getData().catch(console.error);
    // return () => { isMounted = false }
  },[]);
  return (
    <>
    <ClientsList clients={clients} rows={rows} setRows={setRows} />
    </>
  );
};

export default Content;
