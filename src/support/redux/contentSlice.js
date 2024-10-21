import {createSlice} from "@reduxjs/toolkit";

const contentSlice = createSlice({
    name: 'content',
    initialState: {
        refresh: false,
    },
    reducers: {
        refreshContent: (state, action) => {
            state.refresh = !state.refresh;
        }
    }
});

export const {
    refreshContent,
} = contentSlice.actions;

export default contentSlice.reducer;
