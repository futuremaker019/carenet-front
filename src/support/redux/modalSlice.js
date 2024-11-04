import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        title: "",          // current  title state management
        isOpen : false,     // modal state management for opening closing
        bodyType : "",      // modal content management
        size : "",          // modal content management
        data : {},
    },
    reducers: {
        openModal: (state, action) => {
            const {title, bodyType, data, size} = action.payload
            state.isOpen = true
            state.bodyType = bodyType
            state.title = title
            state.size = size || 'md'
            state.data = data
        },
        closeModal: (state, action) => {
            state.isOpen = false
            state.bodyType = ""
            state.title = ""
            state.data = {}
        },
    }
})

export const {
    openModal,
    closeModal
} = modalSlice.actions

export default modalSlice.reducer