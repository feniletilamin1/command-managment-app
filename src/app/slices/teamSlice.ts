import {PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {TeamStateType } from "../../Types/StoreTypes";
import axios, { AxiosError } from "axios";
import { TeamCardType } from "../../Types/ModelsType";
import {MessageResponseType, TeamDto } from "../../Types/ResponseTypes";
import { useUserCookies } from "../../hooks/useUserCokies";

const initialState: TeamStateType = {
    cards: [],
    isLoading: false,
    Error: null,
}

export const getTeamsAsync = createAsyncThunk(
    'getProjects',
     async (_, {rejectWithValue}) => {
        const token = useUserCookies();
        try {
            const response = await axios.get<TeamCardType[]>('https://localhost:7138/api/Teams/GetTeams/', 
            {
            headers: {
                'Authorization': 'Bearer ' + token
            }
            })     
            return response.data;
        }
        catch(e) {
            const error = e as AxiosError<MessageResponseType>;
            console.error(error);
            return rejectWithValue(error.message);
        }
    } 
);


export const teamSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addTeam: (state, action:PayloadAction<TeamCardType>) => {
            state.cards.push(action.payload);
        },
        deleteTeam: (state, action:PayloadAction<number>) => {
            state.cards = state.cards.filter(c => c.id !== action.payload);
        },
        clearTeams: (state) => {
            state.Error = null;
            state.cards = [];
            state.isLoading = false;
        },
        updateTeam: (state, action:PayloadAction<TeamDto>) => {
            const teamIndex = state.cards.findIndex(p => p.id == action.payload.id);
            state.cards[teamIndex].teamName = action.payload.teamName!;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getTeamsAsync.pending, (state) => {
            state.isLoading = true;
            state.Error = null;
        })
        .addCase(getTeamsAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cards = action.payload;
        })
        .addCase(getTeamsAsync.rejected, (state, action) => {
            console.log(action.error);
            state.Error = action.payload as string;
            state.isLoading = false;
        })
    }
});

export const { addTeam, deleteTeam, clearTeams, updateTeam} = teamSlice.actions;

export default teamSlice.reducer;
