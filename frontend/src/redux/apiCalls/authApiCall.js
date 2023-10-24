import request from "../../utils/request";
import { authActons } from "../slices/authSlice";
import { toast } from "react-toastify";
//Login user
export function loginuser(user) {
    return async (dispatch) => {
        try {
            const { data } = await request.post('/api/auth/login', user)

            dispatch(authActons.login(data));
            localStorage.setItem('userInfo', JSON.stringify(data));

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

//Logout user
export function logoutuser() {
    return async (dispatch) => {
        dispatch(authActons.logout());
        localStorage.removeItem('userInfo');
    }
}

//Register user
export function registerUser(user) {
    return async (dispatch) => {
        try {
            const { data } = await request.post('/api/auth/register', user);
            dispatch(authActons.login(data.message));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}
