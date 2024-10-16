import {configureStore} from '@reduxjs/toolkit'
import modalReducer from "./modalSlice.js";

const combinedReducer = {
  // header : headerSlice,
  // rightDrawer : rightDrawerSlice,
  modal : modalReducer,
  // lead : leadsSlice
}

const store = configureStore({
    reducer: combinedReducer
});

// export default configureStore({
//     reducer: combinedReducer
// })

export default store;