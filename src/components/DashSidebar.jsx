import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineInsertComment } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { VscSignOut } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";
import { GoSidebarCollapse } from "react-icons/go";
import { backendPortURL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdOutlinePostAdd } from "react-icons/md";



const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [user, setUser] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const selector = useSelector((state) => state.currentUser.data);
  const navigate = useNavigate()

  useEffect(() => {
    setUser(selector);
  }, [selector]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const container = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const handleClick = () => {
    setShowSidebar(false);
  };

  const handleSignOutUser = async (e)=>{
    e.preventDefault();

    axios.defaults.withCredentials = true;
    const resp = await axios.post(`${backendPortURL}user/signout`)

    console.log("resp on signout", resp)
    navigate('/')
  }

  return (
    <>
      <div className="">
        {/* Toggle button for sidebar */}
        {user && user.isAdmin && (
          <div
            className="flex gap-1 m-4 px-4 py-2 relative  bg-[#7C4EE4] rounded-md w-fit text-white sm:hidden"
            onClick={() => setShowSidebar((prev) => !prev)}
          >
            <span className="mt-0.5">
              {" "}
              <GoSidebarCollapse />
            </span>
            <span className="text-sm">{showSidebar ? "Close" : "Open"}</span>
          </div>
        )}

        {/* Sidebar in mobile screen*/}
        {showSidebar && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={container}
            className="bg-white rounded-sm max-w-4/6 absolute z-20 text-black ring-1 ring-[#7C4EE4] font-raleway text-lg px-5
            py-5 left-0 flex text-start justify-start flex-col gap-10 sm:hidden"
          >
            {user && user.isAdmin && (
              <Link to="/user/dashboard?tab=dash" onClick={() => handleClick()}>
                <motion.h1
                  variants={item}
                  className={`flex gap-3 ${
                    tab === "dash" || !tab ? "text-[#7C4EE4]" : "text-black"
                  }`}
                >
                  <MdDashboard className="mt-1" />
                  <span>Dashboard</span>
                </motion.h1>
              </Link>
            )}
            <Link
              to="/user/dashboard?tab=profile"
              onClick={() => handleClick()}
            >
              <motion.h1
                variants={item}
                className={`flex gap-3 ${
                  tab === "profile" ? "text-[#7C4EE4]" : "text-black"
                }`}
              >
                <CgProfile className="mt-1" />
                <span>Profile</span>
              </motion.h1>
            </Link>
            {user && user.isAdmin && (
              <>
                <Link
                  to="/api/post/create"
                  onClick={() => handleClick()}
                >
                  <motion.h1
                    variants={item}
                    className={`flex gap-3`}
                  >
                    <MdOutlinePostAdd className="mt-1" />
                    <span>Create Post</span>
                  </motion.h1>
                </Link>

                <Link
                  to="/user/dashboard?tab=posts"
                  onClick={() => handleClick()}
                >
                  <motion.h1
                    variants={item}
                    className={`flex gap-3 ${
                      tab === "posts" ? "text-[#7C4EE4]" : "text-black"
                    }`}
                  >
                    <IoDocumentTextOutline className="mt-1" />
                    <span>Posts</span>
                  </motion.h1>
                </Link>

                <Link
                  to="/user/dashboard?tab=comments"
                  onClick={() => handleClick()}
                >
                  <motion.h1
                    variants={item}
                    className={`flex gap-3 ${
                      tab === "comments" ? "text-[#7C4EE4]" : "text-black"
                    }`}
                  >
                    <MdOutlineInsertComment className="mt-1" />
                    <span>Comments</span>
                  </motion.h1>
                </Link>
                <Link
                  to="/user/dashboard?tab=users"
                  onClick={() => handleClick()}
                >
                  <motion.h1
                    variants={item}
                    className={`flex gap-3 ${
                      tab === "users" ? "text-[#7C4EE4]" : "text-black"
                    }`}
                  >
                    <FaUsers className="mt-1" />
                    <span>Users</span>
                  </motion.h1>
                </Link>
              </>
            )}
            <motion.h1 variants={item} onClick={handleSignOutUser}
            className="flex gap-3 cursor-pointer">
              <VscSignOut className="mt-1" />
              <span>Sign Out</span>
            </motion.h1>
          </motion.div>
        )}

        {/* Sidebar for larger screens */}
        <div className="sm:bg-gray-100 sm:h-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={container}
            className="hidden sm:flex flex-col sm:w-64 text-xl font-roboto sm:bg-gray-100 sm:pl-10 sm:py-14 gap-12"
          >
            {user && user.isAdmin && (
              <Link to="/user/dashboard?tab=dash">
                <motion.h1
                  variants={item}
                  className={`flex gap-3 hover:text-[#7C4EE4] hover:cursor-pointer hover:font-semibold ${
                    tab === "dash" || !tab ? "text-[#7C4EE4]" : "text-black"
                  }`}
                >
                  <MdDashboard className="mt-1" />
                  <span>Dashboard</span>
                </motion.h1>
              </Link>
            )}
            <Link to="/user/dashboard?tab=profile">
              <motion.h1
                variants={item}
                className={`flex gap-3 hover:text-[#7C4EE4] hover:cursor-pointer hover:font-semibold ${
                  tab === "profile" ? "text-[#7C4EE4]" : "text-black"
                }`}
              >
                <CgProfile className="mt-1" />
                <span>Profile</span>
              </motion.h1>
            </Link>
            {user && user.isAdmin && (
              <>
                <Link to="/api/post/create">
                  <motion.h1
                    variants={item}
                    className={`flex gap-3 hover:text-[#7C4EE4] hover:cursor-pointer hover:font-semibold`}
                  >
                    <MdOutlinePostAdd className="mt-1" />
                    <span>Create Post</span>
                  </motion.h1>
                </Link>

                <Link to="/user/dashboard?tab=posts">
                  <motion.h1
                    variants={item}
                    className={`flex gap-3 hover:text-[#7C4EE4] hover:cursor-pointer hover:font-semibold ${
                      tab === "posts" ? "text-[#7C4EE4]" : "text-black"
                    }`}
                  >
                    <IoDocumentTextOutline className="mt-1" />
                    <span>Posts</span>
                  </motion.h1>
                </Link>

                <Link to="/user/dashboard?tab=comments">
                  <motion.h1
                    variants={item}
                    className={`flex gap-3 hover:text-[#7C4EE4] hover:cursor-pointer hover:font-semibold ${
                      tab === "comments" ? "text-[#7C4EE4]" : "text-black"
                    }`}
                  >
                    <MdOutlineInsertComment className="mt-1" />
                    <span>Comments</span>
                  </motion.h1>
                </Link>
                <Link to="/user/dashboard?tab=users">
                  <motion.h1
                    variants={item}
                    className={`flex gap-3 hover:text-[#7C4EE4] hover:cursor-pointer hover:font-semibold ${
                      tab === "users" ? "text-[#7C4EE4]" : "text-black"
                    }`}
                  >
                    <FaUsers className="mt-1" />
                    <span>Users</span>
                  </motion.h1>
                </Link>
              </>
            )}
            <motion.h1
              variants={item} onClick={handleSignOutUser}
              className="flex gap-3 hover:text-[#7C4EE4] hover:cursor-pointer hover:font-semibold cursor-pointer"
            >
              <VscSignOut className="mt-1" />
              <span>Sign Out</span>
            </motion.h1>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default DashSidebar;
