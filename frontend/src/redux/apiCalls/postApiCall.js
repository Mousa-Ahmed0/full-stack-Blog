import request from "../../utils/request";
import { postActons } from "../slices/postSlice";
import { toast } from "react-toastify";
//Get user profile
export function fetchPosts(pageNumber) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts?pageNumber=${pageNumber}`);

            dispatch(postActons.setPost(data));
        } catch (error) {
            // alert(error.response.data.message);
            toast.error(error.response.data.message);
        }
    }
}


//Get Post Count
export function getPostsCount() {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts/count`);

            dispatch(postActons.setPostCount(data));
        } catch (error) {
            // alert(error.response.data.message);
            toast.error(error.response.data.message);
        }
    }
}
