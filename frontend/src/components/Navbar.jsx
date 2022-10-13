import React,{useContext} from 'react'
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthProvider';
import DeleteUserBtn from './DeleteUserBtn';
import '../App.css';
import ProfileCircle from './ProfileCircle';

function Navbar() {
    const {auth, setAuth} = useContext(AuthContext);
    const {logAsNum, setLogAsNum} = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = () => {
        window.localStorage.removeItem('auth');
        window.localStorage.removeItem('logAsNum');
        window.localStorage.removeItem('error');
        setAuth({});
        setLogAsNum(logAsNum - 1);
        navigate('/logout=true' , {state : {logout : auth.name + `, you have been logged out.`}});
    }

    return (
        <>
            <div>
                <nav className="Navbar" style={{margin:'0',position:'fixed',top:'-1rem',left:'-1rem',width:'100%',height:'5rem',opacity:'0.7',backgroundColor:'#f0f8ff',display:'flex',alignItems:'center',justifyContent:'center',zIndex:'10000'}}>  
                <div style={{position:'absolute',left:'3rem'}}>
                        <a href="/" style={{textDecoration:'none',color:'black',fontSize:'1.5rem',fontWeight:'bold'}}>FutureStory</a>
                    </div>
                    <div style={{position:'absolute',right:'3rem',top:"1.6rem"}}>
                    {auth?.name !== undefined ? <DeleteUserBtn auth = {auth} logout = {logout}/>: null} 
                    </div>

                    <div style={{position:'absolute',left:'14rem',top:"0.9rem"}} onClick = {() => navigate('/profile')}>
                    {auth?.name !== undefined ? <ProfileCircle/>: null} 
                    </div>

                    <div style={{position:'relative',left:'-10rem',top:'0.2rem'}}>
                        <a href="/" style={{textDecoration:'none',color:'green',fontSize:'1rem',fontWeight:'bold'}}>Online : {logAsNum > 0 ? logAsNum : 0}</a>
                    </div>
                    <ul className='ul' style={{position:'relative',left:'-2rem',top:'0.2rem'} }>
                        <li onClick={() => navigate('/home')} className="li">
                            Home
                        </li>
                   
                       {auth?.name === undefined ? <li onClick={() => navigate('/register')} className="li">
                           Sign Up
                        </li> : null}


                        {auth?.name === undefined ? <li onClick={() => navigate('/login')} className="li">
                           Log In
                        </li> : null}

                        {auth?.name !== undefined ?<li className="li" onClick={() => logout()} >
                            Log Out
                        </li>  : null}

                        {auth?.name === undefined ? <li onClick={() => navigate('/forgotPassword')} className="li">
                            Forgot Password </li> : null}

                      {auth?.name !== undefined ? <li onClick={() => navigate('/profile')} className="li"> My Profile </li>
                      : null}

                    </ul>

                </nav>
            </div>
        </>

    )
}

export default Navbar
