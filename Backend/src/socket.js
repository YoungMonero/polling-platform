// backend/socket.js
export default (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle joining a session room
    socket.on('joinSession', (sessionId) => {
      socket.join(`session:${sessionId}`);
      console.log(`User ${socket.id} joined session room: session:${sessionId}`);
    });

    // Handle joining a poll room (for real-time responses)
    socket.on('joinPoll', (pollId) => {
      socket.join(`poll:${pollId}`);
      console.log(`User ${socket.id} joined poll room: poll:${pollId}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
}