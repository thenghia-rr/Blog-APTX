import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducers";
import languageReducer from "./reducers/languageReducer";

const userInfoFromStorage = localStorage.getItem("account")
  ? JSON.parse(localStorage.getItem("account"))
  : null;

const initialState = {
  user: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer: {
    user: userReducer,
    language: languageReducer
  },
  preloadedState: initialState,
});

export default store;
