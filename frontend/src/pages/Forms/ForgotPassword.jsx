import { Link } from "react-router-dom";
import './form.css'
import { useState } from "react";
import { toast } from "react-toastify";
 
const ForgotPassword = () => {
    const [email,setEmail]=useState("");

    //form submit handler
    const formSubmitHandler =(e)=>{
        e.preventDefault();
        if(email.trim()==='') return toast.error("Email is required");
        console.log({email});
    }
    return ( 
        <section className="form-container">
            <h1 className="form-title">Forgot Password</h1>
            <form onSubmit={formSubmitHandler} className="form">
          
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-input" id="email" placeholder="Enter your email" 
                        value={email} onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
         
                <button type="submit" className="form-btn">Submit</button>
            </form>
     
        </section>
     );
}
 
export default ForgotPassword;