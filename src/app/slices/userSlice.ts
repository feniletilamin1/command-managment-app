import {PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {UserStateType } from "../../Types/StoreTypes";
import axios, { AxiosError } from "axios";
import { UserType } from "../../Types/ModelsType";
import Cookies from "universal-cookie";
import {MessageResponseType } from "../../Types/ResponseTypes";
import { useUserCookies } from "../../hooks/useUserCokies";


const initialState: UserStateType = {
    user: null,
    Error: null,
    isLoading: false,
}

const cookies = new Cookies();

export const getUserAsync = createAsyncThunk(
    'getUser',
     async (_, {rejectWithValue}) => {
        const token = useUserCookies();
        try {
            const response = await axios.get<UserType>(process.env.REACT_APP_SERVER_HOST + '/api/Authenfication/GetUser/', 
            {
            headers: {
                'Authorization': 'Bearer ' + token
            }
            })     
            return response.data;
        }
        catch(e) {
            const error = e as AxiosError<MessageResponseType>;
            return rejectWithValue(error.message);
        }
    } 
);


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logOutUser: (state) => {
            state.user = null;
            cookies.remove("jwt");
        },
        setUser: (state, action:PayloadAction<UserType>) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUserAsync.pending, (state) => {
            state.isLoading = true;
            state.Error = null;
        })
        .addCase(getUserAsync.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.Error = null;
        })
        .addCase(getUserAsync.rejected, (state, action) => {
            state.Error = action.payload as string;
            state.isLoading = false;
        })
    }
});

export const { logOutUser, setUser } = userSlice.actions;

export default userSlice.reducer;
