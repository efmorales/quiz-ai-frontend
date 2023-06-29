import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../lib/Axios';

export const registerUser = createAsyncThunk(
    'users/registerUser',
    async (data, { rejectWithValue }) => {
        try {
            const response = await Axios.post('/users/register', data);
            console.log(response);
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (data, { rejectWithValue }) => {
        try {
            const response = await Axios.post('/users/login', data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        email: '',
        username: '',
        password: '',
        message: '',
        token: '',
        isLoggedIn: false,
        isLoading: false,
        isError: false,
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = action.payload.message;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
            .addCase(loginUser.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = action.payload.message;
                state.token = action.payload.token;
                state.isLoggedIn = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
    }
});

export const { setEmail } = usersSlice.actions;

export default usersSlice.reducer;