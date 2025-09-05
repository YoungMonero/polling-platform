export default function pollSocket(io) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Participant joins a session room to receive poll updates
    socket.on("joinSession", (sessionId) => {
      socket.join(sessionId);
      console.log(`User ${socket.id} joined session ${sessionId}`);
    });

    // Broadcast when a poll is published
    socket.on("publishPoll", (poll) => {
      io.to(poll.sessionId).emit("pollPublished", poll);
      console.log(`Poll published: ${poll.id} in session ${poll.sessionId}`);
    });

    // Broadcast when a poll is closed
    socket.on("closePoll", (poll) => {
      io.to(poll.sessionId).emit("pollClosed", poll);
      console.log(`Poll closed: ${poll.id} in session ${poll.sessionId}`);
    });

    // Broadcast when a participant submits a response
    socket.on("submitResponse", ({ pollId, sessionId, participantId, response }) => {
      io.to(sessionId).emit("responseSubmitted", { pollId, participantId, response });
      console.log(`Response submitted for poll ${pollId} by participant ${participantId}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}
