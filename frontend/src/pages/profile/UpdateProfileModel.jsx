import { useState } from 'react';
import './UpdateProfileModal.css'
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/apiCalls/profileApi';
 
const user = {
    username: "Yousef",
    bio: "Hello my name is yousef"
}
const UpdateProfileModal = ({ setUpdateProfile, profile }) => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState(profile.username);
    const [bio, setBio] = useState(profile.bio);
    const [password, setPassword] = useState("");

    //form submit handler
    const forSubmitHandler = (e) => {
        e.preventDefault();
        const updateUser = { username, bio,password }
        if (password.trim() === "") updateUser.password = password;
        dispatch(updateProfile(profile?.id, updateUser));
        setUpdateProfile(false);
    }
    return (
        <div className="update-profile">
            <form onSubmit={forSubmitHandler} className="update-profile-form">
                <abbr title='close'>
                    <i className="bi bi-x-circle-fill update-profile-form-close"
                        onClick={() => setUpdateProfile(false)}
                    ></i>
                </abbr>
                <h1 className="update-profile-title" >Update your profile</h1>

                <input type="text" value={username} placeholder='Username'
                    onChange={(e) => setUsername(e.target.value)}
                    className="update-profile-input"
                />

                <input type="text" value={bio} placeholder='Bio'
                    onChange={(e) => setBio(e.target.value)}
                    className="update-profile-input"
                />

                <input type="text" value={password} placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    className="update-profile-input"
                />

                <button type='submit' className="update-profile-btn">Update profile</button>
            </form>
        </div>

    );
}

export default UpdateProfileModal;