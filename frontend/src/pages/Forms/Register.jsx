import { Link } from "react-router-dom";

const Register = () => {
    return ( 
        <section className="form-container">
            <h1 className="form-title">Create new account</h1>
            <form  className="form">
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-input" id="username" placeholder="Enter your username" />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-input" id="email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-input" id="password" placeholder="Enter your password" />
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