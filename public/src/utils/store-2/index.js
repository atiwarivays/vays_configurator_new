import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import konfigurationReducer, { fetchInitialData } from "./konfiguration-slice";

const logger = createLogger();

const store = configureStore({
  reducer: {
    config: konfigurationReducer,
  },
//  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

store.dispatch(fetchInitialData());

export default store;
