import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { branch } from "./types";

export default function Signcheck({
  handlePhoneChange,
  handlePhoneValidation,
  phoneValue,
  handlePasswordValidation,
  handlePasswordChange,
  passwordValue,
  confirmPasswordValue,
  confirmPasswordError,
  passwordError,
  phoneError,
}: any) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [branchid, setBranchId] = useState(0);
  const [branchList, setBranchList] = useState<branch[]>();
  const img = '/res/Logo.png'
  const [image, setImage] = useState({
    img: img
  })

  // const [ password, setPassword ] = useState('');

  const navigate = useNavigate();
  const baseUrl = "https://localhost:5001/api/User-Account/Register-Admin";
  const baseUrl2 = "https://localhost:5001/api/Branch";
  const to = localStorage.getItem("AccessToken");

  useEffect(() => {
    const getBranch = async () => {
      await axios({
        method: "get",
        url: baseUrl2,
        headers: { Authorization: `Bearer ${to}` },
      }).then((response) => {
        setBranchList(response.data);
      });
    };
    getBranch();
  }, []);

  const sub = async (e: SyntheticEvent) => {
    e.preventDefault();
    const udata = new FormData()
    udata.append('firstName', fname)
    udata.append('lastName', lname)
    udata.append('email', email)
    udata.append('branchId', branchid.toString())
    udata.append('phoneNumber', phoneValue)
    udata.append('password', passwordValue)
    udata.append('img', image.img)
    await axios
      .post(baseUrl, udata)
      .then(() => {
        navigate("/Users")
      })
      .catch((er) => {
        console.log("Jab " + er);
      });
  };
  const change = (e: any) => {
    if(e.target.files && e.target.files[0])
    {
      let img = e.target.files[0]
      setImage({
        img
      })
    }
  }
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create User
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600"></p>
          </div>
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={sub}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  First Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 my-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="First name "
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="name" className="sr-only">
                  Last Name
                </label>
                <input
                  id="Lname"
                  name="Lname"
                  type="Lname"
                  autoComplete="Lname"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 my-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Last name "
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 my-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="img"
                  name="img"
                  type="file"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 my-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  onChange={change}
                />
              </div>
              <div>
                <label htmlFor="name" className="sr-only">
                  Branch
                </label>
                <select
                  name="productId"
                  defaultValue={""}
                  onChange={(e) => setBranchId(parseInt(e.target.value))}
                  className="mt-1 block1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "
                >
                  <option value="" disabled>
                    Choose ...
                  </option>
                  {branchList?.map((b: any) => (
                    <option value={b.id} key={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="name" className="sr-only">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  autoComplete="phone"
                  value={phoneValue}
                  onChange={handlePhoneChange}
                  onKeyUp={handlePhoneValidation}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 my-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Phone number "
                  // onChange={e => setLname(e.target.value)}
                />
                <p className="text-red-500 text-sm">{phoneError}</p>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={passwordValue}
                  onChange={handlePasswordChange}
                  onKeyUp={handlePasswordValidation}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 my-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  // onChange={w => setPassword(w.target.value)}
                />
                <p className="text-red-500 text-sm">{passwordError}</p>
              </div>

              <div>
                <label htmlFor=" confirm-password" className="sr-only">
                  confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPasswordValue}
                  onChange={handlePasswordChange}
                  onKeyUp={handlePasswordValidation}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 my-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  // onChange={w => setPassword(w.target.value)}
                />
                <p className="text-red-500 text-sm">{confirmPasswordError}</p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-500 hover:bg-yellow-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {/* <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" /> */}
                </span>
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
