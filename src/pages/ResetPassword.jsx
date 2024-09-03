import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { backendPortURL } from "../config";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string().required("Strong password is Required").min(6).max(10),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is Required"),
});

const ResetPassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  console.group(id)

  const handleSubmit = async (values) => {
    const { password } = values;

    try {
      await axios.post(`${backendPortURL}user/reset-password/${id}`, { password }, {withCredentials: true});
      toast.success("Password reset successfully");
      setTimeout(() => {
        navigate('/user/login');
      }, 1500);
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
          Enter your new password.
        </p>
        <div className="rounded-lg shadow-md p-6 bg-white">
          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={ResetPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="New Password"
                  className="w-full px-4 py-3 mt-3 mb-1 text-[#7C4EE4] bg-transparent ring-1 ring-[#7C4EE4] rounded-lg focus:outline-none"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-400"
                />
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  className="w-full px-4 py-3 mt-3 mb-1 text-[#7C4EE4] bg-transparent ring-1 ring-[#7C4EE4] rounded-lg focus:outline-none"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-400"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-3 mt-5 text-lg text-white bg-[#7C4EE4] rounded-lg hover:ring-2 hover:ring-[#7C4EE4] hover:bg-blue-500 hover:scale-100 hover:font-semibold focus:outline-none"
                >
                  Reset Password
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

export default ResetPassword;
