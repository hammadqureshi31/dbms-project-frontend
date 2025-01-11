import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { GoGraph } from "react-icons/go";

const COLORS = ["#7C4EE4", "#00C49F", "#FFBB28", "#FF8042"];

const DashboardOverview = () => {
  const allUsers = useSelector((state) => state.allUsers.data?.users);
  const allPosts = useSelector((state) => state.blogPosts.data?.posts);
  const allCategories = useSelector(
    (state) => state.blogPosts.data?.categories
  );
  const allComments = useSelector((state) => state.postComments.data?.comments);
  const user = useSelector((state) => state.currentUser?.data);
  const logs = useSelector((state) => state.logs.data);
  console.log(logs);
  const [categoryData, setCategoryData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [comments, setComments] = useState();
  const [users, setUsers] = useState();
  const [posts, setPosts] = useState();
  const [commentData, setCommentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryViews, setCategoryViews] = useState([]);

  useEffect(() => {
    if (allUsers && allPosts && allComments && allCategories) {
      setCategoryData(generateCategoryData(allCategories));
      setUserData(groupByDate(allUsers, "createdAt"));
      setPostData(groupByDate(allPosts, "createdAt"));
      setCommentData(groupByDate(allComments, "createdAt"));
      setUsers(allUsers);
      setPosts(allPosts);
      setComments(allComments);
      setLoading(false);
    }
  }, [allUsers, allPosts, allComments, allCategories]);

  const generateCategoryData = (categories) => {
    if (!categories || !Array.isArray(categories)) {
      console.error("Invalid categories array:", categories);
      return [];
    }

    if (!allPosts || !Array.isArray(allPosts)) {
      console.error("Invalid allPosts array:", allPosts);
      return [];
    }

    const categoryViews = categories.map((category) => {
      const postStats = allPosts.filter((data) => data.category === category);
      console.log(postStats);
      const views = postStats.reduce((total, post) => {
        if (typeof post.clicks !== "number") {
          console.warn(`Invalid clicks value for post:`, post);
          return total;
        }
        console.log(post.clicks);
        return total + post.clicks;
      }, 0);

      return { name: category, value: views };
    });

    const sortedCategoryViews = categoryViews.sort((a, b) => b.value - a.value);

    console.log("Generated Category Data:", sortedCategoryViews);

    return sortedCategoryViews;
  };

  const groupByDate = (data, dateField) => {
    const groupedData = data.reduce((acc, item) => {
      const date = new Date(item[dateField]).toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(groupedData).map(([date, count]) => ({
      date,
      count,
    }));
  };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatLogDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const today = new Date();

  if (loading) {
    return (
      <div className="hidden md:flex flex-col justify-between items-center bg-white shadow-md rounded-lg">
        {/* Header Section */}
        <div className=" hidden w-full md:flex flex-col md:flex-row justify-between items-center bg-white shadow-md p-4 rounded-lg">
          <div className="mb-4 md:mb-0 md:flex justify-start text-center gap-3">
            <h1 className="text-2xl font-semibold font-raleway border-r-2 border-gray-200 pr-3">
              Dashboard
            </h1>
            <h2 className="text-2xl text-[#7C4EE4] uppercase font-semibold font-lobster tracking-wider">
              {user ? user.username : "Guest"}
            </h2>
            <h4 className="text-lg font-roboto pt-1 text-[#00C49F]">
              {user && user?.email}
            </h4>
          </div>
          {/* Date Section */}
          <div className="md:flex justify-start text-center gap-5 bg-gray-100 rounded-md py-2 px-3">
            <h1 className="text-xl font-light">Today:</h1>
            <h2 className="text-lg text-[#7C4EE4] font-semibold">
              {formatDate(today)}
            </h2>
          </div>
        </div>

        {/* Skeleton for Tables */}
        {["Recent Users", "Recent Comments", "Recent Posts"].map(
          (section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="bg-white mt-5 max-h-[65vh] w-full rounded-lg shadow-lg p-4 overflow-y-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 animate-pulse"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                <div className="h-8 w-24 bg-gray-300 rounded"></div>
              </div>
              <Table hoverable className="font-roboto">
                <Table.Head>
                  {[...Array(5)].map((_, index) => (
                    <Table.HeadCell key={index}>
                      <div className="h-4 bg-gray-300 rounded w-20"></div>
                    </Table.HeadCell>
                  ))}
                </Table.Head>
                <Table.Body>
                  {[...Array(5)].map((_, rowIndex) => (
                    <Table.Row
                      key={rowIndex}
                      className="bg-white animate-pulse"
                    >
                      {[...Array(sectionIndex === 2 ? 4 : 5)].map(
                        (_, cellIndex) => (
                          <Table.Cell key={cellIndex}>
                            {sectionIndex === 1 && cellIndex === 1 ? (
                              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                            ) : sectionIndex === 2 && cellIndex === 1 ? (
                              <div className="w-24 h-12 bg-gray-300 rounded"></div>
                            ) : (
                              <div className="h-4 bg-gray-300 rounded w-20"></div>
                            )}
                          </Table.Cell>
                        )
                      )}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          )
        )}
      </div>
    );
  }

  return (
    <div className="container flex flex-col gap-5 mx-auto overflow-hidden">
      {/* Header Section */}
      <div className=" hidden md:flex flex-col md:flex-row justify-between items-center bg-white shadow-md p-4 rounded-lg">
        <div className="mb-4 md:mb-0 md:flex justify-start text-center gap-3">
          <h1 className="text-2xl font-semibold font-raleway border-r-2 border-gray-200 pr-3">
            Dashboard
          </h1>
          <h2 className="text-2xl text-[#7C4EE4] uppercase font-semibold font-lobster tracking-wider">
            {user ? user.username : "Guest"}
          </h2>
          <h4 className="text-lg font-roboto pt-1 text-[#00C49F]">
            {user && user?.email}
          </h4>
        </div>
        {/* Date Section */}
        <div className="md:flex justify-start font-roboto text-center gap-5 bg-gray-100 rounded-md py-2 px-3">
          <h1 className="text-xl">Today:</h1>
          <h2 className="text-lg text-[#7C4EE4] font-semibold">
            {formatDate(today)}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-t-lg rounded-b-2xl">
        <div className="flex w-full justify-start text-center gap-2 p-6 ">
          <div className="text-3xl pt-1 text-[#00C49F]">
            <GoGraph />
          </div>
          <h1 className="text-3xl pt-1 rounded-t-md  font-raleway text-[#00C49F]">
            Platform Stats
          </h1>
        </div>

        {/* Section: Pie Chart and Bar Chart */}
        <div className="ring-1 ring-gray-200 w-full flex flex-col md:flex-row items-start gap-8 px-4 py-8 bg-white shadow-md rounded-3xl">
          {/* Pie Chart */}
          <div className="mx-auto flex-1 text-center w-full">
            <h3 className="text-2xl font-bold mb-6 font-raleway bg-clip-text text-transparent bg-gradient-to-t from-[#7C4EE4] to-blue-400">
              Most Trending Categories
            </h3>

            {/* Pie Chart */}
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  label={(entry) => `${entry.name}: ${entry.value}`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend Section */}
            <div className="flex justify-center flex-wrap gap-4 mb-4 font-roboto">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-sm ">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart */}
          <div className="mx-auto flex-1 text-center w-full">
            <h3 className="text-2xl font-bold mb-12 font-raleway bg-clip-text text-transparent bg-gradient-to-t from-[#7C4EE4] to-blue-400">
              Posts Over Time
            </h3>

            {/* Bar Chart */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={postData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D1D5DB" />
                <XAxis dataKey="date" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#F9FAFB",
                    border: "1px solid #7C4EE4",
                  }}
                />
                <Legend
                  wrapperStyle={{ color: "#374151" }}
                  className="font-roboto"
                />
                <Bar dataKey="count" fill="#7C4EE4" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Section: Line and Area Charts */}
      <div className="mx-auto w-full flex flex-col md:flex-row items-start gap-8 p-6 bg-white shadow-md rounded-lg">
        {/* Users Area Chart */}
        <div className="mx-auto flex-1 text-center w-full">
          <h3 className="text-2xl font-bold mb-6 font-raleway bg-clip-text text-transparent bg-gradient-to-t from-[#7C4EE4] to-blue-400">
            Users Growth
          </h3>

          {/* Users Area Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={userData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D1D5DB" />
              <XAxis dataKey="date" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#F9FAFB",
                  border: "1px solid #7C4EE4",
                }}
              />
              <Legend wrapperStyle={{ color: "#374151" }} />
              <Area
                type="monotone"
                dataKey="count"
                name="Users"
                stroke="#7C4EE4"
                fillOpacity={0.4} // Adjusts fill opacity
                fill="#7C4EE4"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Comments Line Chart */}
        <div className="mx-auto flex-1 text-center w-full">
          <h3 className="text-2xl font-bold mb-6 font-raleway bg-clip-text text-transparent bg-gradient-to-t from-[#7C4EE4] to-blue-400">
            Comments Over Time
          </h3>

          {/* Comments Line Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={commentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D1D5DB" />
              <XAxis dataKey="date" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#F9FAFB",
                  border: "1px solid #7C4EE4",
                }}
              />
              <Legend wrapperStyle={{ color: "#374151" }} />
              <Line
                type="monotone"
                dataKey="count"
                name="Comments"
                stroke="#7C4EE4"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <section className="bg-white shadow-md rounded-lg p-6 w-full mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-xl sm:text-2xl  font-bold mb-6 font-raleway bg-clip-text text-transparent bg-gradient-to-t from-[#7C4EE4] to-blue-400">
            Platform Activity
          </h1>
        </header>

        {/* Activity List */}
        <div>
          {logs && logs.length > 0 ? (
            <ul className="space-y-4">
              {logs
                .slice()
                .reverse()
                .slice(0, 6)
                .map((log, index) => (
                  <div className="max-w-md">
                    <li key={index} className="flex justify-start text-left">
                      {/* Date */}
                      <p className="text-sm font-semibold w-18 font-sans text-left">
                        {formatLogDate(log.date)}
                      </p>

                      {/* Circle Indicator */}
                      <span
                        className={`h-4 w-4 mt-0.5 mx-auto sm:mx-5 border-4 rounded-full ${
                          log.details.toLowerCase().includes("logged in")
                            ? "border-blue-500 bg-white"
                            : log.details.toLowerCase().includes("comment")
                            ? "border-orange-500 bg-white"
                            : "border-green-500 bg-white"
                        }`}
                      ></span>

                      <p className="hidden sm:block font-roboto font-medium ">
                        Deatails:{" "}
                      </p>
                      {/* Log Details */}
                      <p className="text-sm font-raleway pl-2 w-36 sm:w-auto text-ellipsis text-wrap">
                        {log.details}
                      </p>
                    </li>
                    {index !== logs.slice(0, 6).length - 1 && (
                      <div className="w-full h-auto justify-center text-center pl-[122px] sm:pl-[98px] ">
                        <div className=" w-1 h-10 rounded-md bg-gray-200 text-gray-200"></div>
                      </div>
                    )}
                  </div>
                ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No Activity yet...</p>
          )}
        </div>
      </section>

      {/* Recent Users Table */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl sm:text-2xl  font-bold mb-6 font-raleway bg-clip-text text-transparent bg-gradient-to-t from-[#7C4EE4] to-blue-400">
            Recent Users
          </h1>
          <Button outline gradientDuoTone="purpleToPink">
            <Link to={"/user/dashboard?tab=users"}>See all</Link>
          </Button>
        </div>
        <div className="max-h-[65vh] overflow-x-scroll overflow-y-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
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
                        src={`${user.profilePicture}`}
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
      </div>

      {/* Recent Comments Table */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl sm:text-2xl font-bold mb-6 font-raleway bg-clip-text text-transparent bg-gradient-to-t from-[#7C4EE4] to-blue-400">
            Recent Comments
          </h1>
          <Button outline gradientDuoTone="purpleToPink">
            <Link to={"/user/dashboard?tab=comments"}>See all</Link>
          </Button>
        </div>
        <div className="max-h-[65vh] overflow-x-scroll overflow-y-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
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
      </div>

      {/* Recent Posts Table */}
      <div className="bg-white max-h-[65vh] rounded-lg shadow-lg p-4 overflow-y-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl sm:text-2xl  font-bold mb-6 font-raleway bg-clip-text text-transparent bg-gradient-to-t from-[#7C4EE4] to-blue-400">
            Recent Posts
          </h1>
          <Button outline gradientDuoTone="purpleToPink">
            <Link to={"/user/dashboard?tab=posts"}>See all</Link>
          </Button>
        </div>
        <div className="max-h-[65vh] overflow-x-scroll overflow-y-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
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
                          src={`${post.postImage}`}
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
    </div>
  );
};

export default DashboardOverview;
