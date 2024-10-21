import {configureStore} from '@reduxjs/toolkit'
import modalReducer from "./modalSlice.js";
import contentSlice from "./contentSlice.js";

const combinedReducer = {
  // header : headerSlice,
  // rightDrawer : rightDrawerSlice,
  modal : modalReducer,
    content: contentSlice
  // lead : leadsSlice
}

const store = configureStore({
    reducer: combinedReducer
});

// export default configureStore({
//     reducer: combinedReducer
// })

export default store;