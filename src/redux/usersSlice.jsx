import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../lib/Axios';
// import { setHeaderToken } from '../lib/setHeaderToken';
import { checkAuthToken } from '../lib/checkAuthToken';

export const registerUser = createAsyncThunk(
    'users/registerUser',
    async (data, { rejectWithValue, dispatch }) => {
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
            console.log(response);
            console.log(response.data);

            localStorage.setItem('jwtToken', response.data.token);
            // setHeaderToken(response.data.token);
            checkAuthToken();

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'users/logoutUser',
    async (data, { rejectWithValue }) => {
        try {

            //logout without axios call
            localStorage.removeItem('jwtToken');

            checkAuthToken();


            return {
                message: 'Logout success',
            };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const analyzeQuiz = createAsyncThunk(
    'users/analyzeQuiz',
    async (data, { rejectWithValue }) => {
        try {
            const response = await Axios.post('/quiz-analysis/analyze', data);
            console.log(response);
            console.log(response.data);

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
        quizResults: [],
        isQuizAnalyzed: false,
        _id: '',
        
    },
    reducers: {
        setUser: (state, action) => {
            return {
                ...action.payload,
                password: '',
            }
        },
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
                state.username = action.payload.user.username;
                state.email = action.payload.user.email;
                state._id = action.payload.user._id;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
            .addCase(analyzeQuiz.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(analyzeQuiz.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.quizResults.push(action.payload.analysis);
                state.isQuizAnalyzed = true;
            })
            .addCase(analyzeQuiz.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
            .addCase(logoutUser.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = action.payload.message;
                state.token = '';
                state.isLoggedIn = false;
                state.username = '';
                state.email = '';
                state._id = '';
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })

    }
});

export const { setUser } = usersSlice.actions;

export default usersSlice.reducer;