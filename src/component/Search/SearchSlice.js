import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    keySearch: '',
    searchData: [],
    totalItems: 0,
};

const searchSlice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: {
        setSearchResults: (state, action) => {
            console.log(action.payload.searchData);
            state.keySearch = action.payload.keySearch;
            state.searchData = action.payload.searchData;
            state.totalItems = action.payload.totalItem;
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {},
});

export const { setSearchResults } = searchSlice.actions;
export const selectSearchResults = (state) => state.searchInfo.searchData;
export const selectKeySearch = (state) => state.searchInfo.keySearch;
export const selectTotalItems = (state) => state.searchInfo.totalItems;
export const selectIsLoading = (state) => state.searchInfo.isLoading;

const { reducer } = searchSlice;
export default reducer;
