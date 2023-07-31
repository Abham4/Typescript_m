import TokenService from "./token.service";
import api from "./api";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { SyntheticEvent } from "react";
const baseUrl = "https://localhost:5001/api/User-Account/Login";

async function login(email: string, password: string, e: SyntheticEvent) {
  e.preventDefault();
  return api
    .post("/User-Account/Login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
}

const logout = () => {
  TokenService.removeUser();
};

const getUserData = () => {
  const user = JSON.parse(localStorage.getItem("user")!);
  const at = user?.token;
  const decodedAt: any = at !== undefined ? jwtDecode(at) : null;
  return decodedAt;
};

const authService = { login, logout, getUserData };
export default authService;
