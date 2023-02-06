import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../../services/authService';
import * as tokenService from '../../services/tokenService';

const user = tokenService.getUser();
console.log(' user from slice...', user);
const initialState = user
    ? { isAuthenticated: true, user: user, message: '', isLoading: false }
    : { isAuthenticated: false, user: null, message: '', isLoading: false };

export const signIn = createAsyncThunk('login/signIn', async ({ email, password }, { rejectWithValue }) => {
    try {
        const res = await authService.login(email, password);
        if (res.status === 200 && !res.data.message) {
            tokenService.setUser(res.data.user);
            return res.data;
        } else {
            return rejectWithValue(res.data);
        }
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const signUp = createAsyncThunk('login/signUp', async (userData, { rejectWithValue }) => {
    try {
        console.log('createAsyncThunk ', userData);

        const res = await authService.register(userData);

        if (res.status === 200) {
            tokenService.setUser(res.data.user);

            return res.data;
        } else if (res.status !== 501) {
            return rejectWithValue(res.data.message);
        }
        // redirect to page 404 not found
        // D.ace:todo
    } catch (error) {
        return rejectWithValue(error);
    }
});

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        authenticate: (state, action) => {
            state.isAuthenticated = false;
        },
        signOut: (state, action) => {
            state.isAuthenticated = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.message = '';
        });
        builder.addCase(signIn.rejected, (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message;
        });

        builder.addCase(signUp.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.message = '';
        });
        builder.addCase(signUp.rejected, (state, action) => {
            state.isLoading = false;
            state.message = action.payload;
            state.isAuthenticated = false;
        });
    },
});

// Select state user from slice
export const selectUser = (state) => state.userInfo.user;
export const selectLoading = (state) => state.userInfo.isLoading;
export const selectIsAuthenticated = (state) => state.userInfo.isAuthenticated;
export const selectMessage = (state) => state.userInfo.message;

// export action
export const { authenticate, signOut } = loginSlice.actions;

// export reducer
const { reducer } = loginSlice;
export default reducer;
