import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as productService from '../../services/productService';
const initialState = {
    products: [],
    totalPage: 0,
    tabType: 'new',
};

export const getNewArrival = createAsyncThunk(
    'homeProduct/getNewArrival',
    async ({ type, page }, { rejectWithValue }) => {
        try {
            console.log('>>>page ..', page);
            const res = await productService.getNewArrival(type, page);
            console.log('>>>res ..', res);

            if (res.status === 200) {
                return res.data;
            } else if (res.status !== 501) {
                return rejectWithValue(res.data);
            }
            // redirect to page 404 not found
        } catch (err) {
            rejectWithValue(err.message);
        }
    },
);

const homeProductSlice = createSlice({
    name: 'homeProduct',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getNewArrival.pending, (state) => {});
        builder.addCase(getNewArrival.fulfilled, (state, action) => {
            state.products = action.payload?.rows;
            state.totalPage = action.payload?.count;
        });
        builder.addCase(getNewArrival.rejected, (state, action) => {
            // handle rejected
        });
    },
});

export const selectProducts = (state) => state.homeProduct.products;
export const selectTotalPage = (state) => state.homeProduct.totalPage;

const { reducer } = homeProductSlice;
export default reducer;
