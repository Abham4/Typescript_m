import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import "./App.css";
import Navbar from './components/Navbar';
import Accounting from './pages/Accounting';
import Clients from './pages/Clients';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Edit from './pages/Edit';
import './Styles/output.css';
import ProductView from './pages/ProductView';
import Createclient from './components/Createclient';
import axios from 'axios';
import Client from './pages/Client';
import UsersList from './components/UsersList';
import Accounts from './pages/Accounts';
import AccountingTree from './pages/AccountingTree';
import CreateAccounts from './pages/CreateAccounts';
import CreateAddress from './pages/CreateAddress';
import CreateFamily from './pages/CreateFamily';
import Checkcreate from './components/Checkcreate';
import ClientIdentitiy from './pages/ClientIdentitiy';
import CreateProduct from './pages/CreateProduct';
import Footer from './components/Layout/Footer';
import _404 from './pages/_404';
import ViewLoan from './pages/ViewLoan';
import ViewSaving from './pages/ViewSaving';
import ViewSharing from './pages/ViewSharing';

import CreateDocument from './pages/CreateDocument';
import CreateShareProduct from './pages/CreateShareProduct';
import CreateSavingProduct from './pages/CreateSavingProduct';
import CreateLoanProduct from './pages/CreateLoanProduct';
import ProductPreview from './pages/ProductPreview';
import CreateVoucher from './pages/CreateVoucher';
import ScrollToTop from './components/ScrollToTop';
import SideBar from './components/Sidebar/SideBar';
import { Container } from '@mui/material';
import { token } from "./pages/types";
import jwtDecode from 'jwt-decode';
import  Content  from './components/Content';
import Convert from './pages/Convert'
import SaveReports from './pages/SaveReports';

import AllReports from './pages/AllReports';

import Branch from './pages/Branch';
import CreateBranch from './pages/CreateBranch';
import BranchName from './pages/BranchName';
import LoanReports from './pages/LoanReports';
import ShareReports from './pages/ShareReports';
import AllSavingReport from './pages/AllSavingReport';



function App() {

  const [name, setName] = useState('');
  const [rt, setRt] = useState("");
  let memberID = localStorage.getItem('client');
    const user=JSON.parse(localStorage.getItem('user')!);
    const at = user?.token;

  useEffect(() => {
    const token: token =
      at !== undefined
        ? jwtDecode(at)
        : { FirstName: "", LastName: "" };
    setName(token.FirstName + "" + token.LastName);
  }, [])
useEffect(() => {
  const lrt = sessionStorage.getItem("RefreshToken");
  const rtoken: string =
    lrt !== null ? jwtDecode(lrt) :'';
  setRt(rtoken);
}, []);

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Navbar name={name} setName={setName} />
        <SideBar name={name} setName={setName}>
          <Container className="mt-24 ">
            <Routes>
              {at && (
                <Route
                  path="/AllSavingReport"
                  element={<AllSavingReport />}
                ></Route>
              )}
              {at && (
                <Route path="/BranchName" element={<BranchName />}></Route>
              )}
              {at && (
                <Route path="/AllReports" element={<AllReports />}></Route>
              )}
              {at && (
                <Route path="/ShareReports" element={<ShareReports />}></Route>
              )}
              {at && (
                <Route path="/LoanReports" element={<LoanReports />}></Route>
              )}
              {at && (
                <Route path="/SaveReport" element={<SaveReports />}></Route>
              )}
              {at && <Route path="/Content" element={<Content />}></Route>}
              {at && <Route path="/convert" element={<Convert />}></Route>}
              {at && <Route path="/Members" element={<Clients />}></Route>}
              {at && (
                <Route path="/Member/create" element={<Createclient />}></Route>
              )}
              {at && (
                <Route
                  path="/Member/AddAddress"
                  element={<CreateAddress />}
                ></Route>
              )}
              {at && (
                <Route
                  path="/Member/AddFamily"
                  element={<CreateFamily />}
                ></Route>
              )}
              {at && (
                <Route
                  path="/Member/CreateProduct"
                  element={<CreateProduct />}
                ></Route>
              )}
              {at && (
                <Route path="/Member/detail/" element={<Client />}></Route>
              )}
              {at && (
                <Route
                  path="/Member/MemberIdentitiy"
                  element={<ClientIdentitiy />}
                ></Route>
              )}
              {at && (
                <Route
                  path="/Member/Document"
                  element={<CreateDocument client={memberID} />}
                ></Route>
              )}
              {at && (
                <Route
                  path="/Member/Product"
                  element={<ProductPreview />}
                ></Route>
              )}
              {at && (
                <Route
                  path="/Transaction/Create"
                  element={<CreateVoucher />}
                ></Route>
              )}
              {at && <Route path="/Products" element={<ProductView />}></Route>}
              {at && (
                <Route
                  path="/Products/Sharing"
                  element={<ViewSharing />}
                ></Route>
              )}
              {at && (
                <Route path="/Products/Saving" element={<ViewSaving />}></Route>
              )}
              {at && (
                <Route path="/Products/Loan" element={<ViewLoan />}></Route>
              )}
              {at && (
                <Route
                  path="/Products/LoanProduct/Create"
                  element={<CreateLoanProduct />}
                ></Route>
              )}
              {at && (
                <Route
                  path="/Products/SavingProduct/Create"
                  element={<CreateSavingProduct />}
                ></Route>
              )}
              {at && (
                <Route
                  path="/Products/ShareProduct/Create"
                  element={<CreateShareProduct />}
                ></Route>
              )}
              {at && (
                <Route
                  path="/Accounting"
                  element={<Accounting name={name} setName={setName} />}
                ></Route>
              )}
              {at && (
                <Route
                  path="/Accounting/tree"
                  element={<AccountingTree />}
                ></Route>
              )}
              {at && (
                <Route path="/Checkcreate" element={<Checkcreate />}></Route>
              )}
              (
                <Route
                  path="/"
                  element={name === "" ? <Login setName={setName} /> : <Home />}
                ></Route>
              )
              {/* <Route path="/Reports" element={<Reports />}></Route> */}
              {at && (
                <Route path="/Users/CreateUser" element={<Signup />}></Route>
              )}
              {at && (
                <Route
                  path="/Users"
                  element={<UsersList name={name} setName={setName} />}
                ></Route>
              )}
              {at && (
                <Route
                  path="/Branch"
                  element={<Branch name={name} setName={setName} />}
                ></Route>
              )}
              {at && (
                <Route path="/Branch/Create" element={<CreateBranch />}></Route>
              )}
              <Route
                path="/Login"
                element={name === "" ? <Login setName={setName} /> : <Home />}
              ></Route>
              {at && (
                <Route
                  path="/Accounts/Create"
                  element={<CreateAccounts />}
                ></Route>
              )}
              {at && <Route path="/Accounts" element={<Accounts />}></Route>}

             <Route path="*" element={<_404 />}></Route>
            </Routes>
          </Container>
        </SideBar>
      </ScrollToTop>

      {name !== "" ? <Footer /> : <></>}
    </BrowserRouter>
  );
}

export default App;


