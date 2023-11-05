import { createSlice } from "@reduxjs/toolkit";
const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        postsCount: null,
        postCate: [],
    },
    reducers: {
        setPost(state, action) {
            state.posts = action.payload;
        },
        setPostCount(state, action) {
            state.postsCount = action.payload;
        },
        setPostCate(state, action) {
            state.postCate = action.payload;
        },
    },

});

const postReducer = postSlice.reducer;
const postActons = postSlice.actions;
export {
    postActons, postReducer
}