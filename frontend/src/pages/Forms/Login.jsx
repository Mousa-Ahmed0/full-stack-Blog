import { Link } from "react-router-dom";
import './form.css'
import { useState } from "react";
import { toast } from "react-toastify";
import {useDispatch} from 'react-redux';
import { loginuser } from "../../redux/apiCalls/authApiCall";

const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const dispatch=useDispatch();
    //form submit handler
    const formSubmitHandler =(e)=>{
        e.preventDefault();
        if(email.trim()==='') return toast.error("Email is required");
        if(password.trim()==='') return toast.error("Password is required");
        dispatch(loginuser({email,password}));
    }
    return ( 
        <section className="form-container">
            <h1 className="form-title">Login to your account</h1>
            <form onSubmit={formSubmitHandler} className="form">
          
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-input" id="email" placeholder="Enter your email" 
                        value={email} onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-input" id="password" placeholder="Enter your password" 
                        value={password} onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="form-btn">Login</button>
            </form>
            <div className="form-footer">
                Did you forgot your password? <Link to='/forgot-password'>Forgot Password</Link>
            </div>
        </section>
     );
}
 
export default Login;