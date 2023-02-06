import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as loginService from '../../services/loginService';

const initialState = {
    isLoading: false,
    errorMessage: '',
    isAuthenticated: false,
    currentUser: {},
};

export const checkLogin = createAsyncThunk('login/checkLogin', async ({ email, pwd }, { rejectWithValue }) => {
    try {
        console.log('this is login/checkLogin');
        const res = await loginService.checkLogin(email, pwd);
        if (res.status !== 200) {
            rejectWithValue('there is an fucking predictable error !');
        }
        console.log('res data', res.data);
        return res.data;
    } catch (error) {
        console.log('>>> error ', error);
    }
});
const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        authenticate: (state, action) => {
            console.log('we in authenticate', action);
            state.userName = action.payload.userName;
            state.pass = action.payload.pass;
            state.isAuth = action.payload.isAuth;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(checkLogin.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(checkLogin.fulfilled, (state, action) => {
            console.log('login successfully', action.payload.statusCode);
            if (action.payload.statusCode === 0) {
                state.isAuthenticated = true;
                state.currentUser.email = action.payload.data.email;
                console.log('login successfully');
            } else {
                state.errorMessage = action.payload.message;
            }
            state.isLoading = false;
        });
        builder.addCase(checkLogin.rejected, (state, action) => {
            console.log('we checkLogin.rejected', action);
            state.isLoading = false;
            state.errorMessage = 'there is an fucking predictable error';
        });
    },
});

// Select state currentUser from slice
export const selectUser = (state) => state.loginInfo.currentUser;
export const selectLoading = (state) => state.loginInfo.isLoading;
export const selectAuthenticated = (state) => state.loginInfo.isAuthenticated;
export const selectMessage = (state) => state.loginInfo.errorMessage;

// export action
export const { authenticate } = loginSlice.actions;

// export reducer
const { reducer } = loginSlice;
export default reducer;
