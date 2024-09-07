import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { backendPortURL } from "../config";
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import { useNavigate } from "react-router";
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import { uploadImage } from '../firebase/firebase';
import { Spinner } from 'flowbite-react';

const DashProfile = () => {
  const selector = useSelector((state) => state.currentUser.data);
  const [user, setUser] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [userIdToDeleteAccount, setUserIdToDeleteAccount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selector) {
      setUser(selector);
      setUsername(selector.username);
      setEmail(selector.email);
      setImagePreview(selector.profilePicture);
    }
  }, [selector]);

  const handleClickIcon = () => {
    fileInputRef.current.click();
  };

  const handleChangeProfilePicture = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected.");
      return;
    }
    setProfilePicture(file);
    setImagePreview(URL.createObjectURL(file));
  
    try {
      const downloadURL = await uploadImage(file);
      if (downloadURL) {
        console.log(downloadURL);
        setImageURL(downloadURL);
      }
    } catch (err) {
      toast.error("An error occurred during the image upload.");
      console.error("Image upload error:", err);
    }
  };
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (![username, email, password].every((field) => field.trim() !== "")) {
      toast.error("All fields required...");
      return;
    }

    if (!imageURL) {
      toast.info("Please wait for the image to finish uploading.");
      console.log(imageURL)
      return;
    }

    try {
      setUpdateLoading(true);
      axios.defaults.withCredentials = true;
      const updatedUser = await axios.post(
        `${backendPortURL}user/update/${selector._id}`,
        {
          username,
          email,
          password,
          profilePicture: imageURL || user.profilePicture,
        }
      );

      toast.success("Profile updated successfully.");
      setUpdateLoading(false);
      console.log("Update", updatedUser.data);
    } catch (error) {
      toast.error("Error in updating profile.");
      console.error("Error in updating profile:", error);
    }
  };

  const handleDeleteAccount = async (userId) => {
    try {
      axios.defaults.withCredentials = true;
      await axios.delete(`${backendPortURL}user/delete/${userId}`);
      toast.success("Account deleted successfully.");
      navigate("/");
    } catch (error) {
      toast.error("Error in deleting account.");
      console.error("Error in deleting account:", error);
    }
  };

  const handleSignOutUser = async (e) => {
    e.preventDefault();

    try {
      axios.defaults.withCredentials = true;
      await axios.post(`${backendPortURL}user/signout`);
      navigate("/");
    } catch (error) {
      toast.error("Error signing out.");
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center text-center">
        <div className="mx-auto rounded-lg shadow-md p-6 bg-white flex flex-col justify-center text-center gap-3 md:w-[400px]">
          <div className="relative">
            <img
              className="mx-auto rounded-full h-40 w-40 ring-8 ring-gray-300"
              src={imagePreview || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
              alt="Profile"
            />
            <div className="absolute bottom-2 p-2 bg-blue-400 text-white rounded-full right-3 cursor-pointer text-2xl md:right-20 md:bottom-1">
              <CiImageOn
                className="cursor-pointer text-2xl"
                onClick={handleClickIcon}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleChangeProfilePicture}
                style={{ display: "none" }}
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
            { updateLoading ? <Spinner /> : 'Update'}
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
              onClick={() => {
                setShowModal(true);
                setUserIdToDeleteAccount(selector._id);
              }}
              className="hover:text-[#7C4EE4] hover:underline cursor-pointer"
            >
              Delete account
            </h4>
            <h4
              onClick={handleSignOutUser}
              className="hover:text-[#7C4EE4] hover:underline cursor-pointer"
            >
              Sign out
            </h4>
          </div>
        </div>

        <Modal
          show={showModal}
          size="md"
          popup={true}
          onClose={() => setShowModal(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle
                className="mx-auto mb-4 h-14 w-14 text-gray-400"
                aria-hidden="true"
              />
              <h3 className="mb-5 text-lg font-normal text-gray-500">
                Are you sure you want to delete this account?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  color="failure"
                  onClick={() => {
                    handleDeleteAccount(userIdToDeleteAccount);
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
