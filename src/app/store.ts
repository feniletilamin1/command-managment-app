import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import projectReducer from "./slices/teamSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        teams: projectReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

   