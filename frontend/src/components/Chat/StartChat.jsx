import React from 'react';
import axios from 'axios';

function StartChat({ recipientId, groupName }) {
    function handleClick(e) {
        e.preventDefault();
        let data = new FormData();

        data.append('users', recipientId);

        if (groupName) {
            data.append('groupName', groupName);
        }
        axios
            .post('http://localhost:8000/api/message/new', data, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((res) => {
                console.log(res);
            });
    }
    return <button onClick={handleClick}>Initiate Chat</button>;
}

export default StartChat;
