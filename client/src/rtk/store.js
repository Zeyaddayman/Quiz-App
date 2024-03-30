import { configureStore } from "@reduxjs/toolkit";
import userAnswersSlice from "./reducers/userAnswers";
import usernameSlice from "./reducers/username";

export const store = configureStore({
    reducer: {
        userAnswers: userAnswersSlice,
        username: usernameSlice
    }
})