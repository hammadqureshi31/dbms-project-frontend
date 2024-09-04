import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import Button from "./Button";
import { CiSearch } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserDetails } from "../redux/slices/userSlice";
import { backendPort, backendPortURL } from "../config";
import axios from "axios";
import { fetchAllPosts } from "../redux/slices/postSlice";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const selector = useSelector((state) => state.currentUser.data);
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  // console.log(selector)

  useEffect(() => {
      dispatch(fetchUserDetails())
      dispatch(fetchAllPosts())
  }, [dispatch])
  
  useEffect(() => {
    setUser(selector);
  }, [selector]);

  const container = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
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

  const handleNavigate = (route) => {
    setToggleMenu(false);
    setShowProfile(false);
    navigate(`/${route}`);
  };

  const handleNavigateUser = () => {
    if (user && !user.isAdmin) {
      navigate("user/dashboard?tab=profile");
      setShowProfile(false);
      setToggleMenu(false);
    } else {
      setShowProfile(false);
      setToggleMenu(false);
      navigate("/user/dashboard?tab=dash");
    }
  };

  const handleSignOutUser = async (e)=>{
    e.preventDefault();

    axios.defaults.withCredentials = true;
    const resp = await axios.post(`${backendPortURL}user/signout`)
    setShowProfile(false)
    console.log("resp on signout", resp)
    dispatch(fetchUserDetails())
    navigate('/')
  }

  

  return (
    <>
      <div className="flex justify-between bg-white pb-4 md:px-12 w-full">
        <div
          className="flex items-center mt-3 ml-5 md:ml-6 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="/weblogo.png" alt="webLogo" />
          <div className="flex items-center ml-3">
            <div className="inline-block">
              <h4 className="font-raleway text-sm">Dawn</h4>
              <h4 className="font-roboto text-xs">Dusk</h4>
            </div>
            <h1 className="font-lobster text-4xl text-[#7C4EE4]">2</h1>
          </div>
        </div>

        <div
          className="mt-4 mr-4 sm:hidden cursor-pointer"
          onClick={() => setToggleMenu((prev) => !prev)}
          aria-expanded={toggleMenu}
        >
          <img src="/Menu.png" alt="Menu" />
        </div>

        <div className="hidden sm:flex sm:justify-evenly gap-6 font-raleway text-sm pt-2 pr-5 md:gap-8">
          <h3 className="mt-4 cursor-pointer hover:text-[#7C4EE4]" onClick={() => handleNavigate("blogs")}>Blogs</h3>
          <h3 className="mt-4 cursor-pointer hover:text-[#7C4EE4]" onClick={() => handleNavigate("about")}>About</h3>
          <h3 className="mt-4 text-lg cursor-pointer hover:text-[#7C4EE4]" onClick={() => handleNavigate("blogs")}>
            <CiSearch />
          </h3>
          <Button
            text={"Contact us"}
            navigate={"contact"}
            style={
              "bg-[#7C4EE4] text-white text-sm mt-2 px-6 h-10 py-2 rounded-md flex justify-center text-center cursor-pointer hover:text-[#7C4EE4] hover:bg-white hover:ring-1 hover:ring-[#7C4EE4]"
            }
          />
          {user && user.profilePicture && (
            <img
              src={`${user.profilePicture}`}
              onClick={() => setShowProfile((prev) => !prev)}
              alt="Profile"
              className="w-10 h-10 rounded-full mt-1.5 cursor-pointer"
            />
          )}
          {user && !user.profilePicture && (<img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            onClick={() => setShowProfile((prev) => !prev)}
            alt="Profile"
            className="w-10 h-10 rounded-full mt-1.5 cursor-pointer"
          />)}

          {!user && <h3 className="mt-4 cursor-pointer hover:text-[#7C4EE4] mr-5" onClick={() => handleNavigate("user/signup")}>Sign up</h3>}
        </div>
      </div>

      {toggleMenu && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="bg-[#7C4EE4] rounded-tr-xl cursor-pointer rounded-bl-xl text-white font-raleway text-lg px-5 py-3 right-0 mt-2 flex flex-col gap-2 sm:hidden"
        >
          <motion.h1 variants={item} onClick={() => handleNavigate("blogs")}>
            Blogs
          </motion.h1>
          <motion.h1 variants={item} onClick={() => handleNavigate("about")}>
            About
          </motion.h1>
          <motion.h1 variants={item} onClick={() => handleNavigate("contact")}>
            Contact
          </motion.h1>
          {
            user ? 
            (<motion.h1 variants={item} onClick={() => handleNavigateUser()}>
            {user && user.isAdmin ? "Dashboard" : "Profile"}
          </motion.h1>)
            :
            (<motion.h1 variants={item} onClick={() => handleNavigate("user/signup")}>
              sign up
          </motion.h1>)
          }
        </motion.div>
      )}

      {showProfile && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="bg-white rounded-sm cursor-pointer text-black ring-1 ring-[#7C4EE4] font-raleway absolute z-30 text-lg px-5 top-[64px] py-3 right-0 mt-2 sm:flex flex-col gap-2"
        >
          <motion.h1 variants={item} className=" lowercase">@{user?.username}</motion.h1>
          <motion.h1 variants={item}>{user.email}</motion.h1>
          <motion.h1 variants={item} className="cursor-pointer hover:text-[#7C4EE4]"
           onClick={()=>handleNavigateUser()}>
            {user && user.isAdmin ? "Dashboard" : "Profile"}
          </motion.h1>
          <motion.h1 variants={item} onClick={handleSignOutUser}
          className="cursor-pointer hover:text-[#7C4EE4]">
            Sign Out
          </motion.h1>
        </motion.div>
      )}
    </>
  );
};

export default Header;
