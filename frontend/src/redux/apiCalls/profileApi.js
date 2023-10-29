import request from "../../utils/request";
import { profileActons } from "../slices/profileSlice";
import { toast } from "react-toastify";
//Get user profile
export function getUserProfile(userId) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/users/Profile/${userId}`);

            dispatch(profileActons.setProfile(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

//Get user profile
export function getUserProfile(userId) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/users/Profile/${userId}`);

            dispatch(profileActons.setProfile(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}