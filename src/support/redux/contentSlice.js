import {createSlice} from "@reduxjs/toolkit";

const contentSlice = createSlice({
    name: 'content',
    initialState: {
        refresh: false,
        loading: false,
    },
    reducers: {
        refreshContent: (state, action) => { state.refresh = !state.refresh; },
        isLoading: (state, action) => { state.isLoading = action.payload; }
    }
});

export const {
    refreshContent,
    isLoading,
} = contentSlice.actions;

export default contentSlice.reducer;
