import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { backendPortURL } from "../config";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';



const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string().required("Strong password is Required").min(6).max(10)
});


const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { email, password } = values;
    console.log("email password", email, password);
  
    try {
      let user = await axios.post(`${backendPortURL}user/login`, { email, password }, { withCredentials: true });
      toast.success("Login Successfull");
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.log("Something went wrong.", error);
      toast.error("Something went wrong, Please try again!")
    }
  };

  // Function to handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      window.location.href = `${backendPortURL}auth/google`; 
    } catch (error) {
      console.error("Google sign-in error", error);
    }
  };

  return (
    <div className="flex flex-col items-center pt-10 min-h-screen px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-raleway font-bold text-center mb-4 text-[#7C4EE4]">
          Dawn 2 Dusk - Blogs
        </h1>
        <p className="text-lg font-roboto text-center mb-6 text-[#999999]">
          Log in to access personalized content and stay updated with the latest insights and exclusive offers!
        </p>
        <div className="rounded-lg shadow-md p-6 bg-white">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 mt-3 mb-1 text-[#7C4EE4] bg-transparent ring-1 ring-[#7C4EE4] rounded-lg focus:outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-400"
                />
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Choose a Password"
                  className="w-full px-4 py-3 mt-3 mb-1 text-[#7C4EE4] bg-transparent ring-1 ring-[#7C4EE4] rounded-lg focus:outline-none"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-400"
                />
                <div className="flex justify-between text-center cursor-pointer text-sm px-2 py-3 text-[#7C4EE4]">
                  <div className="flex gap-1">
                    <input type="checkbox" name="" id="" className="mt-0.5 rounded outline-none focus:outline-none"/>
                    <h4>Remember Me</h4>
                  </div>
                  <h4 onClick={()=>navigate('/user/forgot-password')}>Forgot Password?</h4>
                </div>


                <button
                  type="submit"
                  className="w-full px-4 py-3 mt-2 text-lg text-white bg-[#7C4EE4] rounded-lg hover:ring-2 hover:ring-[#7C4EE4] hover:bg-blue-500 hover:scale-100 hover:font-semibold focus:outline-none"
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>
          <ToastContainer />

          {/* Google Sign-In Button */}
          <div className="mt-6 flex flex-col items-center">
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center w-full justify-center px-4 py-3 text-lg text-[#7C4EE4] bg-white hover:bg-[#f8f8f8] focus:outline-none"
            >
              <FcGoogle className="mr-2" size={24} />
              Sign in with Google
            </button>
          </div>
        </div>

        <div className="mt-2.5 flex justify-center gap-4 text-center">
          <p className="text-[#999999]">Don't have an account?</p>
          <span
            className="text-[#7C4EE4] cursor-pointer"
            onClick={() => navigate("/user/signup")}
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
