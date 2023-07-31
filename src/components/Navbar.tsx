import React, { useState } from "react";
import "./Navbar.css";
import jwtDecode from "jwt-decode";
import { token } from "../pages/types";
import tokenService from "../service/token.service";

function Nav(props: { name: string; setName: (name: string) => void }) {
  const at = tokenService.getLocalAccessToken();
  const x: token =
    at !== undefined ? jwtDecode(at) : { FirstName: "", LastName: "" };
  return (
    <div className="Navbar">
      <div className="leftside">
        <div className="logo">
          <img
            className="imgsize  border-4 border-[#f0e053] rounded-full  "
            src={require("../res/Loogo.jpg")}
          ></img>
        </div>
        <div className="title">
          Joshua Saving and Creadit Cooperative Society With Limitted Liability
        </div>
        <div className="shorttitle">JMPCSLL</div>
      </div>
      {props.name === "" ? (
        <></>
      ) : (
        <div className="rightside">
          <div className="name">hi {props.name}</div>
          <img
            className="imgname border-4 border-[#f0e053] rounded-full "
            src={
              x.PicURL === "No Image"
                ? require("../res/profile.png")
                : "https://localhost:5001/" + x.PicURL
            }
          ></img>
        </div>
      )}
    </div>
  );
}

export default Nav;
