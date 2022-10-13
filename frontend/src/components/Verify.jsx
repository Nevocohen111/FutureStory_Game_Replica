import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import '../Verify.css';

function Verify({ accessToken }) {
  const [access, setToken] = useState(accessToken);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleAccessToken = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      consumes: 'application/json',
      produces: 'text/plain;charset=UTF-8',
      body: JSON.stringify({ "accessToken": `${access}` })
    };
    const response = await fetch(`http://localhost:8080/register/verify?access=${accessToken}`, requestOptions)
    const data = await response.json();
    if(data.response !== "Your account has been activated") {
      setError(data.response)
    }else {
      navigate(`/login=true`, { state: { login: "Your account has been activated, please log in." } });
    }
  }


  return (
    <div className='verBody'>
      <div id='container'>
   <a class="a-n2"  onClick={handleAccessToken}>
       <span></span>
       <span></span>
       <span></span>
       <span></span>
       Verify Account
       
   </a>
      </div>
      </div>

    
  )
}

export default Verify
