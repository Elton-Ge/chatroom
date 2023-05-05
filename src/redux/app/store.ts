import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer= combineReducers({
  user: userReducer,
});
const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store= configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});
const persistor = persistStore(store);

export { store, persistor };
export type RootState= ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch