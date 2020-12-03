import io from 'socket.io-client';
import {BASE_URL} from '../redux/base-url';
const socket = io.connect(`${BASE_URL}:30001`);

const connectWithServer = () => {
  socket.on('connect', () => {
    console.log('Connected to server');
  });
};

const disconnect = (reason) => {
  socket.emit('disconnect', reason);
  socket.disconnect();
};
const muteUpdate = (data) => {
  socket.emit();
};
