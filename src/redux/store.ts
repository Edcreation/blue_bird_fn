import { configureStore, combineReducers } from '@reduxjs/toolkit';
import tokenReducer from './slices/tokenSlice';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import profileSlice from './slices/profileSlice';
import ChangeDpSlice from '../pages/profile/redux/ChangeDpSlice';
import ChangeProfileSlice from '../pages/profile/redux/UpdateProfileSlice';

const rootReducer = combineReducers({
    token: tokenReducer,
    profile: profileSlice,
    changeDp: ChangeDpSlice,
    changeProfileData: ChangeProfileSlice,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['token'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ],
        },
      }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;