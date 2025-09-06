import app from './app.js';
import http from 'http';

import { Server } from 'socket.io';
import socketSetup from './src/socket.js'; // Import Socket.IO setup

const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

const server = http.createServer(app);
const io = new Server(server, { 
  cors: { 
    origin: 'http://localhost:4000', // Frontend dev URL
    methods: ['GET', 'POST'],
  },
});
socketSetup(io); // Initialize Socket.IO

// Attach io to request for controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') throw error;
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log(`Polling Platform Backend server running on ${bind}`);
  console.log(`API Documentation available at http://localhost:${port}/api/auth`);
  console.log(`Health check: http://localhost:${port}/health`);
}

if (process.env.NODE_ENV === 'test') {
  module.exports = server; // For testing
}