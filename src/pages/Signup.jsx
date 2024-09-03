import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { backendPortURL } from "../config";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string().required("Strong password is Required").min(6).max(10),
  name: Yup.string().required("Username is Required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("user"); 

  const handleSubmit = async (values) => {
    const { name, email, password, file } = values;
    const formData = new FormData();

    formData.append("username", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profilePicture", file);
    formData.append("role", role);

    try {
      const response = await axios.post(`${backendPortURL}user/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/user/login`);
    } catch (error) {
      console.log("Something went wrong.", error);
    }
  };

  return (
    <div className="flex flex-col items-center pt-10 min-h-screen px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-raleway font-bold text-center mb-4 text-[#7C4EE4]">
          Dawn 2 Dusk - Blogs
        </h1>
        <p className="text-lg font-roboto text-center mb-6 text-gray-500">
          Sign up now to unlock exclusive insights and offers tailored just for
          you!
        </p>

        <div className="flex justify-between mb-6">
          <button
            className={`w-full py-2 rounded-l-lg ${
              role === "user" ? "bg-[#7C4EE4] text-white" : "bg-gray-100 text-[#999999]"
            }`}
            onClick={() => setRole("user")}
          >
            Signup as User
          </button>
          <button
            className={`w-full py-2 rounded-r-lg ${
              role === "admin" ? "bg-[#7C4EE4] text-white" : "bg-gray-100 text-[#999999]"
            }`}
            onClick={() => setRole("admin")}
          >
            Signup as Admin
          </button>
        </div>

        <Formik
          initialValues={{ email: "", password: "", name: "" }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                className="w-full px-4 py-3 mb-3 text-[#7C4EE4] bg-transparent ring-1 ring-[#7C4EE4] rounded-lg focus:outline-none"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-400 mb-3"
              />

              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 mb-3 text-[#7C4EE4] bg-transparent ring-1 ring-[#7C4EE4] rounded-lg focus:outline-none"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-400 mb-3"
              />

              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Choose a Password"
                className="w-full px-4 py-3 mb-3 text-[#7C4EE4] bg-transparent ring-1 ring-[#7C4EE4] rounded-lg focus:outline-none"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-400 mb-3"
              />

              <Field
                name="file"
                render={({ field, form }) => (
                  <input
                    type="file"
                    onChange={(event) => {
                      form.setFieldValue(
                        "file",
                        event.currentTarget.files[0]
                      );
                    }}
                    className="w-full px-4 py-2 mb-3 text-gray-500"
                  />
                )}
              />

              <button
                type="submit"
                className="w-full px-4 py-3 mt-2 text-lg text-white bg-[#7C4EE4] rounded-lg hover:ring-2 hover:ring-[#7C4EE4]
                 hover:bg-blue-500 hover:font-semibold focus:outline-none hover:scale-100"
              >
                Sign up
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-4 flex justify-center gap-4 text-center">
          <p className="text-gray-500">Already have an account?</p>
          <span
            className="text-[#7C4EE4] cursor-pointer"
            onClick={() => navigate(`/user/login`)}
          >
            Log In
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
