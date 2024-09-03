import axios from "axios";
import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { backendPortURL } from "../config";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { fetchAllPosts } from "../redux/slices/postSlice";
import { ToastContainer, toast } from 'react-toastify';



const CreatePost = () => {
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [content, setContent] = useState();
  const [postImage, setpostImage] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const uploadImageRef = useRef();

  const handleClickOnUpload = () => {
    uploadImageRef.current.click();
  };

  const handleUploadPostImage = (e) => {
    e.preventDefault();
    const postPicture = e.target.files;
    if (!postPicture || postPicture.length === 0) {
      console.error("No file selected or input event is invalid.");
      return;
    }

    const photo = postPicture[0];
    console.log("photo", photo)
    setpostImage(photo);
    // e.target.value = null; // Clear the input value to allow re-selecting the same file
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (
      [title, category, content].some((field) => !field || field.trim() === "")
    ) {
      console.log("All fields are required...");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("content", content);
      if (postImage) {
        formData.append("postImage", postImage);
      }

      axios.defaults.withCredentials = true;
      const postResponse = await axios.post(
        `${backendPortURL}api/post/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("post: ", postResponse);
      dispatch(fetchAllPosts());
      if(postResponse.data){
        navigate(`/blogs/${postResponse.data.post._id}`);
      }

    } catch (error) {
      console.error("Error in creating new post:", error);
      toast.error("Something wrong, All fields required..")
    }
  };

  return (
    <>
      <div className="pt-10 md:pt-4">
        <div className="mx-auto mb-10 py-4 bg-white px-5 flex flex-col justify-center text-center gap-4 max-w-[900px]
        md:rounded-lg md:shadow-md md:shadow-[#999999] md:p-10 md:gap-8">
          <h1 className="text-xl font-roboto font-bold md:text-3xl">Create a post</h1>
          <div className="flex flex-col justify-center text-center gap-4 md:flex-row">
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              className="w-full px-4 py-3 mb-1 bg-transparent rounded-lg focus:outline-none"
            />
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 mb-1 text-black bg-transparent rounded-lg focus:outline-none md:w-60"
            >
              <option value="uncategorized">Select a category</option>
              <option value="development">Development</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
            </select>
          </div>

          <div className="flex flex-col gap-3 border-2 p-3 border-[#7C4EE4]
           border-dotted md:flex-row md:justify-between md:text-center md:p-5">
            <input
              type="file"
              className=""
              ref={uploadImageRef}
              onChange={handleUploadPostImage}
            />
            <button
              type="submit"
              onClick={handleClickOnUpload}
              className="w-full px-4 py-1.5 mt-1 text-sm hover:ring-1 hover:ring-[#7C4EE4] font-raleway 
              font-semibold bg-[#7C4EE4] text-white rounded-md hover:bg-white hover:text-[#7C4EE4] 
              hover:font-semibold focus:outline-none md:w-40"
            >
              Select image
            </button>
          </div>

          <div>
            <ReactQuill
              theme="snow"
              placeholder="Write something..."
              className="h-72 mb-12 select-text"
              required
              onChange={(value) => setContent(value)}
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmitPost}
            className="w-full px-4 py-3 mt-4 text-lg text-white bg-[#7C4EE4] font-roboto rounded-lg hover:ring-2 hover:ring-blue-500 hover:bg-blue-400 hover:font-semibold focus:outline-none"
          >
            Publish
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default CreatePost;
