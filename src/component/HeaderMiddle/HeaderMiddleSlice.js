import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isDisplayed: false,
};

const HeaderMiddleSlice = createSlice({
    name: 'canvasMenu',
    initialState,
    reducers: {
        showCanvasMenu: (state, action) => {
            state.isDisplayed = action.payload;
        },
    },
});

export const selectIsDisplayed = (state) => {
    return state.showCanvasMenu.isDisplayed;
};

export const { showCanvasMenu } = HeaderMiddleSlice.actions;

const { reducer } = HeaderMiddleSlice;
export default reducer;
