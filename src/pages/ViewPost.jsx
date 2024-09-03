import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { backendPort } from "../config";
import axios from "axios";
import Comments from "../components/Comments";

const ViewPost = () => {
  const selector = useSelector((state) => state.blogPosts.data);
  const user = useSelector((state) => state.currentUser.data);
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [newComment, setNewComment] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selector && id) {
      const validPost = selector.find((post) => post._id === id);
      if (validPost) {
        setPostData(validPost);
        setLoading(false);
      } else {
        console.log("No post found with the given ID.");
      }
    } else {
      console.log("Post ID or blog data is missing.");
    }
  }, [selector, id]);

  const handleWriteNewComment = async () => {
    try {
      if (commentContent !== "") {
        axios.defaults.withCredentials = true;
        const commentResp = await axios.post(
          `${backendPort}/api/comment/${postData._id}/${user._id}`,
          {
            content: commentContent,
          }
        );
        console.log("resp ", commentResp);
        setNewComment(commentResp.data);
        setCommentContent("");
      }
    } catch (error) {
      console.log("Error in sending comment", error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-[1000px] mx-auto p-4 sm:p-6 lg:p-8">
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-6"></div>
          <div className="h-60 bg-gray-300 rounded-lg mb-6"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-6"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-6"></div>
          <div className="h-32 bg-gray-300 rounded-lg mb-6"></div>
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] bg-white mx-auto mt-2 p-4 sm:p-6 lg:p-8">
      {/* Category and Date */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h3 className="text-lg font-roboto uppercase font-semibold text-[#7C4EE4] mb-2 sm:mb-0">
          {postData.category}
        </h3>
        <p className="text-sm text-gray-500">
          published: {new Date(postData.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Post Title */}
      <h1 className="text-3xl font-bold font-raleway text-gray-800 mb-6">
        {postData.title}
      </h1>

      {/* Post Image */}
      {postData.postImage && (
        <img
          src={`${backendPort}${postData.postImage}`}
          alt={postData.title}
          className="min-w-full max-h-[450px] object-fill rounded-lg mb-6"
        />
      )}

      {/* Post Content */}
      <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-[#333333]">
        <p
          id="blog-post-content"
          dangerouslySetInnerHTML={{ __html: postData.content }}
        ></p>
      </div>

      {/* Write Comment */}
      <div className="mx-auto p-4 mt-10 flex flex-col gap-4">
        <h1 className="font-raleway font-semibold">
          Share your valuable thoughts with us!
        </h1>
        <div>
          {user ? (
            <div>
              <textarea
                placeholder="Write your comments here..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C4EE4] resize-none shadow-sm"
              ></textarea>
              {/* Submit Button */}
              <button
                onClick={handleWriteNewComment}
                className="mt-4 w-full bg-[#7C4EE4] text-white font-semibold py-2 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-[#7C4EE4] focus:ring-opacity-50 transition duration-200"
              >
                Submit
              </button>
            </div>
          ) : (
            <textarea
              disabled
              placeholder="Please log in to write comments"
              className="w-full h-32 p-3 border border-gray-200 bg-gray-100 rounded-lg text-gray-400 cursor-not-allowed resize-none shadow-sm"
            ></textarea>
          )}

          <Comments postId={postData._id} commentRes={newComment}/>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
