/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

function ChatBox({ groupId, userId, index, embiggenChat }) {
    const [messages, setMessages] = useState([]);
    const [socketMessages, setSocketMessages] = useState([]);
    const [groupMessage, setGroupMessage] = useState({});
    const [users, setUsers] = useState({});
    const socketRef = useRef(
        io('ws://localhost:8000', {
            reconnectionDelayMax: 10000,
            query: {
                groupId,
                userId,
            },
        })
    );

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/message/' + groupId, {
                withCredentials: true,
            })
            .then((res) => {
                const groupInfo = res.data[0];
                let tempUsers = {};
                setGroupMessage(groupInfo);
                setMessages(groupInfo.messages);
                groupInfo.users.forEach((user) => {
                    tempUsers[user._id] = user;
                });
                setUsers(tempUsers);
                socketRef.current.connect();
                socketRef.current.on('message', appendMessage);
            })
            .catch((err) => {
                console.log(err);
            });
        return () => {
            socketRef.current.close();
        };
    }, []);

    function appendMessage(messageObject) {
        let tempMessages = [...socketMessages, messageObject];

        setSocketMessages(tempMessages);
    }

    function handleSend(e) {
        e.preventDefault();
        const textMessage = document.getElementById('textMessage').value;
        socketRef.current.send(textMessage);
        document.getElementById('textMessage').value = '';
    }

    return (
        <div className="chatbox-container">
            <div className="chatbox">
                <button
                    onClick={() => {
                        embiggenChat(index, false);
                    }}
                >
                    [x]
                </button>
                <div>
                    {messages.map((messageObject, index) => {
                        const user = users[messageObject.user];
                        const isSelf = user._id === userId;
                        return (
                            <div
                                key={index}
                                className={isSelf ? 'self' : 'others'}
                            >
                                <p>
                                    {user.firstName} {user.lastName}
                                </p>
                                <p>{messageObject.message}</p>
                            </div>
                        );
                    })}
                    {socketMessages.map((messageObject, index) => {
                        const user = users[messageObject.user];
                        const isSelf = user._id === userId;
                        return (
                            <div
                                key={index}
                                className={isSelf ? 'self' : 'others'}
                            >
                                <p>
                                    {user.firstName} {user.lastName}
                                </p>
                                <p>{messageObject.message}</p>
                            </div>
                        );
                    })}
                </div>
                <form onSubmit={handleSend}>
                    <input
                        id="textMessage"
                        type="text"
                        autoComplete="off"
                        name="textMessage"
                        placeholder="Say something..."
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
}

export default ChatBox;
