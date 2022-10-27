import React, { useState, useEffect } from 'react';
import profilePic from '../assets/images/profilePic.jpg';
import '../Users.css';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (JSON.parse(window.localStorage.getItem('membership')) !== 'gm')
            window.location.href = '/home';
        else {
            setLoading(true);
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            fetch('http://localhost:8080/user/getUsers', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setUsers(data);
                    setLoading(false);
                });
        }
    }, []);


    return (
        <div className='users'>
            <div class="ag-march-gifts-block">
                <div class="ag-format-container">
                    {users.map(user => (
                        <ul class="ag-march-gifts_list" key={user.id}>
                            <li class="ag-march-gifts_item">
                                <a class="ag-march-gifts_link" target="_blank">
                                    <div class="ag-march-gifts_img-box">
                                        <img style={{ height: '100px' }} class="ag-march-gifts_img" id="imageGM" src={window.localStorage.getItem(`${user.name}`) ? window.localStorage.getItem(`${user.name}`) : profilePic} alt="picture" />
                                    </div>
                                    <p class="ag-march-gifts_title-item">{user.name} with role {user.membership ? user.membership : "no role"}</p>
                                </a>
                            </li>
                        </ul>
                    ))}
                    {loading && <div class="ui active centered inline loader" style={{ position: 'relative', zIndex: 1000000, top: '10rem' }}></div>}
                </div>
            </div>
        </div>
    )
}

export default Users
