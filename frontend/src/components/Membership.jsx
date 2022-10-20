import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import "../Membership.css";


function Membership() {
    const gm = "gm";
    const inspector = "inspector";
    const tester = "tester";
    const [inspectorLoader, setInspectorLoader] = useState(false);
    const [testerLoader, setTesterLoader] = useState(false);
    const [gmLoader, setGmLoader] = useState(false);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        if (auth?.name === undefined) {
            navigate(`/home`)
        }
    }, [auth?.name]);




    const onHandleInspector = async () => {
        document.getElementById('apply').style.display = "none";
        setInspectorLoader(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": `${auth?.email}`,
                "membership": `${inspector}`
            })
        };
        const response = await fetch(`http://localhost:8080/membership/add?name=${auth?.name}`, requestOptions);
        const data = await response.json();
        if (data) {
            document.getElementById('apply').style.display = "block";
            document.getElementById('apply').style.position = "relative";
            document.getElementById('apply').innerHTML = "Applied";
            document.getElementById('apply').style.left = "3rem";
            document.getElementById('apply').style.color = "green";
            setInspectorLoader(false);
        }
        setTimeout(() => {
            window.location.reload();
        }, 2000);
        return clearTimeout();
    }

    const onHandleGm = async () => {
        document.getElementById('go').style.display = "none";
        setGmLoader(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": `${auth?.email}`,
                "membership": `${gm}`
            })
        };
        const response = await fetch(`http://localhost:8080/membership/add?name=${auth?.name}`, requestOptions);
        const data = await response.json();
        if (data) {
            document.getElementById('go').style.display = "block";
            document.getElementById('go').style.position = "relative";
            document.getElementById('go').innerHTML = "Applied";
            document.getElementById('go').style.left = "3rem";
            document.getElementById('go').style.color = "green";
            setGmLoader(false);
        }
        setTimeout(() => {
            window.location.reload();
        }, 2000);
        return clearTimeout();
    }


    const onHandleTester = async () => {
        document.getElementById('test').style.display = "none";
        setTesterLoader(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": `${auth?.email}`,
                "membership": `${tester}`
            })
        };
        const response = await fetch(`http://localhost:8080/membership/add?name=${auth?.name}`, requestOptions);
        const data = await response.json();
        if (data) {
            document.getElementById('test').style.display = "block";
            document.getElementById('test').style.position = "relative";
            document.getElementById('test').innerHTML = "Applied";
            document.getElementById('test').style.left = "3rem";
            document.getElementById('test').style.color = "green";
            setTesterLoader(false);
        }
        setTimeout(() => {
            window.location.reload();
        }, 2000);
        return clearTimeout();
    }





    return (
        <div className='membership' style={{ marginTop: 'calc(5rem + 5vw)' }}>
            <div class="promos">
                <div class="promo">
                    <div class="deal">
                        <span>Server Inspector</span>
                        <span style={{ textIndent: '-1rem' }}>Help to locate and intercept bugs</span>
                    </div>
                    <span class="price">22$ per hour</span>
                    <ul class="features">
                        <li>Assist in locating bugs</li>
                        <li>Be able to test new features</li>
                        <li>Host events</li>
                        <li>Want more information?</li>
                    </ul>
                    <button onClick={onHandleInspector} id="apply">Apply Here</button>
                    {inspectorLoader && <div class="ui active centered inline loader" style={{ position: 'relative', left: '-0.5rem' }}></div>}
                </div>
                <div class="promo scale">
                    <div class="deal">
                        <span>General Manager</span>
                        <span>Help to manage the server</span>
                    </div>
                    <span class="price">40$ per hour</span>
                    <ul class="features">
                        <li>Find hackers</li>
                        <li>Add new features to the server</li>
                        <li>Help players with issues</li>
                        <li>Are you interested?</li>
                    </ul>
                    <button onClick={onHandleGm} id="go">Lets Go</button>
                    {gmLoader && <div class="ui active centered inline loader" style={{ position: 'relative', left: '-0.5rem' }}></div>}

                </div>
                <div class="promo">
                    <div class="deal">
                        <span style={{ textIndent: '2rem' }}>Maintenance tester</span>
                        <span style={{ textIndent: '2rem' }}>Supply feedback on the server</span>
                    </div>
                    <span class="price">15$ per hour</span>
                    <ul class="features">
                        <li>Opinion on new features</li>
                        <li style={{ textIndent: '2rem' }}>Report on suspicious activities</li>
                        <li style={{ textIndent: '2rem' }}>Help to decide on new add ons</li>
                        <li>Want to try?</li>
                    </ul>
                    <button onClick={onHandleTester} id="test">Press Me</button>
                    {testerLoader && <div class="ui active centered inline loader" style={{ position: 'relative', left: '-0.5rem' }}></div>}
                </div>
            </div>
        </div>

    )
}

export default Membership
