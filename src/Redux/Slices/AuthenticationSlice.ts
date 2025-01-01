import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from '../../Axios/axiosInstance';
import { AxiosError } from 'axios';

// Login Async Thunk
export const login = createAsyncThunk<
    { token: string; user: User }, // Fulfilled payload
    { email: string; password: string }, // Input arguments
    { rejectValue: string } // Rejected payload
>("/login", async (credentials, thunkAPI) => {
    try {
        const response = await axiosInstance.post("/login", credentials);
        localStorage.setItem("accessToken", response.data.accessToken);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        } else {
            return thunkAPI.rejectWithValue("An unexpected error occurred");
        }
    }
});
// Signup Async Thunk
export const signup = createAsyncThunk<{message: string},{name: string, email: string, password: string},{rejectValue: string}>('auth/signup', async (userData, thunkAPI) => {
    try {
        const response = await axiosInstance.post('/auth/signup', userData);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Signup failed');
        } else {
            return thunkAPI.rejectWithValue('An unexpected error occurred');
        }
    }
});

// Forgot Password Async Thunk
export const forgotPassword = createAsyncThunk<{message: string},{email: string}, {rejectValue: string}>('auth/forgotPassword', async (email, thunkAPI) => {
    try {
        const response = await axiosInstance.post('/auth/forgot-password', { email });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Forgot Password failed');
        } else {
            return thunkAPI.rejectWithValue('An unexpected error occurred');
        }
    }
});

// Verify OTP Async Thunk
export const verifyOTP = createAsyncThunk<{message: string}, {email: string, otp: string}, {rejectValue: string}>('auth/verifyOTP', async (otpData, thunkAPI) => {
    try {
        const response = await axiosInstance.post('/auth/verify-otp', otpData);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Verify OTP failed');
        } else {
            return thunkAPI.rejectWithValue('An unexpected error occurred');
        }
    }
});

// Update Password Async Thunk
export const updatePassword = createAsyncThunk<{message: string}, {email: string, password: string, confirmPassword: string}, {rejectValue: string}>('auth/updatePassword', async (passwordData, thunkAPI) => {
    try {
        const response = await axiosInstance.post('/auth/update-password', passwordData);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Update Password failed');
        } else {
            return thunkAPI.rejectWithValue('An unexpected error occurred');
        }
    }
});

interface User {
    name: string;
    email: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null,
};

const authenticationSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutRequest: (state) => {
            state.loading = false;
            state.error = null;
            state.token = "";
            state.user = null; // Add user nullification for logout
            localStorage.removeItem('accessToken');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string, user: User }>) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(
                login.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error = action.payload || "Login failed";
                }
            );

        // Signup
        builder
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(signup.fulfilled, (state) => {
                state.loading = false;
                state.error = "";
            })
            .addCase(signup.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || 'Signup failed';
            });

        // Forgot Password
        builder
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.loading = false;
                state.error = "";
            })
            .addCase(forgotPassword.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || 'forgot password failed';
            });

        // Verify OTP
        builder
            .addCase(verifyOTP.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(verifyOTP.fulfilled, (state) => {
                state.loading = false;
                state.error = "";
            })
            .addCase(verifyOTP.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || 'Verify otp failed';
            });

        // Update Password
        builder
            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(updatePassword.fulfilled, (state) => {
                state.loading = false;
                state.error = "";
            })
            .addCase(updatePassword.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || 'update password failed';
            });
    },
});

export const { logoutRequest } = authenticationSlice.actions;
export default authenticationSlice.reducer;
