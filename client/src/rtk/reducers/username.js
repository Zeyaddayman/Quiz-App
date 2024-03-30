import { createSlice } from "@reduxjs/toolkit";

const usernameState = 'unknown';

const usernameSlice = createSlice({
    name: 'usernameSlice',
    initialState: usernameState,
    reducers: {
        saveUsername: (state, action) => {
            return state = action.payload;
        }
    }
})

export const { saveUsername } = usernameSlice.actions
export default usernameSlice.reducer;
