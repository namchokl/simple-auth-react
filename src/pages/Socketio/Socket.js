import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const Socket = (props) => {
  const socketRef = useRef();

  const [msg, setMsg] = useState('');

  // connect socketio
  useEffect(() => {
    socketRef.current = io('http://localhost:8080');
    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('Connected to server.');
    });

    socket.on('msg', (msg) => {
      console.log(msg);
      setMsg(msg.msg);
    });

    return () => {
      console.log('Closing the socket...');
      socket.close();
    };

  }, []);

  return (
    <div>
      <h1>Socket.io Page</h1>
      <p>{msg}</p>
    </div>
  );
};

export default Socket;