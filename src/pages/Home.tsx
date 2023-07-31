import { Typography } from "@mui/material";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import Notification from "../components/Notification";
import { Pie, Bar } from "./../components/Charts";
import getServices from "./../service/get.services";

import "./Home.css";
import { account } from "./types";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [genderData, setGenderData] = useState({});
  const [accountData, setAccountData] = useState({});

  function countGender(gender: any) {
    let male = 0;
    let female = 0;
    gender.forEach((x: string) => {
      if (x.toLowerCase() == "male") {
        male++;
      } else {
        female++;
      }
    });
    return [male, female];
  }

  function countAccount(account: any) {
    let save = 0;
    let share = 2;
    let loan = 1;
    account.forEach((x: string) => {
      if (x.toLowerCase() == "saving") {
        save++;
      } else if (x.toLowerCase() == "sharing") {
        share++;
      } else {
        loan++;
      }
    });
    return [save, share, loan];
  }

  useEffect(() => {
    getServices.getAllMembers().then((ms) => {
      setGenderData({
        labels: ["Male", "Female"],
        datasets: [
          {
            label: "# of Votes",
            data: countGender(ms.data.map((mem: any) => mem.gender)),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
        ],
      });
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getServices.getAllAccounts().then((data) => {
      setAccountData({
        labels: ["Saving", "Sharing", "Loan"],
        datasets: [
          {
            label: "# of accounts",
            data: countAccount(
              data.data.map((acct: account) => acct.accountType)
            ),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
      setLoading2(false);
    });

  }, [])
  
  const data = {
    labels: ["Saving", "Sharing", "Loan"],
    datasets: [
      {
        label: "# of accounts",
        data: [12, 19, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="">
        <div className="i-left ">
          <div className="imga">
            <div className="e">
              {" "}
              <img
                src={require("../pages/image/eag.jpg")}
                className="max-w-[24%] float-left "
              />
            </div>
            <div className="d">
              {" "}
              <img
                src={require("../pages/image/micro.jpg")}
                className=" max-w-[22%] float-left "
              />
            </div>
            <div className="e">
              {" "}
              <img
                src={require("../pages/image/douu.jpg")}
                className="max-w-[27%] float-left "
              />
            </div>
          </div>
        </div>
        <div className="my-60 p-4 border grid grid-cols-3 gap-2">
          <div className="flex items-center">
            {loading2 ? "loading" : <Pie data={accountData} />}
          </div>
          <div className="flex items-center">
            {loading ? "loading" : <Bar data={accountData} />}
          </div>
          <div className="flex items-center">
            {loading ? "loading" : <Pie data={genderData} />}
          </div>
          <div className="flex items-center">
            {loading ? "loading" : <Bar data={genderData} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
