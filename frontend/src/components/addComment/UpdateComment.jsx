import { useState } from 'react';
import './UpdateComment.css'
import {  toast } from 'react-toastify';
const UpdateComment = ({setUpdateComment}) => {
    const [text,setText]=useState("This is so great");
  

    //form submit handler
    const forSubmitHandler=(e)=>{
        e.preventDefault();
        if(text.trim()==="") return toast.error("Post Title is required");
      
        console.log({text});
    }
    return (  
        <div className="update-comment">
            <form onSubmit={forSubmitHandler} className="update-comment-form">
                <abbr title='close'>
                    <i className="bi bi-x-circle-fill update-comment-form-close"
                        onClick={()=>setUpdateComment(false)}
                    ></i>
                </abbr>
                <h1 className="update-comment-title" >Edit Comment</h1>
                <input type="text" value={text} 
                    onChange={(e)=>setText(e.target.value)}
                    className="update-comment-input" 
                />

                <button type='submit' className="update-comment-btn">Edit Comment</button>
            </form>
        </div>
    );

}
 
export default UpdateComment;