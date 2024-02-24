import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface ProfileState {
    loading: boolean;
    userInfo: Object;
    error: string | null;
    success: boolean;
}

const initialState: ProfileState = {
    loading: false,
    userInfo: {},
    error: null,
    success: false,
};

interface LoginCredentialsInterface {
    token: string;
}

export const loginUser = createAsyncThunk(
    'auth/login',
    async (
        responseData: LoginCredentialsInterface,
        { dispatch, rejectWithValue }
    ) => {
        try {
            dispatch(userLoading());
            dispatch(userLoaded(responseData));
            return responseData;
        } catch (error) {
            if (typeof error === 'string') {
                dispatch(userLoadFailed(error));
                return rejectWithValue(error);
            }
            if (error instanceof Error) {
                dispatch(userLoadFailed(error.message));
                return rejectWithValue(error.message);
            }
        }
    }
);

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
        userLoading: (state) => {
            state.loading = true;
        },
        userLoaded: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload.user;
        },
        userLoadFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        userLogout: (state) => {
            state.loading = false;
            state.userInfo = {};
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: {},
});

export const { userLoading, userLoaded, userLoadFailed, userLogout } =
    authSlice.actions;
export default authSlice.reducer;
