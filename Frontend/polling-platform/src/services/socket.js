import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
  autoConnect: false,
});

export const connectSocket = () => socket.connect();
export const disconnectSocket = () => socket.disconnect();
export const joinSessionRoom = (sessionId) => socket.emit('joinSession', sessionId);
export const joinPollRoom = (pollId) => socket.emit('joinPoll', pollId);
export const onPollPublished = (callback) => socket.on('pollPublished', callback);
export const onPollHidden = (callback) => socket.on('pollHidden', callback);
export const onPollClosed = (callback) => socket.on('pollClosed', callback);
export const onNewResponse = (callback) => socket.on('newResponse', callback);
export const onUserRegistered = (callback) => socket.on('userRegistered', callback);

export default socket;