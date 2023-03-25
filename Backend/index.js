const express = require("express");
const cors = require("cors");
const sharedb = require("sharedb");
const WebSocketJSONStream = require("./Modules/Websocketjsonstream");
const http = require("http");
const Websocket = require("ws");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5005;

//------------------------------------------------------
//Routes
//------------------------------------------------------
app.use(require("./Src/Routes/index"));
app.use(require("./Src/Routes/Runcode"));
app.use(require("./Src/Routes/YoutubeSearch"));
app.use(require("./Src/Routes/googelsearch"))

const server = app.listen(PORT, () => {
  console.log("App is running at", PORT);
});

// call socket

const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000", "192.168.43.16:3000"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });
  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });


  socket.on("answerCall", (data) =>
    io.to(data.to).emit("callAccepted", data.signal)
  );
  socket.on("message", (data) => {
    console.log("mesage is ",data.text);
    if(data.text==="interview"){
      io.to(data.to).emit("message", "interview");
    }
    io.to(data.to).emit("message", data.text);
  });
  socket.on("forceDisconnect", () => {
    console.log("force disconnect");
    io.disconnectSockets();
  });
});
// const io = require("socket.io")(server, {
//   cors: {
//     origin: ["http://localhost:3000", "192.168.43.16:3000"],
//     methods: ["GET", "POST"],
//   },
// });

// const connectedUsers = {}; // to store socket connections of connected users

// io.on("connection", (socket) => {
//   // add user's socket connection to connectedUsers map
//   connectedUsers[socket.id] = socket;

//   // send the user their own socket id
//   socket.emit("me", socket.id);

//   // when a user disconnects, remove their socket connection from connectedUsers map
//   socket.on("disconnect", () => {
//     delete connectedUsers[socket.id];
//     socket.broadcast.emit("callEnded");
//   });

//   // when a user calls another user, emit the callUser event to the recipient
//   socket.on("callUser", (data) => {
//     const recipientSocket = connectedUsers[data.userToCall];
//     if (recipientSocket) {
//       recipientSocket.emit("callUser", {
//         signal: data.signalData,
//         from: data.from,
//         name: data.name,
//       });
//     }
//   });

//   // when a user answers a call, emit the callAccepted event to the caller
//   socket.on("answerCall", (data) => {
//     const callerSocket = connectedUsers[data.from];
//     if (callerSocket) {
//       callerSocket.emit("callAccepted", data.signal);
//     }
//   });

//   // when a user sends a message, emit the message event to the recipient
//   socket.on("message", (data) => {
//     const recipientSocket = connectedUsers[data.to];
//     if (recipientSocket) {
//       recipientSocket.emit("message", data.text);
//     }
//   });

//   // when a user wants to force disconnect all connected users, disconnect all sockets
//   socket.on("forceDisconnect", () => {
//     console.log("force disconnect");
//     Object.values(connectedUsers).forEach((socket) => {
//       socket.disconnect();
//     });
//     connectedUsers = {};
//   });
// });

// Share db socket

var sharedbbackend = new sharedb();

var sharedbserver = http.createServer(app);

var websocketserver = new Websocket.Server({ server: sharedbserver });

websocketserver.on("connection", (websocket) => {
  var stream = new WebSocketJSONStream(websocket);
  sharedbbackend.listen(stream);
});

sharedbserver.listen(5001, () => {
  console.log("Sharedb server is listening at 5001");
});
