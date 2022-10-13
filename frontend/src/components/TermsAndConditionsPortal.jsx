import React from 'react';
import ReactDOM from 'react-dom';
import "../App.css"

function TermsAndConditionsPortal({onClose}) {
  return (
    ReactDOM.createPortal(
        <div className="ui small dimmer show modals visible active" style={{zIndex:'10000',overflow:'scroll'}}>
            <div className="ui standard modal visible active" style={{zIndex:'10000',padding:'5rem'}}>
            <a onClick={onClose} className="ui right floated button" style={{position:'absolute',right:'1px',top:'-0.5px'}}>X</a>
                <h1 style={{position:"relative",bottom:'5rem',color:'green'}}>Terms and Conditions</h1>
                <p>1. You must be 13 years of age or older to play on this server.</p>
                <p>2. You must not use any third-party software to gain an advantage over other players.</p>
                <p>3. You must not use any third-party software to gain access to the server.</p>
                <p>5. You may not curse or use any inappropriate language in the game.</p>
                <p>6. You may not use any inappropriate names for your character.</p>
                <p>7. You may not use any inappropriate names for your guild.</p>
                <p>8. You may not use auto clickers or any other third-party software to gain an advantage over other players.</p>
                </div>
                </div>,document.querySelector('#termsAndConditionsPortal')
    )
  )
}

export default TermsAndConditionsPortal
