import { Link } from "react-router-dom";
import './form.css'
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";

const Register = () => {
    const dispatch =useDispatch(); 

    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    //form submit handler
    const formSubmitHandler =(e)=>{
        e.preventDefault();
        if(username.trim()==='') return toast.error("Username is required");
        if(email.trim()==='') return toast.error("Email is required");
        if(password.trim()==='') return toast.error("Password is required");
        dispatch(registerUser({username,email,password}));
    }
    return ( 
        <section className="form-container">
            <h1 className="form-title">Create new account</h1>
            <form onSubmit={formSubmitHandler} className="form">
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-input" id="username" placeholder="Enter your username" 
                        value={username} onChange={(e)=>setUsername(e.target.value)}
                    />
                </div>
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
                <button type="submit" className="form-btn">Register</button>
            </form>
            <div className="form-footer">
                Already have an account? <Link to='/login'>Login</Link>
            </div>
        </section>
     );
}
 
export default Register;