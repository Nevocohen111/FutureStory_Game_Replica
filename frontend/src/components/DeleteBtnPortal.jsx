import React from 'react'
import  ReactDOM  from 'react-dom';
import '../App.css';

export default function DeleteBtnPortal(props) {
  return (
      ReactDOM.createPortal(
        <div className="ui small dimmer show modals visible active" style={{zIndex:'10000'}}>
            <a onClick={props.onClose} className="ui right floated button" style={{position:'absolute',right:'1px',top:'-0.5px'}}>X</a>
                <h1 style={{position:"relative",bottom:'5rem',color:'red'}}>Are you sure you want to delete your account?</h1>
                <p style={{color:'red',position:'relative',bottom:'2rem',fontSize:'1.3rem'}}>This action cannot be undone.</p>
                <a onClick={props.handleDelete} className=" big ui negative button "><i class="trash alternate icon" style={{textIndent :'8px'}} ></i></a>
            </div>,document.querySelector('#deleteUserPortal')
      )
  )
}
