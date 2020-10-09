import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import allReducer from "../reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["edit_reducer", "search"],
};

const persistedReducer = persistReducer(persistConfig, allReducer);

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__({
      latency: 0,
    })
);
export const persistor = persistStore(store);
