import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
import rootReducer from "./rootReduce";
import logger from "redux-logger";

const persistConfig = {
  key: "root",
  storage,
};

const middleware = [thunk, logger]; // Include the logger middleware in the array

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = createStore(persistedReducer, applyMiddleware(...middleware));
export const store = createStore(persistedReducer, applyMiddleware(...middleware));
export const persistor = persistStore(store); 
