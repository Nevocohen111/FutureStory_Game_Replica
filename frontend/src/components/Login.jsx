import React, { useState, useContext, useEffect, useRef} from 'react';
import { useNavigate} from 'react-router-dom';
import MonsterBtn from './MonsterBtn';
import AuthContext from '../context/AuthProvider';
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import { useCookies } from 'react-cookie'
import '../Register.css'


function Login({ registered, logout, login, resetOK }) {
    const [email, setEmail] = useState("");
    const { auth, setAuth } = useContext(AuthContext);
    const { logAsNum, setLogAsNum } = useContext(AuthContext);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const inputRef = React.useRef(null);
    const [cookies, setCookie] = useCookies(['user']);
    const [loader, setLoader] = useState(false);
    const [isCookie, setIsCookie] = useState(false);
    const passwordRef = useRef(null);


    const submit = () => {
        confirmAlert({
            title: "This site uses cookies",
            message: "Do you want to allow cookies?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => handleCookie()
                },
                {
                    label: "No"
                }
            ]
        });
    };

    useEffect(() => {
        if(auth?.name !== undefined){
            navigate('/home');
        }
    
    }, [auth?.name]);

    useEffect(() => {
        setTimeout(() => {
            const out = document.getElementById("logout")
            const loggedIn = document.getElementById("login")
            const reg = document.getElementById("registered")
            const reset = document.getElementById("reset")
            if (out)
                out.style.display = "none";
            else if (loggedIn)
                loggedIn.style.display = "none";
            else if (reg)
                reg.style.display = "none";
            else if (reset)
                reset.style.display = "none";
        }, 6000);
        return () => {
            clearTimeout();
        }
    }, [registered, logout, login, resetOK]);


    const handleCheckbox = (e) => {
        if (e.target.checked) {
            setIsCookie(true);
        }
        else
            setIsCookie(false);
    };

    const handleCookie = () => {
        setCookie('Name', name, { path: '/' });
        setCookie('Password', password, { path: '/' });
    }

    
  const showPasswordCheckBox = event => {
    if (event.target.checked) {
      passwordRef.current.type = "text";
    } else {
        passwordRef.current.type = "password";
    }
    
  };


    const displayErrorUtil = () => {
        setError("Email or password is incorrect");
        window.localStorage.setItem('error', JSON.stringify(error));
        if (window.localStorage.getItem('error') !== null || window.localStorage.getItem('error') !== undefined) {
            for (let i = 0; i < document.getElementsByClassName("inputs").length; i++) {
                document.getElementsByClassName("inputs")[i].style.border = "3px solid red";
                document.getElementsByClassName("inputs")[i].style.animation = "shake 2s linear";
                document.getElementById("error").innerHTML = 'Email or password is incorrect';
            }
            setTimeout(() => {
                for (let i = 0; i < document.getElementsByClassName("inputs").length; i++) {
                    document.getElementsByClassName("inputs")[i].style.border = "none";
                    document.getElementsByClassName("inputs")[i].style.animation = "none";
                    document.getElementById("error").innerHTML = "";
                    setError("");
                }
            }, 3000);

        }
    }

    const handleLogin = async () => {
        setLoader(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            consumes: 'application/json',
            produces: 'text/plain;charset=UTF-8',
            body: JSON.stringify({ "email": `${email}`, "pwd": `${password}`, "name": `${name}` })
        };
        try {
            const response = await fetch('http://localhost:8080/login/add', requestOptions)
            const data = await response.json();
            if (response.status === 200) {
                const name = data.name;
                const email = data.email;
                const verified = data.verified;
                setLogAsNum(logAsNum + 1);
                setAuth({ name, email, verified });
                navigate('/home&authorized=true');
                if (isCookie)
                    submit();
            } else {
            
                displayErrorUtil();
            }

        }
        catch (err) {
            displayErrorUtil();
        }
        setLoader(false);
    }




    return (
        <>
             <div className="body" id = "wallpaper">
                <div className="container"  >
                    <img className="bg-img" src="https://mariongrandvincent.github.io/HTML-Personal-website/img-codePen/bg.jpg" height={'900vh'} alt="" />

                    <div className="menu">
                        <a className="btn-connexion" href={"/login"}><h2 style={{color:'#1161ee'}}>SIGN IN</h2></a>
                        <a className="btn-enregistrer active" href={"/register"}><h2>SIGN UP</h2></a>
                    </div>
                    <div className="connexion" style={{ position: 'relative', left: '4.6rem' }}>
                        <div className="contact-form">
                            <label className="label">USERNAME</label>
                            <input className='inputs'  placeholder="" type="text" ref={inputRef} value={name} onChange={(e) => setName(e.target.value)} style={{border:'none'}} required />

                            <label className="label">EMAIL</label>
                            <input className='inputs'   placeholder="" type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{border:'none'}} required />


                            <div className="check">
                                <label className="label" style={{ position: 'relative', left: '11rem', top: '0.33rem' }}>
                                    <input id="check" type="checkbox" className="checkbox" value={isCookie} onChange={showPasswordCheckBox} />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="23px">
                                        <path className="path-back" d="M1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6" />
                                        <path className="path-moving" d="M24.192,3.813L11.818,16.188L1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6" />
                                    </svg>
                                </label>
                                <label className="label" style={{marginTop:'1rem',marginLeft:'1.5rem'}}>PASSWORD</label>
                            
                            </div>
                            <input className='inputs' ref = {passwordRef}  placeholder="" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{border:'none'}} required />

                            <div className="check">
                                <label className="label" style={{marginLeft:'3rem'}}>
                                    <input id="check" type="checkbox" className="checkbox" value={isCookie} onChange={handleCheckbox} />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="23px">
                                        <path className="path-back" d="M1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6" />
                                        <path className="path-moving" d="M24.192,3.813L11.818,16.188L1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6" />
                                    </svg>
                                </label>
                                <h3>Accept Cookies</h3>
                            </div>
                            <br></br>
                            <input className="submit" value="SIGN IN" type="submit" onClick={handleLogin} />
                            <br></br><br></br>
                            <div id="error" style={{ color: 'red' }}></div>
                            {registered && <h4 id="registered" style={{ color: '#F1C40F' }} >{registered}</h4>}
                            {logout && <h4 id="logout" className="logout" style={{ color: 'red' }} >{logout}</h4>}
                            {login && <h4 id="login" className="login" style={{ color: 'green' }}>{login}</h4>}
                            {resetOK && <h4 id="reset" style={{ color: 'green' }}>{resetOK}</h4>}
                        </div>
                        {loader && !error && <div class="big ui active centered inline loader" style={{ marginRight: '6.5rem',zIndex:'200000' }}></div>}
                        

                    </div>
                </div>
            </div>
            <MonsterBtn />
        </>
    )
}

export default Login
