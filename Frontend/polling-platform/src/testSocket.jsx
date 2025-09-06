import { connectSocket, joinSessionRoom, onPollPublished } from './services/socket.js';

connectSocket();
joinSessionRoom('4'); // Use the session ID from Step 1

onPollPublished((poll) => {
  console.log('Poll Published:', poll);
});

console.log('Socket connected, listening for pollPublished');