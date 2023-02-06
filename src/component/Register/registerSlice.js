import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register } from '../../services/userService';
import * as authService from '../../services/authService';
import * as tokenService from '../../services/tokenService';

const user = localStorage.getItem('user');

const initialState = user
    ? { isAuthenticated: true, user, message: '', isLoading: false }
    : { isAuthenticated: false, user: null, message: '', isLoading: false };

export const registerUser = createAsyncThunk('register/registerUser', async (userData, { rejectWithValue }) => {
    try {
        console.log('createAsyncThunk ', userData);

        const res = await authService.register(userData);
        console.log('>>> res ', res);

        if (res.status !== 200) {
            return rejectWithValue(res.data.message);
        }
        tokenService.setUser(res.data.user);

        return res.data;
    } catch (error) {
        console.log('>>> error ', error);
        return rejectWithValue(error);
    }
});

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerUser: (state, action) => {},
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.errorMessage = '';
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        });
    },
});

export const selectUser = (state) => state.userInfo.currentUser;
export const selectLoading = (state) => state.userInfo.isLoading;
export const selectAuthenticated = (state) => state.userInfo.isAuthenticated;
export const selectMessage = (state) => state.userInfo.errorMessage;

// export const { authenticate } = registerSlice.actions;
const { reducer } = registerSlice;

export default reducer;
