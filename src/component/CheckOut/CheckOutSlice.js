import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as cartService from '../../services/cartService';
import { orderService } from '../../services/orderService';
import { localStorageAccess } from '../../utils/common';

// const cartCount = cartService.getLocalCart();
const cart = localStorageAccess().getItems('cart');
const initialState = cart
    ? {
          products: cart,
          isLoading: false,
      }
    : {
          products: [],
          isLoading: false,
      };

const CheckOutSlice = createSlice({
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
    extraReducers: (builder) => {},
});

export const selectCart = (state) => state.cart.products;
export const selectIsLoading = (state) => state.cart.isLoading;
export const selectCartCount = (state) => state.cart.products.length;

export const { addOrUpdateCart, removeItemById, updateCarts, removeCart } = CheckOutSlice.actions;

const { reducer } = CheckOutSlice;

export default reducer;
