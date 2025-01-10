import React, { useEffect, useState } from "react";
import DashSidebar from "../components/DashSidebar";
import { useLocation } from "react-router";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";
import DashboardOverview from "../components/DashboardOverview";
import { fetchAllPostsComments } from "../redux/slices/commentSlice";
import { useDispatch } from "react-redux";
import { fetchAllUsersDetails } from "../redux/slices/allUsersSlice";
import { fetchAllPosts } from "../redux/slices/postSlice";
import { fetchLogDetails } from "../redux/slices/logSlice";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const history = new URLSearchParams(location.search);
    const tabFromUrl = history.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }

    dispatch(fetchAllPostsComments());
    dispatch(fetchAllUsersDetails());
    dispatch(fetchAllPosts({dashBoard:1}));
    dispatch(fetchLogDetails());
    
  }, [location.search]);

  return (
    <>
      <div className=" flex-row gap-3 sm:flex pb-10">
        <DashSidebar />

        <div className="w-full md:mt-5 md:pr-3">
          {/* profile... */}
          {tab === "profile" && <DashProfile />}
          {/* posts... */}
          {tab === "posts" && <DashPosts />}
          {/* users */}
          {tab === "users" && <DashUsers />}
          {/* comments  */}
          {tab === "comments" && <DashComments />}
          {/* dashboard comp */}
          {tab === "dash" && <DashboardOverview />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
