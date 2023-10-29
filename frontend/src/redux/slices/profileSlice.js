import { createSlice } from "@reduxjs/toolkit";
const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: null,
    },
    reducers: {
        setProfile(state,action){
            state.profile=action.payload;
        }
    }
});

const profileReducer = profileSlice.reducer;
const profileActons = profileSlice.actions;
export {
    profileActons, profileReducer
}