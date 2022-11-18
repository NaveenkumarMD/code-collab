const express = require("express");
const cors = require("cors");
const sharedb = require("sharedb");
const WebSocketJSONStream = require("./Modules/Websocketjsonstream");
const http = require("http");
const Websocket = require("ws");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

//------------------------------------------------------
//Routes
//------------------------------------------------------
app.use(require("./Src/Routes/index"));
app.use(require("./Src/Routes/Runcode"));

const server = app.listen(PORT, () => {
  console.log("App is running at", PORT);
});

//call socket

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
    console.log(data);
    io.to(data.to).emit("message", data.text);
  });
});

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
