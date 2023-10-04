import { useState } from 'react';
import './UpdatePostModal.css'
import {  toast } from 'react-toastify';

const UpdatePostModal = ({setUpdatePost , post}) => {

    const [title,setTitle]=useState(post.title);
    const [description,setDescription]=useState(post.description);
    const [category,setCategory]=useState(post.category);

    //form submit handler
    const forSubmitHandler=(e)=>{
        e.preventDefault();
        if(title.trim()==="") return toast.error("Post Title is required");
        if(description.trim()==="") return toast.error("Post description is required");
        if(category.trim()==="") return toast.error("Post category is required");
        console.log({title,description,category});
    }
    return (  
        <div className="update-post">
            <form onSubmit={forSubmitHandler} className="update-post-form">
                <abbr title='close'>
                    <i className="bi bi-x-circle-fill update-post-form-close"
                        onClick={()=>setUpdatePost(false)}
                    ></i>
                </abbr>
                <h1 className="update-post-title" >Update Post</h1>
                <input type="text" value={title} 
                    onChange={(e)=>setTitle(e.target.value)} 
                    className="update-post-input" 
                />
                <select className='update-post-input' value={category} onChange={(e)=>setCategory(e.target.value)}>
                    <option disabled >Select A Category</option>
                    <option value="music">music</option>
                    <option value="travelling">Travelling</option>
                </select>
                <textarea className='update-post-textarea' rows="5" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                <button type='submit' className="update-post-btn">Update Post</button>
            </form>
        </div>
    );
}
 
export default UpdatePostModal;