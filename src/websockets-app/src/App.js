import React, { Component, useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr';


const connection = new HubConnectionBuilder().withUrl("https://localhost:5001/chatHub").build();
const App = () => {
  const [message, setMessage] = useState('');
  const [text, setText] = useState('');
  const [user, setUser] = useState('');
  useEffect(() => {
    connection.on('ReceiveMessage', (user, message) => {
      setMessage(message);
      setUser(user);
    });
    connection.start().then(() => console.log('Running...')).catch(console.log);
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    connection.invoke('SendMessage', user, text).catch(console.log);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={e => setText(e.target.value)} />
        <button type="submit">Send</button>
        <div>
          <span>User: {user}</span>
          <span>Message: {message}</span>
        </div>
      </form>
    </div>
  );
}


export default App;
