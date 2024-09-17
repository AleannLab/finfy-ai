import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./features/darkMode/darkModeSlice";
import userReducer from "./features/user/userSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      darkMode: darkModeReducer,
      user: userReducer,
      sidebar: sidebarReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
