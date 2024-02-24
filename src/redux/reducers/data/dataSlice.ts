import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dataChanged: false,
};

const dataSlice = createSlice({
    name: 'tablesdata',
    initialState: initialState,
    reducers: {
        changeData: (state) => {
            state.dataChanged = !state.dataChanged;
        },
    },
    extraReducers: {},
});

export const { changeData } = dataSlice.actions;
export default dataSlice.reducer;
