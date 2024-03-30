import { createSlice } from "@reduxjs/toolkit";

const userAnswersState = [];

const userAnswersSlice = createSlice({
    name: 'userAnswersSlice',
    initialState: userAnswersState,
    reducers: {
        saveUserAnswer: (state, action) => {
            let index = action.payload.index;
            state[index] = action.payload.userAnswer;
        },
        clearUserAnswers: (state, action) => {
            if (action.type == 'userAnswersSlice/clearUserAnswers') {
                state.length = 0;
            }
        }
    }
})

export const { saveUserAnswer, clearUserAnswers } = userAnswersSlice.actions
export default userAnswersSlice.reducer;
