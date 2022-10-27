import React, { useContext } from 'react'
import { useNavigate} from "react-router-dom";
import AuthContext from '../context/AuthProvider';
import DeleteUserBtn from './DeleteUserBtn';
import '../App.css';
import ProfileCircle from './ProfileCircle';
import { useEffect } from 'react';
import homeWallpaper from '../assets/images/homeWallpaper.jpg';
import zakWallpaper from '../assets/images/wallpaper.jpg';
import Marquee from './Marquee';

function Navbar() {
    const { auth, setAuth } = useContext(AuthContext);
    const [checked, setChecked] = React.useState(false);
    const { logAsNum, setLogAsNum } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = () => {
        window.localStorage.removeItem('auth');
        window.localStorage.removeItem('logAsNum');
        window.localStorage.removeItem('error');
        window.localStorage.removeItem('member');
        window.localStorage.removeItem('profile');
        window.localStorage.removeItem('membership');
        setAuth({});
        setLogAsNum(logAsNum - 1);
        navigate('/logout=true', { state: { logout: auth.name + `, you have been logged out.` } });
    }

    const handleDeleteMembership = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode : 'cors',
        };
        await fetch(`http://localhost:8080/user/updateMembership?name=${auth.name}`, requestOptions)
        .then(res => res.json())
        .then(() => {
           logout();
        })
    }

    const alertAgreement = () => {
        const confirm = window.confirm("Are you sure you want to delete your membership?");
        if (confirm) {
            handleDeleteMembership();
        }
        else {
            console.log("nothing happaned");
        }

    }

    useEffect(() => {
        const off = document.getElementById("toggleOff");
        const on = document.getElementById("toggleOn");
        const nav = document.getElementsByClassName("Navbar")[0];
        const navHeader = document.getElementById("navHeader");
        const wallpaper = document.body;
        const navItems = document.getElementsByClassName("ul")[0];

   

        off.addEventListener("click", () => {
            setChecked(true);
            wallpaper.style.backgroundImage = `url(${zakWallpaper})`;
            wallpaper.style.backgroundPosition = "calc(50%) calc(50% - 2vh)";
            wallpaper.style.backgroundRepeat = "no-repeat";
            wallpaper.style.backgroundSize = "calc(100% + 3vw) calc(100% + 30vh)";
            nav.style.backgroundColor = "#383838";
            navHeader.style.color = "white";
            navItems.style.background = "linear-gradient( to top right,rgba(156,204,101 ,1) 0%, rgba(38,198,218 ,1) 50%)";
            navItems.style.boxShadow = "1px 1px 30px rgba(38,198,218 ,1)";
            off.style.display = "none";
            on.style.display = "block";
            window.localStorage.setItem('checked', JSON.stringify("true"));
            window.localStorage.setItem('navColor', JSON.stringify("#383838"));
            window.localStorage.setItem('trueOffDisplay', JSON.stringify("none"));
            window.localStorage.setItem('trueOnDisplay', JSON.stringify("block"));
            window.localStorage.setItem('navHeaderColor', JSON.stringify("white"));
            window.localStorage.setItem('navItemsBackground', JSON.stringify("linear-gradient( to top right,rgba(156,204,101 ,1) 0%, rgba(38,198,218 ,1) 50%)"));
            window.localStorage.setItem('navItemsBoxShadow', JSON.stringify("1px 1px 30px rgba(38,198,218 ,1)"));
            window.localStorage.setItem('wallpaper', JSON.stringify(zakWallpaper));
            window.localStorage.setItem('wallpaperPosition', JSON.stringify('calc(50% - 1vw) calc(50% - 2vh)'));
            window.localStorage.setItem('wallpaperRepeat', JSON.stringify('no-repeat'));
            window.localStorage.setItem('wallpaperSize', JSON.stringify('calc(100% + 3vw) calc(100% + 30vh)'));
        });
        on.addEventListener("click", () => {
            setChecked(false);
            wallpaper.style.backgroundImage = `url(${homeWallpaper})`;
            wallpaper.style.backgroundPosition = "calc(50%) calc(50% - 2vh)";
            wallpaper.style.backgroundRepeat = "no-repeat";
            wallpaper.style.backgroundSize = 'calc(100% + 3vw) calc(100% + 30vh)';
            nav.style.backgroundColor = "#f0f8ff";
            navHeader.style.color = "black";
            on.style.display = "none";
            off.style.display = "block";
            navItems.style.background = "linear-gradient( to top right, rgba(255,87,34,1) 0%, rgba(251,140,0 ,1) 100%)";
            navItems.style.boxShadow = "1px 1px 30px rgba(255,111,0 ,1)";
            window.localStorage.setItem('checked', JSON.stringify("false"));
            window.localStorage.setItem('navColor', JSON.stringify("#f0f8ff"));
            window.localStorage.setItem('falseOffDisplay', JSON.stringify("block"));
            window.localStorage.setItem('falseOnDisplay', JSON.stringify("none"));
            window.localStorage.setItem('navHeaderColor', JSON.stringify("black"));
            window.localStorage.setItem('navItemsBackground', JSON.stringify("linear-gradient( to top right, rgba(255,87,34,1) 0%, rgba(251,140,0 ,1) 100%)"));
            window.localStorage.setItem('navItemsBoxShadow', JSON.stringify("1px 1px 30px rgba(255,111,0 ,1)"));
            window.localStorage.setItem('wallpaper', JSON.stringify(`${homeWallpaper}`));
            window.localStorage.setItem('wallpaperPosition', JSON.stringify("calc(50%) calc(50% - 2vh)"));
            window.localStorage.setItem('wallpaperRepeat', JSON.stringify('no-repeat'));
            window.localStorage.setItem('wallpaperSize', JSON.stringify('calc(100% + 3vw) calc(100% + 30vh)'))
        });
    }, [checked]);

    useEffect(() => {
        const off = document.getElementById("toggleOff");
        const on = document.getElementById("toggleOn");
        const nav = document.getElementsByClassName("Navbar")[0];
        const navHeader = document.getElementById("navHeader");
        const navItems = document.getElementsByClassName("ul")[0];
        const wallpaper = document.body;

        if (JSON.parse(window.localStorage.getItem('checked')) === "true") {
            setChecked(true);
            nav.style.backgroundColor = JSON.parse(window.localStorage.getItem('navColor'));
            off.style.display = JSON.parse(window.localStorage.getItem('trueOffDisplay'));
            on.style.display = JSON.parse(window.localStorage.getItem('trueOnDisplay'));
            navHeader.style.color = JSON.parse(window.localStorage.getItem('navHeaderColor'));
            navItems.style.background = JSON.parse(window.localStorage.getItem('navItemsBackground'));
            navItems.style.boxShadow = JSON.parse(window.localStorage.getItem('navItemsBoxShadow'));
            wallpaper.style.backgroundImage = `url(${JSON.parse(window.localStorage.getItem('wallpaper'))})`;
            wallpaper.style.backgroundPosition = JSON.parse(window.localStorage.getItem('wallpaperPosition'));
            wallpaper.style.backgroundRepeat = JSON.parse(window.localStorage.getItem('wallpaperRepeat'));
            wallpaper.style.backgroundSize = JSON.parse(window.localStorage.getItem('wallpaperSize'));
        }
        if (JSON.parse(window.localStorage.getItem('checked')) === "false") {
            setChecked(false);
            nav.style.backgroundColor = JSON.parse(window.localStorage.getItem('navColor'));
            off.style.display = JSON.parse(window.localStorage.getItem('falseOffDisplay'));
            on.style.display = JSON.parse(window.localStorage.getItem('falseOnDisplay'));
            navHeader.style.color = JSON.parse(window.localStorage.getItem('navHeaderColor'));
            navItems.style.background = JSON.parse(window.localStorage.getItem('navItemsBackground'));
            navItems.style.boxShadow = JSON.parse(window.localStorage.getItem('navItemsBoxShadow'));
            wallpaper.style.backgroundImage = `url(${window.localStorage.getItem('wallpaper')})`;
            wallpaper.style.backgroundPosition = JSON.parse(window.localStorage.getItem('wallpaperPosition'));
            wallpaper.style.backgroundRepeat = JSON.parse(window.localStorage.getItem('wallpaperRepeat'));
            wallpaper.style.backgroundSize = JSON.parse(window.localStorage.getItem('wallpaperSize'));
        }
    }, []);

    return (
        <>
            <div>
              
                <nav className="Navbar" style={{ margin: '0', position: 'fixed', top: '2rem', left: '-1rem', width: '102%', height: '4rem', opacity: '0.7', backgroundColor: '#f0f8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '10000' }}>
                <Marquee/>
                    <div style={{ position: 'absolute', left: '3rem' }}>
                        <a href="/" style={{ textDecoration: 'none', color: 'black', fontSize: '1.5rem', fontWeight: 'bold' }} id="navHeader">FutureStory</a>
                    </div>
                    <div style={{ position: 'absolute', left: '14rem',top:'0.4rem' }} onClick={() => navigate('/profile')}>
                        {auth?.name !== undefined ? <ProfileCircle /> : null}
                    </div>
                    <div style={{ position: 'absolute', right: '3rem', top: "1.6rem" }}>
                        {auth?.name !== undefined ? <DeleteUserBtn auth={auth} logout={logout} /> : null}
                    </div>

                    <div style={{ position: 'absolute',right: '20rem', top: "1rem" }}>
                        {auth?.name !== undefined && auth?.membership !==  null && <a id = "aLink" style={{color : JSON.parse(window.localStorage.getItem('wallpaper')) === "/static/media/homeWallpaper.75928c8d3cb5b26a093b.jpg" ? 'black' : 'white'}} onClick={alertAgreement}>Delete Membership</a>}
                    </div>

                    <i id='toggleOff' class="big toggle off icon" style={{ position: 'absolute', left: '90rem', top: '1rem', color: 'black' }}></i>

                    <i id='toggleOn' class="big toggle on icon" style={{ position: 'absolute', left: '90rem', top: '1rem', color: 'black' }}></i>


                   

                    <div style={{ position: 'relative', left: '-10rem', top: '0.2rem' }}>
                        <a href="/" style={{ textDecoration: 'none', color: 'green', fontSize: '1rem', fontWeight: 'bold' }}>Online : {logAsNum > 0 ? logAsNum : 0}</a>
                    </div>
                    <ul className='ul' style={{ position: 'relative', left: '-2rem' }}>
                        <li onClick={() => navigate('/home')} className="li">
                            Home
                        </li>

                        {auth?.name === undefined ? <li onClick={() => navigate('/register')} className="li">
                            Sign Up
                        </li> : null}


                        {auth?.name === undefined ? <li onClick={() => navigate('/login')} className="li">
                            Log In
                        </li> : null}

                        {auth?.name !== undefined ? <li className="li" onClick={() => logout()} >
                            Log Out
                        </li> : null}

                        {auth?.name === undefined ? <li onClick={() => navigate('/forgotPassword')} className="li">
                            Forgot Password </li> : null}

                        {auth?.name !== undefined ? <li onClick={() => navigate('/profile')} className="li"> My Profile </li>
                            : null}

                        {auth?.name !== undefined ? <li onClick={() => navigate('/membership')} className="li" style={{ letterSpacing: '1px' }}> Membership </li>
                            : null}

                        {auth?.membership === "gm" ? <li onClick={() => navigate('/users')} className="li" style={{ letterSpacing: '1px' }}> Users </li>
                            : null}

                    </ul>

                </nav>
            </div>
        </>

    )
}

export default Navbar
