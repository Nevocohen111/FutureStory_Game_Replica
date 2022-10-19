import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import '../Support.css';

function Support() {
    const [glitch, setGlitch] = useState(false);
    const [FM, setFM] = useState(false);
    const [report, setReport] = useState(false);
    const [client, setClient] = useState(false);
    const [other, setOther] = useState(false);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [reportHack, setReportHack] = useState("");
    const [message, setMessage] = useState("");
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState("");
    const [loader, setLoader] = useState(false);
    const myMessageRef = useRef(null);
    const otherRef = useRef(null);
    const reportRef = useRef(null);

    const handleOther = (e) => {
        if (e.target.checked) {
            myMessageRef.current.required = true;
            myMessageRef.current.style.display = "block";
            setOther(true);
        } else {
            setOther(false);
            myMessageRef.current.style.display = "none";
        }
    }

    const handleReport = (e) => {
        if (e.target.checked) {
            reportRef.current.required = true;
            reportRef.current.style.position = "relative";
            reportRef.current.style.top = "1rem";
            reportRef.current.style.display = "block";
            setReport(true);
        } else {
            setReport(false);
            reportRef.current.style.display = "none";
        }
    }



    const handleSubmitForm = async (e) => {
        setLoader(true);
        e.preventDefault();
        const requestOption = {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ "name": `${name}`, "lastName": `${lastName}`, "email": `${email}`, "glitch": `${glitch}`, "fm": `${FM}`, "report": `${reportHack}`, "client": `${client}`, "message": `${message}` })
        }
        try {
            const response = await fetch("http://localhost:8080/contact/send", requestOption)
            const data = await response.json();
            setReportHack("");
            setMessage("");
            setName("");
            setLastName("");
            setEmail("");
            if (data.response !== "Email sent") {
                setErr("One of the fields is empty");
                setTimeout(() => {
                    setErr("");
                    setLoader(false);
                }, 2000);
            }
            else {
                setErr("");
                setLoader(false);
                setSuccess("Thanks for your message, we will contact you as soon as possible");
                setTimeout(() => {
                    setSuccess("");
                }
                    , 2000);
            }

        } catch (error) {
            setErr("Something went wrong, please try again later");
            setLoader(false);
        }


        return () => {
            clearTimeout();
        }
    }




    let closeForm = function () {
        let form = document.getElementById('contactForm');
        let open = true;

        form.style.display = "block";
        if (open === true) {
            form.style.display = "none";
            document.getElementById('contactIcon').style.display = "block";
            open = false;
        }
    }

    let openForm = function () {
        let form = document.getElementById('contactForm');
        form.style.display = "block";
        document.getElementById('contactIcon').style.display = "none";

    }





    return (
        <>
            <a id='contactIcon' onClick={() => openForm()} style={{ marginTop: '4rem', marginRight: '1.2rem', zIndex: '9999' }}><i style={{ marginLeft: '3px' }} className="envelope open outline icon"></i></a>
            <div id="contactForm" className="contactForm ">
                <div></div>
                <a id="closeBtn" onClick={() => closeForm()} ><i className="close icon"></i></a>
                <h3>Contact Us</h3>
                <form id="form" >
                    <input type="text" id="firstName" placeholder="First Name" className='input' value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="text" id="lastName" placeholder="Last Name" className='input' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    <input type="email" id="email" placeholder="Enter Your Email" className='input' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <br></br>
                    <p>What problem have you encountered?</p>
                    <input type="checkbox" className="cbox" value={glitch} onChange={() => setGlitch(!glitch)} />Game glitch<br />
                    <input type="checkbox" className="cbox" value={FM} onChange={() => setFM(!FM)} />FM shops aren't opening<br />
                    <input type="checkbox" className="cbox" value={report} onChange={handleReport} />Report Abuse/Hacking<br />
                    <input type="text" placeholder='Player Name' ref={reportRef} value={reportHack} onChange={(e) => setReportHack(e.target.value)} style={{ opacity: 0.6, display: 'none', padding: '1px', textIndent: '5px', marginLeft: '20px', border: '3px solid black' }} />
                    <input type="checkbox" className="cbox" value={client} onChange={() => setClient(!client)} />Disconnections<br />
                    <input type="checkbox" className="cbox" ref={otherRef} value={other} onChange={handleOther} />Other<br />
                    <br></br>
                    <div className="col-75" style={{ marginLeft: '2.5rem', marginBottom: '1rem' }}>
                        <textarea id="subject" name="subject" placeholder="Write here.." ref={myMessageRef} value={message} onChange={(e) => setMessage(e.target.value)} style={{ border: '3px solid black', height: '40px', display: 'none', borderRadius: '10px', opacity: 0.6 }}></textarea>
                    </div>
                    <button type="submit" id="btn" name="submit" onClick={handleSubmitForm}>Submit</button>
                    <br></br><br></br>
                    {err && <p style={{ color: 'red', textAlign: 'center' }}>{err}</p>}
                    {loader && !err ? <div class="ui active centered inline loader" style={{ position: 'relative', zIndex: 1000000 }}></div> : <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
                </form>
            </div>
        </>
    )
}

export default Support
