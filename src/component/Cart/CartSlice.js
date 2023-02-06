import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as cartService from '../../services/cartService';

const cart = cartService.getLocalCart();
// const cartCount = cartService.getLocalCart();
const initialState = cart
    ? {
          products: cart,
          discount: 0,
      }
    : {
          products: [],
          discount: 0,
      };

export const getDiscount = createAsyncThunk('cartSlice/checkCoupon', async (coupon, { rejectWithValue }) => {
    try {
        console.log(coupon);
        const res = await cartService.getCoupon(coupon);
        console.log('checkCoupon...', res);

        if (res.status !== 200) {
            return rejectWithValue({});
        }
        return res.data?.discount;
    } catch (error) {
        console.log('>>> error ', error);
        return rejectWithValue(error);
    }
});

const CartSlice = createSlice({
    name: 'cartSlice',
    initialState: initialState,
    reducers: {
        addOrUpdateCart: (state, action) => {
            const itemIndex = state.products.findIndex((p) => p.product.id === action.payload.product.id);
            itemIndex !== -1
                ? (state.products[itemIndex].quantity = action.payload.quantity)
                : state.products.push({ product: action.payload.product, quantity: action.payload.quantity });
            cartService.removeLocalCart();
            cartService.setLocalCart(state.products);
        },

        removeItemById: (state, action) => {
            const itemIndex = state.products.findIndex((p) => p.product.id === action.payload);
            console.log('>>> itemIndex...', itemIndex);
            if (itemIndex !== -1) {
                state.products.splice(itemIndex, 1);
            }
            cartService.removeLocalCart();
            cartService.setLocalCart(state.products);
        },
        updateCarts: (state, action) => {
            console.log('payload...', action.payload);
            state.products = action.payload;
            cartService.removeLocalCart();
            cartService.setLocalCart(action.payload);
        },

        removeCart: (state, action) => {
            state.products = [];
            cartService.removeLocalCart();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getDiscount.pending, (state) => {});
        builder.addCase(getDiscount.fulfilled, (state, action) => {
            state.discount = action.payload ? action.payload : 0;
        });
        builder.addCase(getDiscount.rejected, (state, action) => {
            // handle rejected
        });
    },
});

export const selectCart = (state) => state.cart.products;
export const selectCartCount = (state) => state.cart.products.length;
export const selectDiscount = (state) => state.cart.discount;

export const { addOrUpdateCart, removeItemById, updateCarts, removeCart } = CartSlice.actions;

const { reducer } = CartSlice;

export default reducer;
