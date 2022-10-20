import React,{useEffect} from 'react';
import AuthContext from '../context/AuthProvider';
import "../ProfileCircle.css";
import ProfileImage from '../assets/images/profilePic.jpg';

export default function ProfileCircle () {
  const {auth}= React.useContext(AuthContext);


  return (
    <>
  
    <div class="d-flex justify-content-center h-100">
    <div class="image_outer_container">
        <div class="green_icon"></div>
        <div class="image_inner_container">
            <img src={ window.localStorage.getItem(auth.name) ? window.localStorage.getItem(auth.name) : ProfileImage } alt = "profile"/>
        </div>
    </div>
</div>

</>
  )
}
