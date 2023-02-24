import {combineReducers, configureStore} from '@reduxjs/toolkit';
import testSlice, {testInitialState} from './testSlice';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const initialState = {
  test: testInitialState,
};

// persist only user slice
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['test'],
};

const rootReducer = combineReducers({
  test: testSlice,
});

// persistedReducer is used in gatsby-ssr and gatsby-browser
export const persistedReducer = persistReducer(persistConfig, rootReducer);

// need store for types
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// configure and export types for hooks
type ConfiguredStore = typeof store;
type StoreGetState = ConfiguredStore['getState'];
export type RootState = ReturnType<StoreGetState>;
export type AppDispatch = ConfiguredStore['dispatch'];
