import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import ViewPost from "./pages/ViewPost";
import ScrollToTop from "./components/ScrollToTop";
import UpdatePost from "./pages/UpdatePost";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="flex flex-col min-w-full min-h-screen">
      <BrowserRouter>
        <Provider store={store}>
          <Header />
          <ScrollToTop />
          <div className="flex-grow bg-gray-50 mt-14 max-w-full pb-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<ViewPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/user/signup" element={<Signup />} />
              <Route path="/user/login" element={<Login />} />
              <Route path="/user/forgot-password" element={<ForgotPassword />} />
              <Route path="/user/reset-password/:id" element={<ResetPassword />} />

              <Route element={<PrivateRoute />}>
                <Route path="/user/dashboard" element={<Dashboard />} />
              </Route>

              <Route element={<OnlyAdminPrivateRoute />}>
                <Route path="/api/post/create" element={<CreatePost />} />
                <Route path="/api/post/update/:id" element={<UpdatePost />} />
              </Route>
            </Routes>
            <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
          </div>
          <Footer />
        </Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
