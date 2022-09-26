const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

//------------------------------------------------------
//Routes
//------------------------------------------------------
app.use(require("./Src/Routes/index"))


const server=app.listen(PORT, () => {
    console.log("App is running at", PORT)
})

const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
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
  });
  
  

