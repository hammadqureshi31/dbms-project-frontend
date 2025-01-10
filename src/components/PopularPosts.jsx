import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { useSelector } from "react-redux";
import Button from "./Button";

const RecentPosts = () => {
  const [posts, setPosts] = useState([]);
  const selector = useSelector((state) => state.blogPosts.data.posts);

  useEffect(() => {
    if (selector && selector.length > 0) {
      setPosts(selector.slice(8, 12));
    } else {
      setPosts([]); // Ensure the state is cleared if there's no data
    }
  }, [selector]);

  return (
    <div className="pt-10">
      <div className="flex justify-between text-center p-1 sm:px-8 sm:py-2 md:px-10">
        <h1 className="text-center text-lg mt-1.5 font-bold font-raleway sm:text-xl md:text-2xl lg:text-3xl">Popular Post</h1>
        <Button
          text={"View All"}
          navigate={`blogs`}
          style={
            " w-32 px-6 py-2.5 bg-[#7C4EE4] text-white text-sm hover:ring-1 hover:ring-[#7C4EE4] cursor-pointer flex justify-center text-center rounded-md hover:bg-white hover:text-[#7C4EE4]"
          }
        />
      </div>

      <div className="flex flex-col gap-2 pt-5 sm:flex-row sm:flex-wrap md:gap-0 justify-start items-start">
        {posts.length > 0 ? (
          posts.map((data) => <PostCard key={data._id} data={data} />)
        ) : (
          <h1>No post found!</h1>
        )}
      </div>
    </div>
  );
};

export default RecentPosts;
