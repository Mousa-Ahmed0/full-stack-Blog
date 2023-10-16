import './form.css'
import { useState } from "react";
import { toast } from "react-toastify";
 
const Resetpassword = () => {
    const [password,setPassword]=useState("");

    //form submit handler
    const formSubmitHandler =(e)=>{
        e.preventDefault();
        if(password.trim()==='') return toast.error("Password is required");
        console.log({password});
    }
    return ( 
        <section className="form-container">
            <h1 className="form-title">Reset Password</h1>
            <form onSubmit={formSubmitHandler} className="form">
                <div className="form-group">
                    <label htmlFor="password" className="form-label">New Password</label>
                    <input type="password" className="form-input" id="password" placeholder="Enter your new password" 
                        value={password} onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="form-btn">Submit</button>
            </form>
        </section>
     );
}
 
export default Resetpassword;