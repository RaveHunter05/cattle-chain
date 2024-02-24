import { configureStore } from '@reduxjs/toolkit';

import { useDispatch } from 'react-redux';

import profileReducer from './reducers/profileSlice';
import authReducer from './reducers/auth/authSlice';
import dataReducer from './reducers/data/dataSlice';

const store = configureStore({
    reducer: {
        profile: profileReducer,
        auth: authReducer,
        data: dataReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
