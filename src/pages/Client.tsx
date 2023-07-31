import {
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Modal,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AccountsList from "../components/AccountsList";
import TabView from "../components/TabView";
import { address, client, purchasedproduct, Document } from "./types";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Link, useNavigate } from "react-router-dom";
import Addresses from "../components/Addresses";
import FamilyMembers from "../components/FamilyMembers";
import useStore from "../Store";
import PurchasedProductsList from "../components/PurchasedProductsList";
import IdentityView from "./IdentityView";
import ViewDocument from "./ViewDocument";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Scrollbars } from "react-custom-scrollbars-2";
import tokenService from "../service/token.service";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Client = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/Edit`;
    navigate(path);
  };
  const baseURL = "https://localhost:5001/api/Clients";
  const baseURL2 = "https://localhost:5001/api/Documents";
  const [client, setClient] = useState<client>();
  const [doc, setDoc] = useState<Document>();
  const [open,setOpen] = useState(false)
  const [value, setValue] = React.useState(0);
const to = tokenService.getLocalAccessToken();
  const { setAccountType, setClientt } = useStore();

  function handleOpen (){
    setOpen(!open)
  }

  // start of functions used for tab

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  // end of functions used for tab

  const navigateToPerchasedProduct = (id: any) => {
    localStorage.setItem("ppId", id);
    navigate("/Member/Product");
  };

  useEffect(() => {
    const setClientData = async () => {
      const cli: any = localStorage.getItem("client");
      await axios
        .get(baseURL + "/" + cli, {
          headers: {
            Authorization: `Bearer ${to}`,
          },
        })
        .then((responce) => {
          setClient(responce.data);
          setClientt(responce.data);
        });
    };
    const setDocumentData = async () => {
      const cli: any = localStorage.getItem("client");
      await axios
        .get(baseURL2 + "/" + cli, {
          headers: {
            Authorization: `Bearer ${to}`,
          },
        })
        .then((responce) => {
          setDoc(responce.data);
        });
    };
    setClientData();
    setDocumentData();
  }, []);
  return (
    <>
      <Container className="bg-yellow-100  mt-28 ml-14 mr-28 pb-20 rounded-lg drop-shadow-lg">
        <Breadcrumbs className=" p-5 text-black" aria-label="breadcrumb">
          <Link color="black" to="/" className=" hover:underline">
            <Typography className="text-black">Home</Typography>
          </Link>
          <Link color="inherit" to="/Members/" className=" hover:underline">
            <Typography className="text-black">Members List</Typography>
          </Link>
          <Typography className="text-black">Member</Typography>
        </Breadcrumbs>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="General" {...a11yProps(0)} />
              <Tab label="Address" {...a11yProps(1)} />
              <Tab label="Family Members " {...a11yProps(2)} />
              <Tab label="Identity " {...a11yProps(3)} />
              <Tab label="Documents " {...a11yProps(4)} />
            </Tabs>
          </Box>

          {/* General tab  */}
          <TabView value={value} index={0}>
            <ButtonGroup>
              <Button>
                <EditIcon />
                Edit
              </Button>
              <Link to="/Member/CreateProduct">
                <Button
                  onClick={() => {
                    setAccountType("Sharing");
                  }}
                >
                  <AddIcon />
                  New Sharing
                </Button>
              </Link>
              <Link to="/Member/CreateProduct">
                <Button
                  onClick={() => {
                    setAccountType("Saving");
                  }}
                >
                  <AddIcon />
                  New Saving
                </Button>
              </Link>
              <Link to="/Member/CreateProduct">
                <Button
                  onClick={() => {
                    setAccountType("Loan");
                  }}
                >
                  <AddIcon />
                  New Loan
                </Button>
              </Link>
            </ButtonGroup>
            <h1 className="text-4xl font-bold pt-5 color: rgb(0 0 0)">
              Members Accounts
            </h1>
            <div className="flex flex-row m-8">
              <div className="basis-3/4">
                {/* sharing Accounts  */}
                <Container className="bg-white m-1 p-3 rounded-lg ">
                  <h1 className="text-xl font-bold pt-1 color: rgb(0 0 0)">
                    Sharing Accounts(
                    {client?.account instanceof Array ? (
                      client?.account?.map((acct) =>
                        acct.accountType === "Sharing" ? (
                          <>{acct.accountNo}</>
                        ) : (
                          <></>
                        )
                      )
                    ) : (
                      <></>
                    )}
                    )
                  </h1>
                  <div className="flex flex-col mr-5 ">
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
                                  Product Name
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                                >
                                  Product Code
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                                >
                                  Original Saving
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                                >
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y color: rgb(0 0 0)">
                              {
                                // this one is type guard
                                client?.account instanceof Array ? (
                                  client?.account?.map((acct) => (
                                    <>
                                      {acct.accountType.toLowerCase() ===
                                      "sharing" ? (
                                        acct.purchasedProducts instanceof
                                        Array ? (
                                          acct.purchasedProducts.map(
                                            (pp: purchasedproduct) => (
                                              <tr
                                                className="hover:bg-[#ffab00]/50"
                                                onClick={() =>
                                                  navigateToPerchasedProduct(
                                                    pp.id
                                                  )
                                                }
                                              >
                                                <PurchasedProductsList
                                                  pp={pp}
                                                />
                                              </tr>
                                            )
                                          )
                                        ) : (
                                          <></>
                                        )
                                      ) : (
                                        <></>
                                      )}
                                    </>
                                  ))
                                ) : (
                                  <tr>
                                    <td>No Entry</td>
                                  </tr>
                                )
                              }
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </Container>

                {/* saving Accounts  */}
                <Container className="bg-white m-1 p-3 rounded-lg ">
                  <h1 className="text-xl font-bold pt-1 color: rgb(0 0 0)">
                    Saving Accounts(
                    {client?.account instanceof Array ? (
                      client?.account?.map((acct) =>
                        acct.accountType === "Saving" ? (
                          <>{acct.accountNo}</>
                        ) : (
                          <></>
                        )
                      )
                    ) : (
                      <></>
                    )}
                    )
                  </h1>
                  <div className="flex flex-col mr-5">
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
                                  Product Name
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                                >
                                  Product Code
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                                >
                                  Current Balance
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                                >
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {
                                // this one is type guard
                                client?.account instanceof Array ? (
                                  client?.account?.map((acct) => (
                                    <>
                                      {acct.accountType.toLowerCase() ===
                                      "saving" ? (
                                        acct.purchasedProducts instanceof
                                        Array ? (
                                          acct.purchasedProducts.map(
                                            (pp: purchasedproduct) => (
                                              <tr
                                                className="hover:bg-[#ffab00]/50"
                                                onClick={() =>
                                                  navigateToPerchasedProduct(
                                                    pp.id
                                                  )
                                                }
                                              >
                                                <PurchasedProductsList
                                                  pp={pp}
                                                />
                                              </tr>
                                            )
                                          )
                                        ) : (
                                          <></>
                                        )
                                      ) : (
                                        <></>
                                      )}
                                    </>
                                  ))
                                ) : (
                                  <tr>
                                    <td>No Entry</td>
                                  </tr>
                                )
                              }
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </Container>

                {/* loan Accounts  */}
                <Container className="bg-white m-1 p-3 rounded-lg ">
                  <h1 className="text-xl font-bold pt-1 color: rgb(0 0 0)">
                    Loan Accounts(
                    {client?.account instanceof Array ? (
                      client?.account?.map((acct) =>
                        acct.accountType === "Loan" ? (
                          <>{acct.accountNo}</>
                        ) : (
                          <></>
                        )
                      )
                    ) : (
                      <></>
                    )}
                    )
                  </h1>
                  <div className="flex flex-col mr-5">
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
                                  Product Name
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                                >
                                  Product Code
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                                >
                                  Original Loan
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                                >
                                  Loan Balance
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                                >
                                  Amount Paid
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium color: rgb(0 0 0) uppercase tracking-wider"
                                >
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {
                                // this one is type guard
                                client?.account instanceof Array ? (
                                  client?.account?.map((acct) => (
                                    <>
                                      {acct.accountType.toLowerCase() ===
                                      "loan" ? (
                                        acct.purchasedProducts instanceof
                                        Array ? (
                                          acct.purchasedProducts.map(
                                            (pp: purchasedproduct) => (
                                              <tr
                                                className="hover:bg-[#ffab00]/50"
                                                onClick={() =>
                                                  navigateToPerchasedProduct(
                                                    pp.id
                                                  )
                                                }
                                              >
                                                <PurchasedProductsList
                                                  pp={pp}
                                                />
                                              </tr>
                                            )
                                          )
                                        ) : (
                                          <></>
                                        )
                                      ) : (
                                        <></>
                                      )}
                                    </>
                                  ))
                                ) : (
                                  <tr>
                                    <td>No Entry</td>
                                  </tr>
                                )
                              }
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </Container>
              </div>
              <div className="basis-1/4 m-2">
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      className="rounded-full p-3"
                      component="img"
                      height="140"
                      image={
                        client?.profileImg === "No Image"
                          ? client.gender === "Male"
                            ? require("../res/male user.png")
                            : require("../res/female user.png")
                          : "https://localhost:5001/" + client?.profileImg
                      }
                      alt="green iguana"
                    />
                    <Tooltip title="show signiture" placement="top-start">
                      <button className="ml-2" onClick={handleOpen}>
                        {" "}
                        <BorderColorIcon />
                      </button>
                    </Tooltip>

                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {client?.firstName +
                          " " +
                          client?.middleName +
                          " " +
                          client?.lastName}
                      </Typography>
                      <div className="flex flex-row">
                        <div className="basis-3/5">
                          <div className="flex flex-col">is staff</div>
                          <div className="flex flex-col">Date Of Birth</div>
                          <div className="flex flex-col">Gender</div>
                          <div className="flex flex-col">Activation Date</div>
                          <div className="flex flex-col">Number of Loans</div>
                          <div className="flex flex-col">Active Savings</div>
                          <div className="flex flex-col">Status</div>
                        </div>
                        <div className="basis-2/5">
                          <div className="flex flex-col">
                            {client?.isStaff.toString()}
                          </div>
                          <div className="flex flex-col">
                            {client?.dob.substr(0, 10)}
                          </div>
                          <div className="flex flex-col">{client?.gender}</div>
                          <div className="flex flex-col">
                            {client?.activation_Date.substr(0, 10)}
                          </div>
                          <div className="flex flex-col">
                            {client?.noOfLoans}
                          </div>
                          <div className="flex flex-col">
                            {client?.activeSavings}
                          </div>
                          <div className="flex flex-col">{client?.status}</div>
                        </div>
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
                <Modal
                  open={open}
                  onClose={handleOpen}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Member's Signiture
                    </Typography>
                    <img src={require("../res/sign.webp")} />
                  </Box>
                </Modal>
              </div>
            </div>
          </TabView>

          {/* Addresses Tab */}
          <TabView value={value} index={1}>
            <Link to="/Member/AddAddress">
              {" "}
              <Button>
                <AddIcon />
                New Address
              </Button>
            </Link>
            <div className="bg-[#dcdcdc]/[.4] grid grid-cols-2 gap-4 p-4">
              <Addresses address={client?.addresses} />
            </div>
          </TabView>

          {/* Families Tab  */}
          <TabView value={value} index={2}>
            <Link to="/Member/AddFamily">
              <Button>
                <AddIcon />
                New Family Members
              </Button>
            </Link>
            <div className="bg-[#dcdcdc]/[.4] grid grid-cols-2 gap-4 p-4">
              <FamilyMembers family={client?.families} />
            </div>
          </TabView>

          {/* Identity Tab  */}
          <TabView value={value} index={3}>
            <Link to="/Member/MemberIdentitiy">
              <Button>
                <AddIcon />
                New Identity
              </Button>
            </Link>
            <div className="bg-[#dcdcdc]/[.4] grid grid-cols-2 gap-4 p-4">
              <IdentityView Identity={client?.identifiers} />
            </div>
          </TabView>

          {/* Upload Tab  */}
          <TabView value={value} index={4}>
            <Link to="/Member/Document">
              <Button>
                <UploadFileIcon />
                Upload Document
              </Button>
            </Link>
            <div className="bg-[#dcdcdc]/[.4] grid grid-cols-2 gap-4 p-4">
              {doc instanceof Array ? (
                doc?.map((d: Document) =>
                  d.objectType === 1 ? (
                    <ViewDocument key={d.id} Document={d} />
                  ) : (
                    <></>
                  )
                )
              ) : (
                <></>
              )}
            </div>
          </TabView>
        </Box>
      </Container>
    </>
  );
};

export default Client;
