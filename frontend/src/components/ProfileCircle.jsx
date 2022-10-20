import React,{useEffect} from 'react';
import AuthContext from '../context/AuthProvider';
import "../ProfileCircle.css";
import ProfileImage from '../assets/images/profilePic.jpg';

export default function ProfileCircle () {
  const {auth}= React.useContext(AuthContext);
  const [loader, setLoader] = React.useState(false);




  return (
    <>
  
    <div class="d-flex justify-content-center h-100">
    {loader ?
    <div class="image_outer_container">
        <div class="green_icon"></div>
        <div class="image_inner_container">
            <img src={ window.localStorage.getItem(auth.name) ? window.localStorage.getItem(auth.name) : ProfileImage } alt = "profile"/>
        </div>
    </div>
     :  <div class="ui active centered inline loader" style={{marginTop:'0.7rem'}}></div>}
</div>

</>
  )
}
