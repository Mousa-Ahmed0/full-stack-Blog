import { Link } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import swal from "sweetalert";
import './AdminTables.css'
const UsersTable = () => {
        //delete user handler
        const deleteHandler=()=>{
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this User!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                  swal("User has been deleted!", {
                    icon: "success",
                  });
                } else {
                  swal("Something went wrong!");
                }
              });
        }
    return ( 
        <section className="table-container">
            <AdminSidebar/>
            <div className="table-wrapper">
                <h1 className="table-title">Users</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1,2,3,4,5,6,7,8,9,10].map(item=>(
                            <tr key={item}>
                                <td>{item}</td>
                                <td>
                                    <div className="table-image">
                                        <img src='/images/user-avatar.png'alt='' className='table-user-image'/>
                                        <span className="table-username">Yousef Abbas</span>
                                    </div>
                                </td>
                                <td>youssef@email.com</td>
                                <td>
                                    <div className="table-button-group">
                                        <button>
                                            <Link to={`/profile/1`}>View Profile</Link>
                                        </button>
                                        <button onClick={deleteHandler}>Delete User</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
     );
}
 
export default UsersTable;