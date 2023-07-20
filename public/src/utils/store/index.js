import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/reducers";
import { initialState } from "./states/states";

const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
});

export default store;
