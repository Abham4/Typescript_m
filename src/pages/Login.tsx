import { Container } from "@mui/material";
import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { token } from "../pages/types";
import AuthService from "../service/auth.service";

import { useNavigate } from "react-router-dom";
import { Email } from "@mui/icons-material";

export default function Login(props: { setName: (name: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const baseUrl = "https://localhost:5001/api/User-Account/Login";

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    try {
      AuthService.login(email, password, e).then(
        () => {
          window.location.reload(); 
        },
        (error) => {
          console.log("Invalid email or password" + error);
        }
      );
    } catch (er) {
      console.log("Invalid email or password " + er);
    }
  }

  return (
    <>
      <Container className="bg-yellow-100 mt-16">
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mb-24">
          <div className="max-w-md w-full space-y-8">
            <div className="">
              <img
                className="mt-2 mx-[185px] w-20 h-20 text-center"
                src={require("../res/Logo.png")}
                alt="joshua"
              />

              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Log In
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600"></p>
            </div>
            <form
              className="mt-8 space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
            >
              <input
                className="py-5"
                type="hidden"
                name="remember"
                defaultValue="true"
              />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-5  py-3 my-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#000] hover:bg-[#ffbb00] hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}
