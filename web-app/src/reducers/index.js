import { combineReducers } from "redux";
import userReducer from "./userReducer";
import auth from './auth';

const rootReducer = combineReducers({
    userState: userReducer,
    auth
});

export default rootReducer;