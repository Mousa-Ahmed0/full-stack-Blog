import { useState } from 'react';
import './CommitList.css'
import swal from "sweetalert";
import UpdateComment from './UpdateComment';
const CommitList = () => {
  const [updateComment, setUpdateComment] = useState(false);

  //delete Comment handler
  const deleteHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Comment has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Something went wrong!");
        }
      });
  }

  return (
    <div className="comment-list">
      <h4 className="comment-list-count">2 Comments</h4>
      {[1, 2].map(comment =>
        <div className="comment-item" key={comment}>
          <div className="comment-item-info">
            <div className="comment-item-username">Mousa Ahmed</div>
            <div className="comment-item-time">2 hours ago</div>
          </div>
          <p className="comment-item-text">
            hello this is amazing
          </p>
          <div className="comment-item-icon-wrapper">
            <i onClick={() => setUpdateComment(true)} className="bi bi-pencil-square"></i>
            <i onClick={deleteHandler} className="bi bi-trash-fill"></i>
          </div>
        </div>
      )}
      {updateComment && <UpdateComment setUpdateComment={setUpdateComment} />}
    </div>
  );
}

export default CommitList;