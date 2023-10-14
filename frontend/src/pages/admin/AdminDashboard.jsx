import AdminMain from "./AdminMain";
import AdminSidbar from "./AdminSidebar";
import './admin.css'
const AdminDashbord = () => {
    return ( 
        <section className="admin-dashbord">
            
            <AdminSidbar/>
            <AdminMain/>
        </section>
     );
}
 
export default AdminDashbord;