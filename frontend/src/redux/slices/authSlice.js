import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo")) : null,
        registerMassage: null,
    },
    reducers: {
        login(state, action) {
            state.user = action.payload;
        },
        logout(state) {
            state.user = null;
        },
        register(state, action) {
            state.registerMassage = action.payload;
        },
        setUserPhoto(state, action) {
            state.user.profilePhoto = action.payload;
        },
    }
});

const authReducer = authSlice.reducer;
const authActons = authSlice.actions;
export {
    authActons, authReducer
}