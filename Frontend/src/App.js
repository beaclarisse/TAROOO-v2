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

//Questions
import NewQuestion from './components/admin/NewQuestions';
import QuestionsList from './components/admin/ListQuestion';
import UpdateQuestion from './components/admin/UpdateQuestion';

import SurveyAnalysis from './components/admin/SurveyAnalysis';

//farmer
import FQuestionsList from './components/admin/farmer/ListFQuestion';
import FUpdateQuestion from './components/admin/farmer/UpdateQuestion';
import FnewQuestion from './components/admin/farmer/NewFQuestion';

//Seller
import SQuestionsList from './components/admin/seller/ListSQuestions';
import SUpdateQuestion from './components/admin/seller/UpdateSQuestion';
import SnewQuestion from './components/admin/seller/NewSQuestion';

//overall
import CreateSurveyList from './components/admin/overallSurvey/createSurveyList';
import OverallSurveyList from './components/admin/overallSurvey/overSurveyList';
//import UpdateSurveyList from './components/admin/overallSurvey/updateSurveyList';
import UpdateSurveyList from './components/admin/overallSurvey/updateSurveyList';



//Answer
import SurveyForm from './components/Question/Survey';
import FSurveyForm from './components/Question/farmerSurvey';
import SSurveyForm from './components/Question/sellerSurvey';
import OverallSurvey from './components/Question/overallSurvey';

//Forum
import Forum from './components/Forum/Forum';
import PostDetail from './components/Forum/PostDetail';
import EditPost from './components/Forum/EditPost';
import AddPost from './components/Forum/AddPost';

//Video
import VideoBrowse from './components/TaroTube/VideoBrowse';
import VideoListPage from './components/TaroTube/VideoListPage';

import UserPostList from './components/UserPostList';

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

          {/* Post Forum */}
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/AddPost" element={<AddPost />} />

          {/* VideoBrowse */}
          <Route path="/admin/VideoBrowse" element={<VideoBrowse />} />
          <Route path="/VideoListPage" element={<VideoListPage />} />



          {/* AdminPost */}
          <Route path="/TaroDiseases" element={<TaroDiseases />} exact="true" />
          <Route path="/Forum" element={<Forum />} />

          <Route path="/edit-post/:id" element={<EditPost />} />

          {/* Analytics */}
          <Route path="/surveyAnalysis" element={
            <ProtectedRoute isAdmin={true}>
              <SurveyAnalysis />
            </ProtectedRoute>
          } />
          {/* Consumer */}
          <Route path="/questions" element={
            <ProtectedRoute isAdmin={true}>
              <QuestionsList />
            </ProtectedRoute>
          } />
          <Route path="/questions/create" element={
            <ProtectedRoute isAdmin={true}>
              <NewQuestion />
            </ProtectedRoute>
          } />

          <Route path="/questions/update/:id" element={
            <ProtectedRoute isAdmin={true}>
              <UpdateQuestion />
            </ProtectedRoute>
          } />

          {/* Farmer */}
          <Route path="/farmerQuestion" element={
            <ProtectedRoute isAdmin={true}>
              <FQuestionsList />
            </ProtectedRoute>
          } />

          <Route path="/farmerquestions/create" element={
            <ProtectedRoute isAdmin={true}>
              <FnewQuestion />
            </ProtectedRoute>
          } />

          <Route path="/farmerquestions/update/:id" element={
            <ProtectedRoute isAdmin={true}>
              <FUpdateQuestion />
            </ProtectedRoute>
          } />

          {/* Seller */}
          <Route path="/sellerQuestion" element={
            <ProtectedRoute isAdmin={true}>
              <SQuestionsList />
            </ProtectedRoute>
          } />

          <Route path="/sellerquestions/create" element={
            <ProtectedRoute isAdmin={true}>
              <SnewQuestion />
            </ProtectedRoute>
          } />

          <Route path="/sellerquestions/update/:id" element={
            <ProtectedRoute isAdmin={true}>
              <SUpdateQuestion />
            </ProtectedRoute>
          } />

          {/* Overall */}
          <Route path="/overallSurvey" element={
            <ProtectedRoute isAdmin={true}>
              <OverallSurveyList />
            </ProtectedRoute>
          } />

          <Route path="/overallSurvey/create" element={
            <ProtectedRoute isAdmin={true}>
              <CreateSurveyList />
            </ProtectedRoute>
          } />

          <Route path="/overallSurvey/update/:id" element={
            <ProtectedRoute isAdmin={true}>
              <UpdateSurveyList />
            </ProtectedRoute>
          } />


          <Route path="/survey" element={<SurveyForm />} />
          <Route path="/farmerSurvey" element={<FSurveyForm />} />
          <Route path="/sellerSurvey" element={<SSurveyForm />} />
          <Route path="/UserPostList" exact component={UserPostList} />
          <Route path="/allSurvey" element={<OverallSurvey />} />



        </Routes>
        <ToastContainer />
        {!loading && (!isAuthenticated || user.role !== "admin") && <Footer />}
      </ThemeProvider>
    </div>
  );
}

export default App;