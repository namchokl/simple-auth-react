import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

import { SERVER_URL } from '../../setting';

const NS = 'Game-1';
const Socket = (props) => {
  const socketRef = useRef();

  const [msg, setMsg] = useState('');

  // connect socketio
  useEffect(() => {
    socketRef.current = io( `${SERVER_URL}/${NS}`);
    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('Connected to ' + NS);
      socket.emit('make-room', {name: 'abc'});
    });

    socket.on('roomList', data => {
      console.log(data);
    });

    socket.on('roomData', (data) => {
      console.log(data);
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