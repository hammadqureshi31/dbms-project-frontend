import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";

const Posts = ({ postData }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (postData && postData.length > 0) {
      setPosts(postData);
    } else {
      setPosts([]); // Ensure the state is cleared if there's no data
    }
  }, [postData]);

  return (
    <div className="flex flex-col gap-2 pt-10 sm:flex-row sm:flex-wrap md:gap-0 justify-start items-start">
      {posts.length > 0 ? (
        posts.map((data) => <PostCard key={data._id} data={data} />)
      ) : (
        <h1>No post found!</h1>
      )}
    </div>
  );
};

export default Posts;
