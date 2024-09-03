import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { backendPortURL } from "../config";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { email } = values;
    
    try {
      await axios.post(`${backendPortURL}user/forgot-password`, { email }, {withCredentials: true});
      toast.success("Password reset link sent to your email");
    } catch (error) {
      console.log("Something went wrong.", error);
      toast.error("Something went wrong, Please try again!")
    }
  };

  return (
    <div className="flex flex-col items-center pt-10 min-h-screen px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-raleway font-bold text-center mb-4 text-[#7C4EE4]">
          Dawn 2 Dusk - Blogs
        </h1>
        <p className="text-lg font-roboto text-center mb-6 text-[#999999]">
          Enter your email to receive a password reset link.
        </p>
        <div className="rounded-lg shadow-md p-6 bg-white">
          <Formik
            initialValues={{ email: "" }}
            validationSchema={ForgotPasswordSchema}
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
                <button
                  type="submit"
                  className="w-full px-4 py-3 mt-5 text-lg text-white bg-[#7C4EE4] rounded-lg hover:ring-2 hover:ring-[#7C4EE4] hover:bg-blue-500 hover:scale-100 hover:font-semibold focus:outline-none"
                >
                  Send Reset Link
                </button>
              </Form>
            )}
          </Formik>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
