import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "./Button";
import { backendPort } from "../config";

const LandingComp = () => {
  const selector = useSelector((state) => state.blogPosts.data.posts);
  const [aiPost, setAiPost] = useState(null);
  const [vrPost, setVrPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selector && selector.length > 0) {
      setAiPost(selector[0]);
      setVrPost(selector[1]);
      setLoading(false);
    }
  }, [selector]);

  return (
    <div>
      {/* Ai post */}
      <div
        className="bg-[#7C4EE4] overflow-hidden py-8 px-5 text-white flex flex-col gap-4 
      sm:flex-row sm:py-20 sm:gap-5 md:px-20 md:pb-20 relative"
      >
        <img
            src="../../Vector.png"
            alt=""
            className="hidden sm:inline-block sm:absolute sm:-left-48 sm:-top-56 sm:rounded-full md:-left-20"
          />
        {loading ? (
          <div className="animate-pulse flex flex-col gap-4 justify-start text-left md:pt-10 md:gap-8 md:w-[900px]">
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>
            <div className="h-16 bg-gray-300 rounded w-3/4"></div>
            <div className="h-6 bg-gray-300 rounded w-2/3"></div>
            <div className="h-12 bg-gray-300 rounded w-1/4"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 justify-start text-left md:pt-10 md:gap-8 md:w-[900px]">
            <h3 className="font-roboto text-xs">Featured Post</h3>
            <h1 className="font-raleway text-3xl font-bold tracking-wide md:text-5xl md:pr-40">
              {aiPost.title}
            </h1>
            <p className="font-raleway text-sm font-extralight md:pr-52 md:text-sm">
              {aiPost.content.slice(3, 200)}
            </p>
            <Button
              text={"Read more"}
              navigate={`blogs/${aiPost?._id}`}
              style={
                " w-32 px-6 py-2.5 text-sm mt-5 cursor-pointer flex justify-center text-center rounded-md bg-white text-[#7C4EE4] hover:ring-2 hover:font-semibold hover:text-md hover:scale-105"
              }
            />
          </div>
        )}
        {loading ? (
          <div className="animate-pulse bg-gray-300 w-full sm:w-80 md:w-[800px] md:h-[450px] rounded"></div>
        ) : (
          <img
            src={`${aiPost?.postImage}`}
            alt=""
            className="sm:w-80 md:w-[800px] md:h-[450px] object-fill z-20"
          />
        )}
        <img
            src="../../Vector.png"
            alt=""
            className="hidden sm:inline-block sm:absolute sm:-right-48 sm:z-10 sm:-bottom-56 sm:rounded-full md:-right-20"
          />
      </div>

      {/* VR post */}
      <div className="w-full p-4 flex flex-col justify-start text-start sm:h-[520px] md:h-[850px]">
        <div
          className="flex flex-col justify-start text-start p-4 ring-1
           ring-gray-200 rounded-md relative sm:ring-0 md:px-10"
        >
          {loading ? (
            <div className="animate-pulse h-96 bg-gray-300 rounded w-full"></div>
          ) : (
            <img src={`${vrPost?.postImage}`} alt="" />
          )}
          <div
            className="flex flex-col flex-wrap text-wrap gap-4 py-5 sm:absolute bg-white sm:w-[540px] sm:px-5 sm:rounded-md 
            sm:-bottom-24 sm:right-4 sm:gap-2 md:right-10 lg:right-11 lg:-bottom-44 lg:w-[940px]
             lg:pr-14 lg:gap-8"
          >
            {loading ? (
              <>
                <div className="animate-pulse h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="animate-pulse h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="animate-pulse h-6 bg-gray-300 rounded w-2/3"></div>
                <div className="animate-pulse h-12 bg-gray-300 rounded w-1/4"></div>
              </>
            ) : (
              <>
                <div className="flex text-xs gap-4 font-roboto">
                  <h4 className="uppercase tracking-wide font-semibold text-[#7C4EE4]">
                    {vrPost?.category}
                  </h4>
                  <h4>
                    published:{" "}
                    {new Date(vrPost?.createdAt).toLocaleDateString()}
                  </h4>
                </div>
                <h1 className="font-raleway font-bold text-xl opacity-85 md:text-4xl">
                  {vrPost?.title}
                </h1>
                <p className="font-roboto text-xs opacity-55 lg:w-3/4 lg:text-lg">
                  {vrPost?.content.slice(3, 300) + "..."}
                </p>
                <Button
                  text={"Read more"}
                  navigate={`blogs/${vrPost?._id}`}
                  style={
                    " w-32 px-6 py-2.5 text-sm mt-4 ring-1 ring-[#7C4EE4] cursor-pointer flex justify-center text-center rounded-md bg-white text-[#7C4EE4] hover:bg-[#7C4EE4] hover:text-white hover:scale-105"
                  }
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingComp;
