import React from "react";
import Button from "./Button";
import { GrLinkedinOption } from "react-icons/gr";
import { FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-white">
        <div className="bg-[#7C4EE4] overflow-hidden relative pb-24">
          <img
            src="../../Vector.png"
            alt="vector-image"
            className="absolute right-32 bottom-80 w-3/4 rounded-full md:right-[700px]"
          />
          <h1 className="text-white mt-20 m-10 text-2xl font-raleway font-semibold text-center sm:mx-24 sm:text-3xl sm:font-bold md:mx-60 lg:mx-80 lg:text-5xl">
            Get our stories delivered From us to your inbox weekly.
          </h1>
          <div className="flex justify-center text-center gap-1 px-1 sm:gap-2">
            <input
              type="email"
              placeholder="Your Email"
              className="bg-white rounded-md px-2 sm:px-4 sm:w-60 md:w-80"
            />
            <Button
              text={"Get started"}
              style={
                "ring-1 ring-white cursor-pointer text-white px-3 h-10 py-2 rounded-md flex justify-center text-center sm:px-5"
              }
              navigate={"/"}
            />
          </div>
          <h3 className="text-white text-sm mt-5 mx-5 text-center sm:mx-28 sm:text-md sm:mt-10 md:mx-80 lg:mx-96 ">
            Get a response tomorrow if you submit by 9pm today. If we received
            after 9pm will get a response the following day.
          </h3>
          <img
            src="../../Vector.png"
            alt="vector-image"
            className="absolute right-0 top-80 w-3/4 rounded-full lg:-right-20"
          />
        </div>

        <div className="flex flex-col justify-center text-center pt-10 gap-8 pb-9 border-b-2 border-[#7C4EE4] sm:mx-8 md:mx-14">
          <div className="mx-auto flex" onClick={() => navigate("/")}>
            <img src="/weblogo.png" alt="webLogo" className="object-contain" />
            <div className="flex items-center ml-3">
              <div className="inline-block">
                <h4 className="font-raleway text-sm">Dawn</h4>
                <h4 className="font-roboto text-xs">Dusk</h4>
              </div>
              <h1 className="font-lobster text-4xl text-[#7C4EE4]">2</h1>
            </div>
          </div>

          <div className="flex justify-center text-center font-roboto gap-4 md:gap-8">
            <h1 onClick={() => navigate("/")}>Home</h1>
            <h1 onClick={() => navigate("/blogs")}>Blogs</h1>
            <h1 onClick={() => navigate("/about")}>About</h1>
            <h1 onClick={() => navigate("/contact")}>Contact Us</h1>
          </div>

          <div className="flex justify-center text-center gap-4 md:gap-8">
            <a
              href="https://www.linkedin.com/in/muhammad-hammad-qureshi-2843a5307"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#7C4EE4] p-2 text-white rounded-full text-xl"
            >
              <GrLinkedinOption />
            </a>
            <a
              href="https://github.com/hammadqureshi31?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#7C4EE4] p-2 text-white rounded-full text-xl"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-hammad-qureshi-2843a5307" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#7C4EE4] p-2 text-white rounded-full text-xl"
            >
              <FaFacebook />
            </a>
            <a
              href="https://github.com/hammadqureshi31"  
              rel="noopener noreferrer"
              className="bg-[#7C4EE4] p-2 text-white rounded-full text-xl"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="py-8 text-xs font-raleway text-center">
          <h1>Copyright Dawn2Dusk-Blogs © 2023. All Rights Reserved</h1>
        </div>
      </div>
    </>
  );
};

export default Footer;
