import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./features/darkMode/darkModeSlice";
import userReducer from "./features/user/userSlice";
import accountsReducer from "./features/accounts/accountsSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import chatReducer from "./features/chat/chatSlice";
import suggestReducer from "./features/suggest/suggestSlice";
import dynamicChartReducer from "./features/dynamicChart/dynamicChartSlice";
import categoryReducer from "./features/category/categorySlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      darkMode: darkModeReducer,
      user: userReducer,
      sidebar: sidebarReducer,
      chat: chatReducer,
      suggest: suggestReducer,
      dynamicChart: dynamicChartReducer,
      accounts: accountsReducer,
      category: categoryReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
