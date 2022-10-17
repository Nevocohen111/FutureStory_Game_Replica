import React, { useState, useRef, useEffect, useContext } from "react";
import '../Register.css';
import { useNavigate } from "react-router-dom";
import MonsterBtn from "./MonsterBtn";
import AuthContext from "../context/AuthProvider";
import TermsAndConditionsPortal from "./TermsAndConditionsPortal";

export default function Register() {
    const [name, setName] = useState("");
    const {auth} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState("");
    const [portal, setPortal] = useState(false);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    

    const checkIfMatching = () => {
        if (email === confirmEmail && password === confirmPassword && name !== "" && email !== "" && password !== "" && isChecked) {
            handleRegister()
        }
        if(!isChecked) {
            document.getElementById("error").innerHTML = 'Please agree to the terms and conditions';
            for (let i = 0; i < document.getElementsByClassName("inputs").length; i++) {
            document.getElementsByClassName("inputs")[i].style.border = "3px solid red";
            document.getElementsByClassName("inputs")[i].style.animation = "shake 2s linear";
            }
            setTimeout(() => {
                document.getElementById("error").innerHTML = '';
                for (let i = 0; i < document.getElementsByClassName("inputs").length; i++) {
                document.getElementsByClassName("inputs")[i].style.border = "none";
                document.getElementsByClassName("inputs")[i].style.animation = "none";
                }
            }, 3000);
        } 
        else if(email !== confirmEmail || password !== confirmPassword || name === "" || email === "" || password === "") {
            setError("The information you supplied does not match");
            window.localStorage.removeItem("error")
            window.localStorage.setItem("error", JSON.stringify('The information you supplied does not match the criteria'));
            if (window.localStorage.getItem('error') !== null || window.localStorage.getItem('error') !== undefined) {
                for (let i = 0; i < document.getElementsByClassName("inputs").length; i++) {
                    document.getElementsByClassName("inputs")[i].style.border = "3px solid red";
                    document.getElementsByClassName("inputs")[i].style.animation = "shake 2s linear";
                    document.getElementById("error").innerHTML = 'The information you supplied does not match the criteria';
                }
                setTimeout(() => {
                    for (let i = 0; i < document.getElementsByClassName("inputs").length; i++) {
                        document.getElementsByClassName("inputs")[i].style.border = "none";
                        document.getElementsByClassName("inputs")[i].style.animation = "none";
                        document.getElementById("error").innerHTML = "";
                    }
                }, 3000);
            }
        }
    }

    const handleCheckbox = (e) => {
        if (e.target.checked) {
            setIsChecked(true); 
            setPortal(true);
        }
         else {
            setIsChecked(false);
            setPortal(false);
         }
    }


    const handleRegister = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            consumes: 'application/json',
            produces: 'text/plain;charset=UTF-8',
            body: JSON.stringify({ "name": `${name}`, "email": `${email}`, "pwd": `${password}`, "confirmPwd": `${confirmPassword}`, "confirmEmail": `${confirmEmail}` })
        };
        const response = await fetch('http://localhost:8080/register/add', requestOptions)
        const data = await response.json();
        if (response.status === 401 || response.status === 402 || response.status === 403 || response.status === 404) {
            setError(data.response)
            window.localStorage.removeItem("error");
            window.localStorage.setItem("error", JSON.stringify(data.response))
            if (window.localStorage.getItem('error') !== null || window.localStorage.getItem('error') !== undefined) {
                for (let i = 0; i < document.getElementsByClassName("inputs").length; i++) {
                    document.getElementsByClassName("inputs")[i].style.border = "2px solid red";
                    document.getElementsByClassName("inputs")[i].style.animation = "shake 2s linear";
                    document.getElementById("error").innerHTML = data.response;
                }
                setTimeout(() => {
                    for (let i = 0; i < document.getElementsByClassName("inputs").length; i++) {
                        document.getElementsByClassName("inputs")[i].style.border = "none";
                        document.getElementsByClassName("inputs")[i].style.animation = "none";
                        document.getElementById("error").innerHTML = "";
                    }
                }, 3000);
            }
        }else {
        setError("")
        window.localStorage.removeItem("error");
        navigate(`/registered=true`, { state : { registered: name + ", Please verify your email and log in." } });
        }
    }

    useEffect(() => {
        if(auth?.name !== undefined) {
            navigate(`/home`)
        }
    }, [auth?.name]);

    return (
        <>
          <div className="body">
                <div className="container">
                    <img className="bg-img" src="https://mariongrandvincent.github.io/HTML-Personal-website/img-codePen/bg.jpg" height={'900vh'} alt="" />
                    <div className="menu" style={{ position: 'relative' }}>
                        <a className="btn-enregistrer active" onClick={() => navigate('/login')} style={{cursor:'pointer'}}><h2>SIGN IN</h2></a>
                        <a className="btn-connexion" onClick={() => navigate('/register')}><h2 style={{color:'#1161ee'}}>SIGN UP</h2></a>
                    </div>
                    <div className="connexion" style={{ position: 'relative', left: '4.6rem' }}>
                        <div className="contact-form">
                            <label className="label">USERNAME</label>
                            <input placeholder=""  className='inputs' type="text" ref={inputRef} value={name} onChange={(e) => setName(e.target.value)} style={{border:'none'}} required />

                            <label className="label">EMAIL</label>
                            <input placeholder=""  className='inputs' type="email" value={email} onChange={(e) => setEmail(e.target.value)}  style={{border:'none'}}required />

                            <label className="label">CONFIRM EMAIL</label>
                            <input placeholder="" className='inputs'  type="email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} style={{border:'none'}} required />

                            <label className="label">PASSWORD</label>
                            <input placeholder="" className='inputs'  type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{border:'none'}} required />

                            <label className="label">CONFIRM PASSWORD</label>
                            <input placeholder="" className='inputs'  type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{border:'none'}} required />
                            <br></br><br></br>
                            <div className="check" style={{position:'relative',left:'-3rem'}}>
                                <label className="label" style={{marginLeft:'6rem',marginTop:'-5px'}}>
                                    <input id="check" type="checkbox" className="checkbox" onChange={handleCheckbox} />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="23px">
                                        <path className="path-back" d="M1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6" />
                                        <path className="path-moving" d="M24.192,3.813L11.818,16.188L1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6" />
                                    </svg>
                                </label>
                                <p>Agreement</p>
                            </div>
                            {portal && <TermsAndConditionsPortal onClose={() => setPortal(false)} />}
                            <input className="submit" value="SIGN UP" type="submit" onClick={checkIfMatching} />
                            <br></br><br></br>
                            <div id = "error" style={{color:'red'}}></div>
                        </div>
                    </div>
                </div>
            </div>
            <MonsterBtn />
        </>
    )
}