import { Link } from 'react-router-dom';
import './admin.css'

const AdminSidbar = () => {
    return ( 
        <div className="admin-sidebar">
            <Link to='/admin-dashboard' className='admin-sidebar-title'>
                <i className="bi bi-columns"></i>
                Dashbord
            </Link>
            <ul className="admin-dashboard-list">
                <Link className='admin-sidebar-link'  to='/admin-dashboard/users-table'>
                    <i className="bi bi-person"></i>
                    Users
                </Link>
                <Link className='admin-sidebar-link' to='/admin-dashboard/Posts-table'>
                    <i className="bi bi-file-post"></i>
                    Posts
                </Link>
                <Link className='admin-sidebar-link' to='/admin-dashboard/categories-table'>
                    <i className="bi bi-tag-fill"></i>
                    Categories
                </Link>
                <Link className='admin-sidebar-link' to='/admin-dashboard/comments-table'>
                    <i className="bi bi-chat-left-text"></i>
                    Comments
                </Link>
            </ul>
        </div>
     );
}
 

export default AdminSidbar;