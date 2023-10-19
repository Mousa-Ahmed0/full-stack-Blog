import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
const HeaderRight = () => {
    const { user } = useSelector(state => state.auth);
    return (
        <div className="header-right">
            {user ? (
                <>
                    <div className="header-right-user-info">
                        <span className="header-right-username">
                            {user?.username}
                        </span>
                    </div>
                </>
            ) : <>
                <Link to="/login" className="header-right-link">
                    <i className="bi bi-box-aeeow-in-right"></i>
                    <span>Login</span>
                </Link>
                <Link to="/register" className="header-right-link">
                    <i className="bi bi-person-plus"></i>
                    <span>Register</span>
                </Link>
            </>}

        </div>
    );
}

export default HeaderRight;