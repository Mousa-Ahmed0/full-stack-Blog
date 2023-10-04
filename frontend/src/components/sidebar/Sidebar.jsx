import { Link } from 'react-router-dom';
import './Sidebar.css'
const Sidebar = ({categoties}) => {
    return (  
        <div className="sidebar">
            <h5 className="sidebar-title">CATEGORIES</h5>
            <ul className="sidebar-links">
                {categoties.map((categoties)=>(
                    <Link className='sidebar-link' key={categoties._id}
                    to={`/posts/categories/${categoties.title}`}>
                        {categoties.title}
                        
                    </Link>
                ))}
            </ul>
        </div>
    );
}
 
export default Sidebar;