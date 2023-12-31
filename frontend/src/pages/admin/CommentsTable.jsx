import AdminSidebar from './AdminSidebar';
import swal from "sweetalert";
import './AdminTables.css'
const CommentsTable = () => {
    //delete comments handler
    const deleteHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this comments!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("comments has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Something went wrong!");
                }
            });
    }
    return (
        <section className="table-container">
            <AdminSidebar />
            <div className="table-wrapper">
                <h1 className="table-title">Comments</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>User</th>
                            <th>Comment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1,2,3].map((item) => (
                            <tr key={item._id}>
                                <td>{item}</td>
                                <td>
                                    <div className="table-image">
                                        <img src='/images/user-avatar.png' alt='' className='table-user-image' />
                                        <span className="table-username">yousef addas</span>
                                    </div>
                                </td>
                                <td>Thank you for this post</td>
                                <td>
                                    <div className="table-button-group">
                                   
                                        <button onClick={deleteHandler}>Delete Comments</button>
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

export default CommentsTable;

