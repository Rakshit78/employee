import { configureStore } from '@reduxjs/toolkit'
import locationReducer from '../reducer/locationReducer'
import { persistStore, persistReducer } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'user',
  storage,
};

const persistedReducer = persistReducer(persistConfig, locationReducer);

export const store = configureStore({
  reducer: {
    location:persistedReducer
  },
})

export const persistor = persistStore(store);