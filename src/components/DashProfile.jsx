import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { backendPort, backendPortURL } from "../config";
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import { useNavigate } from "react-router";
import { Modal, Table, Button } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { ToastContainer, toast } from 'react-toastify';



const DashProfile = () => {
  const selector = useSelector((state) => state.currentUser.data);
  const [user, setUser] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState()
  const [userIdToDeleteAccount, setUserIdToDeleteAccount] = useState();
  

  useEffect(() => {
    if (selector) {
      setUser(selector);
      setUsername(selector.username);
      setEmail(selector.email);
    }
  }, [selector]);

  const fileInputRef = useRef(null);

  const handleClickIcon = () => {
    fileInputRef.current.click();
  };

  const handleChangeProfilePicture = (e) => {
    e.preventDefault();
    console.log("file", e.target.files); // Check if files are logged correctly

    const files = e.target.files;
    if (!files || files.length === 0) {
      console.error("No file selected or input event is invalid.");
      return;
    }

    const file = files[0];
    setProfilePicture(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      ![username, email, password].every(
        (field) => field && field.trim() !== ""
      )
    ) {
      console.log("All fields required...");
      toast.error("All fields required...")
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);

      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      axios.defaults.withCredentials = true;
      const updatedUser = await axios.post(
        `${backendPortURL}user/update/${selector._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Update", updatedUser.data);
    } catch (error) {
      console.error("Error in updating profile:", error);
    }
  };

  const handleDeleteAccount = async (e) => {
    axios.defaults.withCredentials = true;
    const response = await axios.delete(
      `${backendPortURL}user/delete/${selector._id}`
    );
    console.log("delete res", response);
    navigate("/");
  };

  const handleSignOutUser = async (e) => {
    e.preventDefault();

    axios.defaults.withCredentials = true;
    const resp = await axios.post(`${backendPortURL}user/signout`);

    console.log("resp on signout", resp);
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-center text-center mt-4">
        <div className="mx-auto rounded-lg shadow-md p-6 flex flex-col justify-center text-center gap-3 md:w-[400px]">
          <div className="relative">
            {user && user.profilePicture && (
              <img
                className="mx-auto rounded-full h-40 w-40 ring-8 ring-gray-300"
                src={`${backendPort}${user.profilePicture}`}
                alt=""
              />
            )}
            {user && !user.profilePicture && (
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                onClick={() => setShowProfile((prev) => !prev)}
                alt="Profile"
                className="mx-auto rounded-full h-40 w-40 ring-8 ring-gray-300"
              />
            )}
            <div className="absolute bottom-2 p-2 bg-blue-400 text-white rounded-full right-3 cursor-pointer text-2xl md:right-20 md:bottom-1">
              <CiImageOn
                className="cursor-pointer text-2xl"
                onClick={handleClickIcon}
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleChangeProfilePicture} // Use onChange here
                style={{ display: "none" }} // Hide the input element
              />
            </div>
          </div>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 mb-1 text-[#7C4EE4] bg-transparent rounded-lg focus:outline-none"
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 mb-1 text-[#7C4EE4] bg-transparent rounded-lg focus:outline-none"
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 mb-1 text-[#7C4EE4] bg-transparent rounded-lg focus:outline-none"
          />
          <button
            type="submit"
            onClick={handleFormSubmit}
            className="w-full px-4 py-3 mt-2 text-lg text-white bg-[#7C4EE4] rounded-lg hover:ring-2 hover:ring-[#7C4EE4] hover:bg-blue-500 hover:font-semibold focus:outline-none"
          >
            Update
          </button>

          <ToastContainer />

          {user && user.isAdmin && (
            <button
              type="submit"
              onClick={() => navigate("/api/post/create")}
              className="w-full px-4 py-3 mt-1 text-lg ring-1 ring-[#7C4EE4] font-raleway font-semibold text-[#7C4EE4] bg-white rounded-lg hover:bg-blue-500 hover:text-white hover:font-semibold focus:outline-none"
            >
              Create Post
            </button>
          )}
          <div className="flex justify-between text-center w-full mt-2 text-sm">
            <h4
              onClick={()=>{
                setShowModal(true);
                setUserIdToDeleteAccount(selector._id)
              }}
              className="hover:text-[#7C4EE4] hover:underline"
            >
              Delete account
            </h4>
            <h4
              onClick={handleSignOutUser}
              className="hover:text-[#7C4EE4] hover:underline"
            >
              Sign out
            </h4>
          </div>
        </div>

        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure you want to delete account?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  color="failure"
                  onClick={() => {
                    handleDeleteAccount();
                    setShowModal(false);
                  }}
                >
                  Yes, I'm sure
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default DashProfile;
