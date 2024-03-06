import './App.css';
import './index.css';
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { ThemeProvider } from '@mui/material';
import { createTheme } from "@mui/material/styles";
import store from "./store";

//Components
import ProtectedRoute from "./components/route/ProtectedRoute";
import Home from "./components/Home";

//Components - Layouts 
import Footer from "./components/layout/Footer";
import Register from './components/user/Registers';

//Components - User
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

//Components - Admin
import UsersList from './components/admin/UsersList';
import NewUser from './components/admin/NewUser';
import UpdateUser from './components/admin/UpdateUser'
import Taro from './components/admin/Taro';

import PostsList from './components/admin/PostsList';
import NewPost from "./components/admin/NewPost";
import UpdatePost from './components/admin/UpdatePost';

import DiseaseList from './components/admin/DiseasesList'
import NewDisease from './components/admin/NewDisease';
import UpdateDisease from './components/admin/UpdateDisease';

//Actions
import { loadUser } from "./actions/userActions";

import PostDetails from "./components/post/PostDetails";
import TaroDiseases from './components/TaroDiseases';
import DiseaseDetails from "./components/diseases/DiseaseDetails";
import TaroPosts from './components/TaroPosts';


import Forum from './components/Forum/Forum';
import PostDetail from './components/Forum/PostDetail';
import EditPost from './components/Forum/EditPost';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const Taro = createTheme({
    typography: {
      fontFamily: 'Montserrat'
    }
  });
  return (
    <div className="App">
      <ThemeProvider theme={Taro}>
        <Routes>

          {/* Routes for users */}
          <Route path="/register" element={<Register />} exact="true" />
          <Route path="/login" element={<Login />} exact="true" />
          <Route path="/" element={<Home />} exact="true" />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/update"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
            exact="true"
          />
          <Route
            path="/password/update"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
            exact="true"
          />
          <Route
            path="/password/forgot"
            element={<ForgotPassword />}
            exact="true"
          />
          <Route
            path="/password/reset/:token"
            element={<NewPassword />}
            exact="true"
          />

          {/* Routes for admin */}
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute isAdmin={true}>
                <UsersList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users/new"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users/update/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateUser />
              </ProtectedRoute>
            }
          />

          {/* Routes for posts */}
          <Route
            path="/admin/posts"
            element={
              <ProtectedRoute isAdmin={true}>
                <PostsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post/new"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update/post/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdatePost />
              </ProtectedRoute>
            }
          />

          <Route
            path="/diseases"
            element={
              <ProtectedRoute isAdmin={true}>
                <DiseaseList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/disease/new"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewDisease />
              </ProtectedRoute>
            }
          />

          <Route
            path="/update/disease/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateDisease />
              </ProtectedRoute>
            }
          />

          {/*  Routes for ordering posts*/}
          <Route path="/TaroPosts/post/:id"
            element={
              <ProtectedRoute>
                <PostDetails />
              </ProtectedRoute>
            }
            exact="true" />
          <Route path="/TaroPosts" element={<TaroPosts />} exact="true" />
          <Route path="/Taro" element={<Taro />} exact="true" />
          <Route path="/search/:keyword" element={<TaroPosts />} exact="true" />

          <Route path="/TaroDiseases/disease/:id"
            element={
              <ProtectedRoute>
                <DiseaseDetails />
              </ProtectedRoute>
            }
            exact="true" />

          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/TaroDiseases" element={<TaroDiseases />} exact="true" />
          <Route path="/Forum" element={<Forum />} />
          <Route path="/edit-post/:id" element={<EditPost />} />

        </Routes>
        <ToastContainer />
        {!loading && (!isAuthenticated || user.role !== "admin") && <Footer />}
      </ThemeProvider>
    </div>
  );
}

export default App;