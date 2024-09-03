import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { backendPort } from "../config";
import { FaCheck, FaTimes } from "react-icons/fa";

const DashboardOverview = () => {
  const allUsers = useSelector((state) => state.allUsers.data?.users);
  const allPosts = useSelector((state) => state.blogPosts.data);
  const allComments = useSelector((state) => state.postComments.data?.comments);
  const [users, setUsers] = useState();
  const [posts, setPosts] = useState();
  const [comments, setComments] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (allUsers && allPosts && allComments) {
      setUsers(allUsers);
      setPosts(allPosts);
      setComments(allComments);
      setLoading(false);
    }
  }, [allUsers, allComments, allPosts]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Skeleton for Total Users Card */}
          <div className="flex flex-col p-4 bg-gradient-to-r from-teal-400 to-teal-600 rounded-lg shadow-lg animate-pulse">
            <div className="flex justify-between items-center">
              <div>
                <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                <div className="h-8 bg-gray-300 rounded w-1/2"></div>
              </div>
              <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex gap-2 text-white text-sm mt-2">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>

          {/* Skeleton for Total Comments Card */}
          <div className="flex flex-col p-4 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-lg shadow-lg animate-pulse">
            <div className="flex justify-between items-center">
              <div>
                <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                <div className="h-8 bg-gray-300 rounded w-1/2"></div>
              </div>
              <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex gap-2 text-white text-sm mt-2">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>

          {/* Skeleton for Total Posts Card */}
          <div className="flex flex-col p-4 bg-gradient-to-r from-lime-400 to-lime-600 rounded-lg shadow-lg animate-pulse">
            <div className="flex justify-between items-center">
              <div>
                <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                <div className="h-8 bg-gray-300 rounded w-1/2"></div>
              </div>
              <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex gap-2 text-white text-sm mt-2">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>
        </div>

        {/* Skeleton for Recent Users Table */}
        <div className="bg-white max-h-[65vh] rounded-lg shadow-lg p-4 overflow-y-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 animate-pulse">
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            <div className="h-8 w-24 bg-gray-300 rounded"></div>
          </div>
          <Table hoverable className="font-roboto">
            <Table.Head>
              <Table.HeadCell>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </Table.HeadCell>
              <Table.HeadCell>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </Table.HeadCell>
              <Table.HeadCell>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </Table.HeadCell>
              <Table.HeadCell>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </Table.HeadCell>
              <Table.HeadCell>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {[...Array(5)].map((_, index) => (
                <Table.Row key={index} className="bg-white animate-pulse">
                  <Table.Cell>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        {/* Skeleton for Recent Comments Table */}
        <div className="bg-white max-h-[65vh] rounded-lg shadow-lg p-4 overflow-y-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 animate-pulse">
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            <div className="h-8 w-24 bg-gray-300 rounded"></div>
          </div>
          <Table hoverable className="font-roboto">
            <Table.Head>
              <Table.HeadCell>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </Table.HeadCell>
              <Table.HeadCell>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </Table.HeadCell>
              <Table.HeadCell>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </Table.HeadCell>
              <Table.HeadCell>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </Table.HeadCell>
              <Table.HeadCell>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {[...Array(5)].map((_, index) => (
                <Table.Row key={index} className="bg-white animate-pulse">
                  <Table.Cell>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        {/* Skeleton for Recent Posts Table */}
        <div className="bg-white max-h-[65vh] rounded-lg shadow-lg p-4 overflow-y-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 animate-pulse">
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            <div className="h-8 w-24 bg-gray-300 rounded"></div>
          </div>
          <Table hoverable className="font-roboto">
            <Table.Head>
              <Table.HeadCell>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </Table.HeadCell>
              <Table.HeadCell>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </Table.HeadCell>
              <Table.HeadCell>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </Table.HeadCell>
              <Table.HeadCell>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {[...Array(5)].map((_, index) => (
                <Table.Row key={index} className="bg-white animate-pulse">
                  <Table.Cell>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="w-24 h-12 bg-gray-300 rounded"></div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users Card */}
        <div className="flex flex-col p-4 bg-gradient-to-r from-teal-400 to-teal-600 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white text-md uppercase font-raleway">
                Total Users
              </h3>
              <p className="text-white text-3xl font-roboto">{users?.length}</p>
            </div>
            <HiOutlineUserGroup className="text-white text-5xl" />
          </div>
          <div className="flex gap-2 text-white text-sm mt-2">
            <HiArrowNarrowUp className="text-white mt-0.5" />
            <span>{users?.length} Last month</span>
          </div>
        </div>

        {/* Total Comments Card */}
        <div className="flex flex-col p-4 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white text-md uppercase font-raleway">
                Total Comments
              </h3>
              <p className="text-white text-3xl font-roboto">
                {comments?.length || 0}
              </p>
            </div>
            <HiAnnotation className="text-white text-5xl" />
          </div>
          <div className="flex gap-2 text-white text-sm mt-2">
            <HiArrowNarrowUp className="text-white mt-0.5" />
            <span>{comments?.length} Last month</span>
          </div>
        </div>

        {/* Total Posts Card */}
        <div className="flex flex-col p-4 bg-gradient-to-r from-lime-400 to-lime-600 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white text-md uppercase font-raleway">
                Total Posts
              </h3>
              <p className="text-white text-3xl font-roboto">{posts?.length}</p>
            </div>
            <HiDocumentText className="text-white text-5xl" />
          </div>
          <div className="flex gap-2 text-white text-sm mt-2">
            <HiArrowNarrowUp className="text-white mt-0.5" />
            <span>{posts?.length} Last month</span>
          </div>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="bg-white max-h-[65vh] rounded-lg shadow-lg p-4 overflow-y-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-raleway">Recent Users</h1>
          <Button outline gradientDuoTone="purpleToPink">
            <Link to={"/user/dashboard?tab=users"}>See all</Link>
          </Button>
        </div>
        <Table hoverable className="font-roboto">
          <Table.Head>
            <Table.HeadCell>Date created</Table.HeadCell>
            <Table.HeadCell>User image</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Admin</Table.HeadCell>
          </Table.Head>
          {users &&
            users.map((user) => (
              <Table.Body key={user._id} className="divide-y">
                <Table.Row className="bg-white">
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={`${backendPort}${user.profilePicture}`}
                      alt={user.username}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
        </Table>
      </div>

      {/* Recent Comments Table */}
      <div className="bg-white max-h-[65vh] rounded-lg shadow-lg p-4 overflow-y-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-raleway">Recent Comments</h1>
          <Button outline gradientDuoTone="purpleToPink">
            <Link to={"/user/dashboard?tab=comments"}>See all</Link>
          </Button>
        </div>
        <Table hoverable className="font-roboto">
          <Table.Head>
            <Table.HeadCell>Date updated</Table.HeadCell>
            <Table.HeadCell>Comment content</Table.HeadCell>
            <Table.HeadCell>Likes</Table.HeadCell>
            <Table.HeadCell>Post ID</Table.HeadCell>
            <Table.HeadCell>User ID</Table.HeadCell>
          </Table.Head>
          {comments ? (
            comments.map((comment) => (
              <Table.Body key={comment._id} className="divide-y">
                <Table.Row className="bg-white">
                  <Table.Cell className="text-xs md:text-sm">
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell className="text-xs md:text-sm">
                    {comment.content}
                  </Table.Cell>
                  <Table.Cell className="text-xs md:text-sm">
                    {comment.likes?.length}
                  </Table.Cell>
                  <Table.Cell className="text-xs md:text-sm">
                    {comment.postId}
                  </Table.Cell>
                  <Table.Cell className="text-xs md:text-sm">
                    {comment.userId}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">
              You have no comments yet!
            </p>
          )}
        </Table>
      </div>

      {/* Recent Posts Table */}
      <div className="bg-white max-h-[65vh] rounded-lg shadow-lg p-4 overflow-y-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-raleway">Recent Posts</h1>
          <Button outline gradientDuoTone="purpleToPink">
            <Link to={"/user/dashboard?tab=posts"}>See all</Link>
          </Button>
        </div>
        <Table hoverable className="font-roboto ">
          <Table.Head>
            <Table.HeadCell>Date updated</Table.HeadCell>
            <Table.HeadCell>Post image</Table.HeadCell>
            <Table.HeadCell>Post title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
          </Table.Head>
          {posts &&
            posts.map((post) => (
              <Table.Body key={post._id} className="divide-y">
                <Table.Row className="bg-white">
                  <Table.Cell className="text-xs">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/blogs/${post._id}`}>
                      <img
                        src={`${backendPort}${post.postImage}`}
                        alt={post.title}
                        className="w-24 h-12 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-raleway text-[#333333]"
                      to={`/blogs/${post._id}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
        </Table>
      </div>
    </div>
  );
};

export default DashboardOverview;
