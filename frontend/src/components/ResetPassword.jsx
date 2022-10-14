import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import MonsterBtn from './MonsterBtn';
import resW from '../assets/images/rsW.jpg';
import '../App.css';

function ResetPassword({ token }) {
    const [password, setPassword] = useState("");
    const {auth} = useContext(AuthContext);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleResetPassword = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            consumes: 'application/json',
            produces: 'text/plain;charset=UTF-8',
            body: JSON.stringify({ "pwd": `${password}` })
        }

        const response = await fetch(`http://localhost:8080/forgotPassword/resetPassword?token=${token}`, requestOptions);
        const data = await response.json();
        if (data.response !== `Password has been reset successfully`)
            displayErrorUtil(data.response);
        else {
            navigate('/loginResetSuccess=true', { state: { resetOK: "Password has been changed successfully" } });
        }

    }

    useEffect(() => {
        if(auth?.name !== undefined) {
            navigate('/home');
        }
        return () => {
            window.localStorage.removeItem("error");
            window.localStorage.removeItem("success");
            clearTimeout();
        }
    }, [auth?.name])

    const displayErrorUtil = (ex) => {
        setError(ex);
        window.localStorage.setItem('error', JSON.stringify(ex));
        if (window.localStorage.getItem('error') !== null || window.localStorage.getItem('error') !== undefined) {
            setTimeout(() => {
                document.getElementById("err").innerHTML = ex;
            }, 100);
        }
        setTimeout(() => {
            document.getElementById("err").innerHTML = "";
        }, 3000);
    }


    const checkIfPasswordMatch = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            displayErrorUtil("Passwords do not match");
        } else {
            handleResetPassword();
        }
    }



    return (
        <>
            <div class="form-gap"></div>
            <div className='container' style={{ padding: '10rem', backgroundImage: `url(${resW})`, backgroundPosition: '38% 40%' }}>
                <div class="row">
                    <div class="col-md-4 col-md-offset-4">
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <h2 class="text-center">Reset Password.</h2>
                                <br></br>
                                <p style={{ color: 'black' }}>Hello there,lets reset your password!</p>
                                <div class="panel-body" >
                                    <input type="password" style={{ opacity: '0.7' }} placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <br></br><br></br>
                                    <input type="password" style={{ opacity: '0.7' }} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    <input type="hidden" value={token} />


                                    <br></br><br></br>
                                    <button class=" submitFp" onClick={checkIfPasswordMatch} style={{position:'relative',left:'0.2rem'}}>Confirm</button>
                                    <div style={{ position: 'relative', top: '2rem' }}>
                                        {error && <h3 id="err" style={{ color: 'red', textAlign: 'center', backgroundColor: 'white', borderRadius: '10px' }}>{error}</h3>}
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

export default ResetPassword;
