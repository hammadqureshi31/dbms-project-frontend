import React, { useEffect, useState } from "react";
import { backendPort } from "../config";
import { useNavigate } from "react-router-dom";

const PostCard = ({ data }) => {
  const [postData, setPostData] = useState(data);
  const [excerpt, setExcerpt] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (postData) {
      extractFirstParagraph(postData.content);
      setLoading(false);
    }
  }, [postData]);

  const extractFirstParagraph = (content) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    const firstParagraph = tempDiv.innerHTML || "";
    const truncatedText =
      firstParagraph.length > 200
        ? firstParagraph.slice(6, 200) + "..."
        : firstParagraph;

    setExcerpt(truncatedText);
  };

  return (
    <div
      onClick={() => navigate(`/blogs/${postData?._id}`)}
      className="w-[300px] max-w-[340px] mx-auto p-5 mb-5 cursor-pointer md:mb-10 bg-white rounded-xl flex flex-col gap-4 md:max-w-[320px] group"
    >
      {/* Skeleton Loading State */}
      {loading ? (
        <div className="animate-pulse flex flex-col gap-4">
          <div className="relative h-60 bg-gray-300 rounded-lg"></div>
          <div className="h-5 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded w-full"></div>
          <div className="h-3 bg-gray-300 rounded w-full"></div>
          <div className="h-3 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </div>
      ) : (
        <>
          {/* Post Image */}
          {postData?.postImage && (
            <div className="relative">
              <img
                src={`${backendPort}${postData.postImage}`}
                alt={postData.title}
                className="w-full h-60 object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
              <div
                className="absolute w-full inset-0 font-roboto flex items-center justify-center text-white text-sm font-bold opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 backdrop-blur-sm bg-white/20 rounded-lg"
              >
                Read more...
              </div>
            </div>
          )}

          {/* Post Details */}
          <div className="flex gap-5 items-center text-gray-600 text-sm">
            <span className="font-medium text-[#7C4EE4] font-roboto uppercase">
              {postData.category}
            </span>
            <span>{new Date(postData.createdAt).toLocaleDateString()}</span>
          </div>

          {/* Post Title */}
          <h1 className="text-2xl font-bold text-[#333333] font-raleway">
            {postData.title.slice(0, 35) + "..."}
          </h1>

          {/* Post Excerpt */}
          <p className="text-justify text-sm text-[#999999] font-roboto">
            {excerpt}
          </p>

          <button className="text-[#7C4EE4] text-sm text-left underline font-semibold">
            Read more...
          </button>
        </>
      )}
    </div>
  );
};

export default PostCard;
