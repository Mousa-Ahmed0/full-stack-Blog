import './Profile.css';
import PostList from '../../components/posts/PostList';
import {posts} from '../../dummyData';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import swal from "sweetalert";
import UpdateProfileModal from './UpdateProfileModel';

const Profile = () => {
    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);

    const [file,setFile]=useState(null);
    const [updateProfile,setUpdateProfile]=useState(false);
    //form submit handler
    const formSubmitHandler =(e)=>{
        e.preventDefault();
        if(!file) return toast.warning("Ther is no file!");
        console.log("Image uploaded");
    }

    //delete Account handler
    const deleteAccountHandler=()=>{
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this Profile!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        })
        .then((willDelete) => {
        if (willDelete) {
            swal("Account has been deleted!", {
            icon: "success",
            });
        } else {
            swal("Something went wrong!");
        }
        });
    }
    return ( 
        <section className="profile">
            <div className="profil-header">
                <div className="profile-image-wrapper">
                    <img src={file ? URL.createObjectURL(file):"/images/user-avatar.png"}  className="profile-image" />
                    <form  onSubmit={formSubmitHandler}>
                        <abbr title="Choose profile photo">
                            <label htmlFor="file" className='bi bi-camera-fill upload-profile-photo-icon'></label>
                        </abbr>
                        <input type="file" 
                            style={{display:'none'}} id='file' name='file' 
                            onChange={(e)=>setFile(e.target.files[0])}
                        />
                        <button type="submit" className='upload-profile-photo-btn'>Upload</button>
                    </form>
                </div>
                <h1 className="profile-username">Youssef Abbas</h1>
                <p className="profile-bio">
                    Hello my name is Youssef,I am a web Developer
                </p>
                <div className="user-date-joined">
                    <strong>Date Joined:</strong>
                    <span>Fri Nov 04 2023</span>
                </div>
                <button onClick={()=>setUpdateProfile(true)} className="profil-update-btn">
                    <i className="bi bi-file-person-fill">Update Profile</i>
                </button>
            </div>
            <div className="profile-posts-list">
                    <h2 className='profile-posts-list-title'>Youssef Posts</h2>
                    <PostList posts={posts}/>
                </div>
            <button onClick={deleteAccountHandler} type='submit' className="delete-account-btn">
                Delete Your Account
            </button>
            {updateProfile && ( <UpdateProfileModal  setUpdateProfile={setUpdateProfile}/>)}
        </section>
     );
}
 
export default Profile;