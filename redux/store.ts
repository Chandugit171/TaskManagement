import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { documentDirectory, EncodingType } from "expo-file-system";
import { createExpoFileSystemStorage } from "redux-persist-expo-file-system-storage";
import { persistReducer, persistStore } from "redux-persist";

import addedTasksRedux from "./tasksSlice";

export const expoFileSystemStorage = createExpoFileSystemStorage({
  storagePath: `${documentDirectory}customPathName/`,
  encoding: EncodingType.UTF8,
  debug: true,
});

const persistConfig = {
  key: 'root',
  storage: expoFileSystemStorage,
};

const rootReducer = combineReducers({
  tasks: addedTasksRedux,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
