import { useState } from 'react';
import './AddComment.css';
import { toast } from 'react-toastify';
const AddComment = () => {
    const [text,setText]=useState("");
    //form submit handler
    const formHandler=(e)=>{
        e.preventDefault();
        if(text.trim()=== '') return toast.error("Please write something");
        console.log({text});
        setText("");

    }
    return (  
        <form  onSubmit={formHandler} className="add-comment">
            <input type="text" className="add-comment-input" 
                placeholder='Add a comment' value={text} 
                onChange={(e)=>setText(e.target.value)}
            />
            <button type='submit' className='add-comment-btn'>Comment</button>
        </form>
    );
}
 
export default AddComment;