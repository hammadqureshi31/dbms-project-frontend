import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendPort } from "../config";
import { BiLike, BiDislike } from "react-icons/bi";
import { useSelector } from "react-redux";

const Comments = ({ postId, commentRes }) => {
  const [commentAndUser, setCommentAndUser] = useState([]);
  const [loginUser, setLoginUser] = useState(null);
  const [likesDetails, setLikesDetails] = useState({});
  const [dislikeDetails, setDislikeDetails] = useState({})
  const selector = useSelector((state) => state.currentUser.data);

  useEffect(() => {
    const fetchPostComments = async () => {
      setLoginUser(selector || null);

      try {
        const { data } = await axios.get(`${backendPort}/api/comment/${postId}`);
        if (data.comments && data.comments?.length > 0) {
          setCommentAndUser(data.comments.reverse());
        } else {
          setCommentAndUser([]);
        }
      } catch (error) {
        console.log("Error in fetching comments:", error);
      }
    };

    fetchPostComments();
  }, [postId, selector, likesDetails, dislikeDetails, commentRes]);
  

  const handleLikeComment = async (userId, commentId, e) => {
    console.log(commentId)
    e.stopPropagation(); 
    try {
      const { data } = await axios.put(`${backendPort}/api/comment/like/${commentId}`, { userId });
      setLikesDetails(data); 
    } catch (error) {
      console.log("Error on liking the comment:", error);
    }
  };

  const handleDislikeComment = async (userId, commentId, e)=>{
    e.stopPropagation();

    try {
        const { data } = await axios.put(`${backendPort}/api/comment/dislike/${commentId}`, { userId });
        setDislikeDetails(data);
    } catch (error) {
        console.log("Error on disliking the comment:", error);
    }
  }

  return (
    <div className="flex flex-col max-w-xl max-h-[85vh] mt-5 justify-start items-start mx-auto p-1 gap-6 sm:max-w-[800px] sm:p-2 md:mt-12 md:p-4">
      <div className="items-center">
        <h1 className="ml-2 font-sans text-2xl font-semibold">
          {commentAndUser?.length} &nbsp; Comments
        </h1>
      </div>

      <div className="space-y-6 w-full overflow-y-auto">
        {commentAndUser?.length > 0 ? (
          commentAndUser.map((comment, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 bg-white shadow-lg rounded-lg"
            >
              <img
                className="rounded-full w-12 h-12 object-cover"
                src={`${backendPort}${comment.user?.userImage}`}
                alt={`${comment.user?.name}`}
              />
              <div className="flex flex-col w-full">
                <h3 className="font-semibold text-lg font-raleway">
                  @{comment.user?.name}
                </h3>
                <p className="text-gray-700 mt-2 font-roboto">
                  {comment.comment?.content}
                </p>

                {loginUser && (
                  <div className="flex mt-3 gap-6 text-gray-500">
                    <button
                      onClick={(e) => handleLikeComment(loginUser._id, comment.comment._id, e)}
                      className="flex items-center text-lg font-roboto focus:outline-none hover:text-blue-500"
                    >
                      <BiLike className="mr-1" /> &nbsp; {comment.comment.likes?.length}
                    </button>
                    <button
                      onClick={(e) => handleDislikeComment(loginUser._id, comment.comment._id, e)} 
                      className="flex items-center text-lg hover:text-red-500"
                    >
                      <BiDislike className="mr-1" /> &nbsp;
                      {comment.comment.dislikes?.length}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
