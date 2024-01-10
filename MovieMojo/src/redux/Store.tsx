import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import rootReducer from "./reducers/UserReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const createdStore = createStore(persistedReducer);
const createdPersistor = persistStore(createdStore);

export const store = createdStore;
export const persistor = createdPersistor;
