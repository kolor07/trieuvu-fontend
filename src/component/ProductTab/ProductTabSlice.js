import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import * as productService from '../../services/productService';
import * as categoryService from '../../services/CategoryService';

const initialState = {
    products: [],
    totalItems: 0,
    categoryName: '',
};

export const getCategoryNameById = createAsyncThunk(
    'tabProduct/getCategoryNameById',
    async (categoryId, { rejectWithValue }) => {
        const navigate = useNavigate();
        console.log('>>>res getCategoryNameById..');
        try {
            const res = await categoryService.getCategoryNameById(categoryId);
            console.log('>>>res getCategoryNameById..', res);

            if (res.status === 200) {
                return res.data;
            } else if (res.status !== 501) {
                navigate('/file-not-found');
                //
                // return rejectWithValue(res.data);
            }
        } catch (err) {
            console.log(err);
            navigate('/file-not-found');
        }
    },
);

export const getProductByCategoryId = createAsyncThunk(
    'tabProduct/getProductByCategoryId',
    async ({ categoryId, page }, { rejectWithValue }) => {
        const navigate = useNavigate();
        try {
            const res = await productService.getProductByCategoryId(categoryId, page);

            if (res.status === 200) {
                return res.data;
            } else if (res.status !== 501) {
                // return rejectWithValue(res.data);
                navigate('/file-not-found');
            }
            // redirect to page 404 not found
        } catch (err) {
            console.log(err);
            navigate('/file-not-found');
            // rejectWithValue(err.message);
        }
    },
);

const ProductTabSlice = createSlice({
    name: 'tabProduct',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductByCategoryId.pending, (state) => {});
        builder.addCase(getProductByCategoryId.fulfilled, (state, action) => {
            state.products = action.payload?.rows;
            state.totalItems = action.payload?.count;
        });
        builder.addCase(getProductByCategoryId.rejected, (state, action) => {
            // handle rejected
        });

        builder.addCase(getCategoryNameById.fulfilled, (state, action) => {
            state.categoryName = action.payload?.name;
        });
        builder.addCase(getCategoryNameById.rejected, (state) => {
            // handle rejected
        });
    },
});

export const selectProducts = (state) => state.tabProduct.products;
export const selectTotalItems = (state) => state.tabProduct.totalItems;
export const selectCategoryName = (state) => state.tabProduct.categoryName;

const { reducer } = ProductTabSlice;
export default reducer;
