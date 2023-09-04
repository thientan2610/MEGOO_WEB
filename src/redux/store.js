import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import packageSlice from "./packageSlice";
import userSlice from "./userSlice";
import stockSlide from "./stockSlide";
import messageSlice from "./messageSlice";
import homeSlide from "./homeSlice";


// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     package: packageSlice,
//     user: userSlice,
//   }
// });


const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  package: packageSlice,
  user: userSlice,
  stock: stockSlide,
  message: messageSlice,
  home: homeSlide,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);