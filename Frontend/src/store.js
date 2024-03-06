import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
    authReducer,
    userReducer,
    forgotPasswordReducer,
    allUsersReducer,
    userDetailsReducer,
} from "./reducers/userReducers";

import {
    postsReducer,
    postDetailsReducer,
    newReviewReducer,
    newPostReducer,
    postReducer,
    reviewReducer,
    postReviewsReducer,
} from "./reducers/taroReducers";

import {
    diseasesReducer,
    newServiceReducer,
    diseaseReducer,
    diseaseDetailsReducer,
} from "./reducers/diseaseReducers";

const reducer = combineReducers({
    auth: authReducer,
    allUsers: allUsersReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    userDetails: userDetailsReducer,

    posts: postsReducer,
    postDetails: postDetailsReducer,
    newReview: newReviewReducer,
    newPost: newPostReducer,
    postReviews: postReviewsReducer,
    review: reviewReducer,
    post: postReducer,

    diseases: diseasesReducer,
    diseaseDetails: diseaseDetailsReducer,
    disease: diseaseReducer,
});

const middlware = [thunk];
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middlware))
);

export default store;