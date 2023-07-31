import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser,FaProductHunt} from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiOutlineLogout, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import Footer from "../Layout/Footer";
import { Button } from "@mui/material";
import '../../../src/App'
import tokenService from "../../service/token.service";
const routes = [
  {
    path: "/",
    name: "Home",
    icon: <FaHome />,
  },

  {
    path: "/Membes",
    name: "Membes",
    icon: <BsFillPeopleFill />,
    subRoutes: [
      {
        path: "/Members",
        name: "Members",
        icon: <BsFillPeopleFill />,
      },
      {
        path: "/Groups",
        name: "Groups",
        icon: <MdMessage />,
      },
      {
        path: "/Branch",
        name: "Branch",
        icon: <BiAnalyse />,
      },
    ],
    
  },

  {
    path: "/Reports",
    name: "Reports",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/convert",
        name: "All Report ",
        icon: <FaUser />,
      },
      {
        path: "/SaveReport",
        name: "Saving ",
        icon: <FaUser />,
      },
      {
        path: "/LoanReports",
        name: "Loans",
        icon: <FaLock />,
      },
      {
        path: "/ShareReports",
        name: "Share",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/Admin",
    name: "Admin",
    icon: <FaUser />,
    exact: true,
    subRoutes: [
      {
        path: "/users",
        name: "Users ",
        icon: <FaUser />,
      },
      {
        path: "/products",
        name: "Product",
        icon: <FaProductHunt />,
      },
      {
        path: "/organization",
        name: "Organization",
        icon: <FaMoneyBill />,
      },
      {
        path: "/system",
        name: "System",
        icon: <FaLock />,
      },
     
    ],
  },
  
  
];

const SideBar = (props:{ children:any,name:string,setName: (name: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate=useNavigate();
  const logout = () => {
    tokenService.removeUser()
    props.setName("")
    props.name = ''
    navigate('/Login')
  }
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      {props.name !== "" ? (
        <motion.div
          animate={{
            width: isOpen ? "250px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section border-t-4 border-[#f7f4f4]">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  {/* <Link to='/' className='navbar-logo' >
        <img className='mt-2 mx-3 w-10 h-10' src={require('../Sidebar/../../res/Logo.png')} />
         <div className="pt-6">Joshua</div> 
        </Link> */}
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          {/* <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div> */}
          {/* <div className="button">
            
            <AnimatePresence>
              {isOpen && (
             <Link to="" onClick={logout}className="a nav-links">Logout</Link>
                // <motion.input
                //   initial="hidden"
                //   animate="show"
                //   exit="hidden"
                //   variants={inputAnimation}
                //   type="text"
                //   placeholder="Search"
                // />
              )}
            </AnimatePresence>
          </div> */}
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                    className="submenu"
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  //  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
          <div className="button">
            <AnimatePresence>
              {isOpen && (
                <div className="logout">
                  <div className="pt-4">
                    {" "}
                    <AiOutlineLogout />
                  </div>
                  <Link to="" onClick={logout} className="text-xl pt-2 pl-2.5">
                    Logout
                  </Link>
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ) : (
        <></>
      )}

      <main className="flex flex-auto ml-48">{props.children}</main>
    </>
  );
};

export default SideBar;
