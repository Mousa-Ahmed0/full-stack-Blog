import AdminSidebar from './AdminSidebar';
import swal from "sweetalert";
import './AdminTables.css'
const CategoriesTable = () => {
    //delete user handler
    const deleteHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Categories!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Categories has been deleted!", {
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
                <h1 className="table-title">Categories</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>category Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1,2,3].map((item) => (
                            <tr key={item}>
                                <td>{item}</td>
                                <td>
                                    <b>music</b>
                                </td>
                             
                                <td>
                                    <div className="table-button-group">
                                     
                                        <button onClick={deleteHandler}>Delete category</button>
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

export default CategoriesTable;
