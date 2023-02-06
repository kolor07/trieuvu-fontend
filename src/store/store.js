import { configureStore } from '@reduxjs/toolkit';

import loginReducer from '../component/Login/loginSlice';
import homeProductSlice from '../component/homeProduct/homeProductSlice';
import ProductTabSlice from '../component/ProductTab/ProductTabSlice';
import HeaderMiddleSlice from '../component/HeaderMiddle/HeaderMiddleSlice';
import ProductDetailSlice from '../component/ProductDetail/ProductDetailSlice';
import CartSlice from '../component/Cart/CartSlice';
import CheckOutShippingSlice from '../component/CheckOutShipping/CheckOutShippingSlice';
import searchSlice from '../component/Search/SearchSlice';

const store = configureStore({
    reducer: {
        userInfo: loginReducer,
        showCanvasMenu: HeaderMiddleSlice,
        homeProduct: homeProductSlice,
        tabProduct: ProductTabSlice,
        productDetail: ProductDetailSlice,
        cart: CartSlice,
        shippingInfo: CheckOutShippingSlice,
        searchInfo: searchSlice,
    },
    devTools: true,
});

export default store;
