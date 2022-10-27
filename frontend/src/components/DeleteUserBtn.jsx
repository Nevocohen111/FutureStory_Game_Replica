import React,{useState} from 'react';
import DeleteBtnPortal from './DeleteBtnPortal';


function DeleteUserBtn({auth,logout}) {
    const [showPortal, setShowPortal] = useState(false);
     
    const handleDelete = async () => {
        logout();
        window.localStorage.clear();
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
            body: JSON.stringify({ "name" : `${auth?.name}`})
        };
        const response = await fetch("http://localhost:8080/user/delete", requestOptions)
        const data = await response.json();
        console.log(data);
        }

  return (
    <div>
        <li className=' small negative ui button' onClick={() => setShowPortal(true)} style={{position:'relative',top:'-12px'}}  >Delete Account</li>
        {showPortal && <DeleteBtnPortal handleDelete={handleDelete} onClose = {() => setShowPortal(false)} showPortal={showPortal}/>}
      
    </div>
  )
}

export default DeleteUserBtn;
