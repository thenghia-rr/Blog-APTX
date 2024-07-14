import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: localStorage.getItem("lang") || "en", // Lấy ngôn ngữ từ localStorage
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem("lang", action.payload); // Lưu ngôn ngữ vào localStorage
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export const selectLanguage = (state) => state.language.language;

export default languageSlice.reducer;
