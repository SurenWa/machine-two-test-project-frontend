import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";


// Get user from localStorage
const userFromLocalStorage = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: userFromLocalStorage ? userFromLocalStorage : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}


//register action
export const registerUserAction = createAsyncThunk(
    "auth/register",
    async (user, { rejectWithValue, getState, dispatch }) => {
        //console.log(user)
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        //http call
        try {
            const response = await axios.post(
                '/api/register',
                user,
                config
            );
            if(response.data) {
                //save user into local storage
                localStorage.setItem("user", JSON.stringify(response.data.token));
            }  
            //const successMessage = (response.data && response.data.message)
            //console.log(response.data)
            //return successMessage;          
            return response.data;
        } catch (error) {
            // if (!error.response) {
            //     throw error;
            // }
            //console.log(error.response.data)
            const message =
                (error.response &&
                    error.response.data) 
                //     &&
                //     error.response.data.message) ||
                // error.message ||
                // error.toString()
            return rejectWithValue(message);
        }
    }
);

//login action
export const loginUserAction = createAsyncThunk(
    "auth/login",
    async (user, { rejectWithValue, getState, dispatch }) => {
        //console.log(user)
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        //http call
        try {
            const response = await axios.post(
                '/api/login',
                user,
                config
            );
            if(response.data) {
                //save user into local storage
                localStorage.setItem("user", JSON.stringify(response.data.token));
            }  
            //const successMessage = (response.data && response.data.message)
            //console.log(response.data)
            //return successMessage;          
            return response.data;
        } catch (error) {
            // if (!error.response) {
            //     throw error;
            // }
            //console.log(error.response.data)
            const message =
                (error.response &&
                    error.response.data) 
                //     &&
                //     error.response.data.message) ||
                // error.message ||
                // error.toString()
            return rejectWithValue(message);
        }
    }
);


//slices
const authSlices = createSlice({
    name: "users",
    initialState,
    // reducers: {
    //     reset: (state) => {
    //       state.isLoading = false
    //       state.isSuccess = false
    //       state.isError = false
    //       state.message = ''
    //     },
    // },
    extraReducers: builder => {
        //register
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.isLoading = true;
            // state.appErr = undefined;
            // state.serverErr = undefined;
        });
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            state.message = action.payload
        });
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        });
        //login
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.isLoading = true;
            // state.appErr = undefined;
            // state.serverErr = undefined;
        });
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            state.message = action.payload
        });
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        });
    },
});

//export const { reset } = authSlices.actions
export default authSlices.reducer;



