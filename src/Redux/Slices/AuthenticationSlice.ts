import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from '../../Axios/axiosInstance';
import { AxiosError } from 'axios';

interface LoginResponse {
    status: boolean; message: string, name: string, refreshToken: string, accessToken: string, id: string
}
interface LoginCredentials {
    email: string; password: string 
}
// Login Async Thunk
export const login = createAsyncThunk<
LoginResponse, // Fulfilled payload
LoginCredentials, // Input arguments
    { rejectValue: string } // Rejected payload
>("/login", async (credentials, thunkAPI) => {
    try {
        const response = await axiosInstance.post("/login", credentials);
        console.log('response ', response)
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
export const signup = createAsyncThunk<{message: string},{name: string, email: string,number: string, password: string},{rejectValue: string}>('/signup', async (userData, thunkAPI) => {
    try {
        const response = await axiosInstance.post('/signup', userData);
        console.log('res', response)
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
export const forgotPassword = createAsyncThunk<{message: string},{email: string}, {rejectValue: string}>('/forgot-password', async (email, thunkAPI) => {
    try {
        console.log('email', email)
        const response = await axiosInstance.post('/forgot-password', email);
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
export const verifyOTP = createAsyncThunk<{message: string}, {email: string, otp: string}, {rejectValue: string}>('/verify-otp', async (otpData, thunkAPI) => {
    try {
        const response = await axiosInstance.post('/verify-otp', otpData);
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
  
}

interface AuthState {
    isAuthenticated: boolean;
    user: string | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    id: string | null
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null,
    id: null

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
            state.id = null

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<{ status: boolean; message: string, name: string, refreshToken: string, accessToken: string, id: string }>) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload?.accessToken;
                state.user = action.payload?.name;
                state.id = action.payload.id
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
