import { Link, useParams } from "react-router-dom";
import { posts } from "../../dummyData";
import './PostDetails.css'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddComment from "../../components/addComment/AddComment";
import CommitList from "../../components/addComment/CommitList";
import swal from "sweetalert";
const PostDetails = () => {
    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);

    const { id } = useParams();
    const post = posts.find(p => p._id === parseInt(id));
    const [file,setFile]=useState(null);

    const updateImageHandler=(e)=>{
        e.preventDefault();
        if(!file) return toast.warning("There is no file!");

    }

    //delete post handler
    const deleteHandler=()=>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Post has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Something went wrong!");
            }
          });
    }
    return (
        <section className="post-details">
            <div className="post-details-image-wrapper">
                <img src={file ? URL.createObjectURL(file):post.image} alt="" className="post-details-image" />
            <form  onSubmit={updateImageHandler}  className="update-post-image-form">
                <label htmlFor="file" className="update-post-label">
                    <i className="bi bi-image-fill">
                        Select new image
                    </i>
                </label>
                <input type="file" style={{display:'none'}} name="file" id="file"
                    onChange={(e)=>setFile(e.target.files[0])}
                />
                <button type="submit">upload</button>
            </form>
            </div>
            <h1 className="post-details-title">{post.title}</h1>
            <div className="post-details-user-info">
                <img src={post.user.image} alt="" className="post-details-user-image" />
                <div className="post-details-user">
                    <strong>
                        <Link to='/profile/1'>{post.user.username}</Link>
                        
                    </strong>
                    <span>{post.createdAt}</span>
                </div>
            </div>
            <p className="post-details-description">
                {post.description}
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit laboriosam quia voluptate veritatis eum. Maiores veniam saepe quidem laboriosam accusantium animi odio totam provident ea perferendis temporibus, earum voluptate laudantium?
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium perspiciatis ducimus sed. Delectus dolor iste fugit animi voluptatum harum sed quo commodi esse eaque? Facere recusandae perferendis fuga magnam fugiat?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, ullam repellat! Culpa voluptas minus rerum perspiciatis enim tempora asperiores ea, qui laudantium, quidem necessitatibus vero! Tenetur atque veniam iste quisquam.

            </p>
            <div className="post-details-icon-wrapper">
                <i className="bi bi-hand-thumbs-up"><small>{post.likes.length} likes</small></i>
                
                <div>
                    <i className="bi bi-pencil-square"></i>
                    <i onClick={deleteHandler} className="bi bi-trash-fill"></i>
                </div>
            </div>
           <AddComment/>
           <CommitList/>
        </section>
    );
}

export default PostDetails;