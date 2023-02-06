import { createSlice } from '@reduxjs/toolkit';
import { localStorageAccess } from '../../utils/common';

const shippingInfo = localStorageAccess().getItems('shippingInfo');
const initialState = shippingInfo
    ? {
          shipInfo: shippingInfo,
      }
    : { shipInfo: {} };

const checkOutShipping = createSlice({
    name: 'checkOutShipping',
    initialState: initialState,
    reducers: {
        saveCheckOutShipping: (state, action) => {
            console.log('>>>action.payload', action.payload);
            state.shipInfo = action.payload;
        },
        removeShipping: (state) => {
            state.shipInfo = {};
        },
    },
    extraReducers: (builder) => {},
});

export const { saveCheckOutShipping, removeShipping } = checkOutShipping.actions;

export const selectShippingInfo = (state) => state.shippingInfo.shipInfo;

const { reducer } = checkOutShipping;
export default reducer;
