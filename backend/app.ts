import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const port = 3001

// const registerConnectionHandlers = require("./api/socket/connectionHandler");

io.on("connection", (socket) => {
  // registerConnectionHandlers(io, socket);
  console.log(`Socket connected: ${socket.id}`)

  socket.on("roomJoin", (path) => {
    console.log(`${socket.id} joined room ${path}`);
  });
});

io.on("disconnect", (socket) => {
  console.log(`Socket disconnected: ${socket.id}`)
});



httpServer.listen(port);
console.log(`Listening on port ${port}`)