import React, { useState, useEffect, useContext } from 'react';
import MonsterBtn from './MonsterBtn';
import homeWp from '../assets/images/homeWallpaper.jpg';
import "../App.css";



function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loader, setLoader] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        const requestOption = {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ "email": `${email}` })
        }
        const response = await fetch("http://localhost:8080/forgotPassword/retrievePassword", requestOption);
        const data = await response.json();
        if (data.response !== 'Email has been sent') {
            displayErrorUtil(data.response);
        } else {
            setLoader(true);
            setSuccess(data.response);
            setTimeout(() => {
               setLoader(false);
            }, 1500);
            return () => {
               clearTimeout();
            }
        }
    }
    useEffect(() => {
        return () => {
            window.localStorage.removeItem("error");
            window.localStorage.removeItem("success");
            clearTimeout();
        }
    }, [])


    const displayErrorUtil = (exception) => {
        setError(exception);
        window.localStorage.setItem('error', JSON.stringify(exception));
        if (window.localStorage.getItem('error') !== null || window.localStorage.getItem('error') !== undefined) {
            setTimeout(() => {
                document.getElementById("fpError").innerHTML = exception;
            }, 100);
            setTimeout(() => {
                document.getElementById('fpError').innerHTML = "";
            }, 3000);
        }
    }


    return (
        <>
            <div class="form-gap"></div>
            <div className='container' style={{ padding: '10rem', backgroundImage: `url(${homeWp})`, backgroundPosition: 'center' }}>
                <div class="row">
                    <div class="col-md-4 col-md-offset-4">
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <div class="text-center">
                                    <h2 class="text-center">Forgot Password?</h2>
                                    <br></br>
                                    <p style={{ color: 'black' }}>Don't worry, things happen. Enter your email address below and we'll send you a link to reset your password!</p>
                                    <div class="panel-body">
                                                <span class="input-group-addon" ><i class="glyphicon glyphicon-envelope color-blue"></i></span>
                                                <input  name="email" placeholder="email address" class="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                <br></br>
                                                <button className ="submitFp" value="Reset Password" onClick={handleForgotPassword} style={{position:'relative',top:'2rem',left:'0.5rem'}}>Submit</button>
                                                <div style={{position:'relative',top:'2rem'}}>
                                                {error && <h3 id="fpError" style={{ color: 'red', textAlign: 'center', backgroundColor: 'white', borderRadius: '10px',width:'110%',marginTop:'1rem'}}>{error}</h3>}
                                                {loader ? <div class="big ui active centered inline loader" style={{ marginRight: '5rem',zIndex:'200000' }}></div> : <h3 id="success" style={{ color: 'green', textAlign: 'center', backgroundColor: 'white', borderRadius: '10px',width:'110%',marginLeft:'-0.3rem' }}>{success}</h3>}
                                                </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MonsterBtn />
        </>


    )
}

export default ForgotPassword