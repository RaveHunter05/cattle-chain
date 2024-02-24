import { createSlice } from '@reduxjs/toolkit';

export interface ProfileState {
    name: string;
}

const initialState: ProfileState = {
    name: 'none',
};

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        SET_NAME: (state, action) => {
            state.name = action.payload;
        },
    },
});

export const { SET_NAME } = profileSlice.actions;
export default profileSlice.reducer;
