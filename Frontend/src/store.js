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
    tarosReducer,
    taroDetailsReducer,
    newTaroReducer,
    taroReducer,
} from "./reducers/taroReducers";

import {
    diseasesReducer,
    diseaseReducer,
    diseaseDetailsReducer,
    newDiseaseReducer,
    
} from "./reducers/diseaseReducers";

const reducer = combineReducers({
    auth: authReducer,
    allUsers: allUsersReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    userDetails: userDetailsReducer,

    taros: tarosReducer,
    taroDetails: taroDetailsReducer,
    newTaro: newTaroReducer,
    taro: taroReducer,

    diseases: diseasesReducer,
    diseaseDetails: diseaseDetailsReducer,
    disease: diseaseReducer,
    newDisease: newDiseaseReducer, 
});

const middlware = [thunk];
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middlware))
);

export default store;