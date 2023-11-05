import request from "../../utils/request";
import { authActons } from "../slices/authSlice";
import { profileActons } from "../slices/profileSlice";
import { toast } from "react-toastify";
//Get user profile
export function getUserProfile(userId) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/users/Profile/${userId}`);

            dispatch(profileActons.setProfile(data));
        } catch (error) {
            // alert(error.response.data.message);
            toast.error(error.response.data.message);
        }
    }
}

//Upload  profile photo 
export function uploadProfilePhoto(newPhoto) {
    return async (dispatch, getState) => {
        try {

            const { data } = await request.post(`/api/users/Profile/profile-photo-upload`, newPhoto, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type": "multipart/foem-data"
                }
            });
            console.log(data);

            dispatch(authActons.setUserPhoto(data.profilePhoto));
            dispatch(profileActons.setProfilePhoto(data.profilePhoto));
            toast.success(data.message);

            //modify the user in local storage
            const user = JSON.parse(localStorage.getItem("userInfo"));
            user.profilePhoto=data?.profilePhoto;
            localStorage.setItem("userInfo",JSON.stringify(user));

        } catch (error) {
            // if (error.response) {
                toast.error(error.response.data.message); 
            // }
        }
    }
}


//update  profile  
export function updateProfile(userId,profile) {
    return async (dispatch, getState) => {
        try {

            const { data } = await request.put(`/api/users/Profile/${userId}`, profile, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            console.log(data);

            dispatch(profileActons.updateProfile(data));
            dispatch(authActons.setUserName(data.username));

            //modify the user in local storage with new  username
            const user = JSON.parse(localStorage.getItem("userInfo"));
            user.username=data?.username;
            localStorage.setItem("userInfo",JSON.stringify(user));

        } catch (error) {
            // if (error.response) {
                toast.error(error.response.data.message); 
            // }
        }
    }
}