import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

import * as productService from '../../services/productService';
import * as categoryService from '../../services/CategoryService';

export const getProductById = createAsyncThunk('productDetail/getProductById', async (id, { rejectWithValue }) => {
    try {
        console.log('>>> process getProductById....');
        const res = await productService.getProductById(id);

        if (res.status === 200) {
            return res.data;
        } else {
            rejectWithValue(res.data);
        }
    } catch (err) {
        rejectWithValue(err.message);
    }
});

export const getCategoryNameById = createAsyncThunk(
    'productDetail/getCategoryNameById',
    async (categoryId, { rejectWithValue }) => {
        try {
            const res = await categoryService.getCategoryNameById(categoryId);
            console.log('>>>res getCategoryNameById..', res);

            if (res.status === 200) {
                return res.data;
            } else if (res.status !== 501) {
                return rejectWithValue(res.data);
            }
        } catch (err) {}
    },
);

const initialState = {
    isLoading: false,
    product: {},
    errMessage: '',
    categoryName: '',
};

const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.product = action.payload;
        });
        builder.addCase(getProductById.rejected, (state) => {});

        builder.addCase(getCategoryNameById.fulfilled, (state, action) => {
            state.categoryName = action.payload?.name;
        });
        builder.addCase(getCategoryNameById.rejected, (state) => {
            // handle rejected
        });
    },
});

export const selectProduct = (state) => state.productDetail.product;
export const selectIsLoading = (state) => state.productDetail.isLoading;
export const selectCategoryName = (state) => state.productDetail.categoryName;


const { reducer } = productDetailSlice;

export default reducer;
