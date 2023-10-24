import request from "../../utils/request";
import { authActons } from "../slices/authSlice";
import {toast} from "react-toastify";
//Login user
export function loginuser(user){
    return async(dispatch)=>{
        try{
            // const response=await fetch('http://localhost:5000/api/auth/login',{
            //     method:"POST",
            //     body:JSON.stringify(user),
            //     headers:{'Content-Type':"application/json"}
            // })
            // const data =await response.json();

            const {data}=await request.post('/api/auth/login',user)

            dispatch(authActons.login(data));
            localStorage.setItem('userInfo',JSON.stringify(data));

        }catch(error){
            toast.error(error.response.data.message);
        }
    }
}