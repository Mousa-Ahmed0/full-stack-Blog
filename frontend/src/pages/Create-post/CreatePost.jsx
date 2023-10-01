import { useState } from 'react';
import './CreatePost.css'
import {  toast } from 'react-toastify';
const CreatePost = () => {
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [category,setCategory]=useState("");
    const [file,setFile]=useState("");

    //Form submit handler
    const forSubmitHandler=(e)=>{
        e.preventDefault();
        if(title.trim()==="") return toast.error("Post Title is required");
        if(description.trim()==="") return toast.error("Post description is required");
        if(category.trim()==="") return toast.error("Post category is required");
        if(!file) return toast.error("Post File is required");

        const formData=new FormData();
        formData.append('title',title);
        formData.append('description',description);
        formData.append('category',category);
        formData.append('image',file);
        //@TO-Do send from data to server
        console.log({title,description,category,file});
    }
    return ( 
        <section className=" create-post">
            <h1 className="create-post-title">
                Create New Post
            </h1>
            <form action="" onSubmit={forSubmitHandler} className="create-post-form">
                <input type="text" className="create-post-input" 
                    placeholder='Post Title'
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                />
                <select className="create-post-input"   
                        value={category}
                        onChange={(e)=> setCategory(e.target.value)}
                    >
                    <option value="" disabled>
                        Select A Category
                    </option>
                    <option value="music">music</option>
                    <option value="coffee">coffee</option>
                </select>
                <textarea  rows="5" className="create-post-textarea" placeholder="Post Description"
                      value={description}
                      onChange={(e)=> setDescription(e.target.value)}
                ></textarea>
                <input type="file" name="file" id="file" className="create-post-upload" 
                      onChange={(e)=> setFile(e.target.files[0])}
                />
                <button type="submit" className="create-post-btn">Create</button>
            </form>
        </section>
     );
}
 
export default CreatePost;