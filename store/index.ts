import { configureStore } from "@reduxjs/toolkit";
import localeReducer from "./localeSlice";

export const makeStore = () => configureStore({
  reducer: {
    locale: localeReducer,
  },
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
