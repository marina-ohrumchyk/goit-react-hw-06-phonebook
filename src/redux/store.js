import { configureStore } from '@reduxjs/toolkit';

import phonebookReducer from './phonebook/phonebookSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localS

const persistConfig = {
  key: 'phonebook',
  storage,
  whitelist: ['contacts'],
};

const persistedPhonebookReducer = persistReducer(
  persistConfig,
  phonebookReducer
);

export const store = configureStore({
  reducer: { phonebook: persistedPhonebookReducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
