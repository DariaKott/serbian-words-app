import { configureStore } from "@reduxjs/toolkit";
import  wordReducer from "../store/slice/wordSlice";

export const store = configureStore({
    reducer: {
        word: wordReducer,
    },
});