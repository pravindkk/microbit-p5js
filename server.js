const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const {
    userJoin,
    getCurrentUser,
    userLeave,
} = require("./utils/users");
var timer;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Run when client connects
io.on("connection", (socket) => {
    socket.on("joinRoom", (chatForm) => {
        const user = userJoin(socket.id, chatForm.name, chatForm.chatroom);
        console.log(chatForm.name + " has joined room: " + chatForm.chatroom + " with id: "+ socket.id)
        socket.join(user.room);
    });

    socket.on("sentLove", (msg) => {
        console.log(socket.id)
        const user = getCurrentUser(socket.id);
        console.log(msg);
        // console.log(user.room)
        socket.broadcast.to(user.room).emit("receivedLove", msg);

    });

    socket.on("sentMissYou", (msg) => {
        const user = getCurrentUser(socket.id);
        console.log(msg);
        socket.broadcast.to(user.room).emit("receivedMissYou", msg);

    });

    socket.on("checkPartnerHome", (msg) => {
        const user = getCurrentUser(socket.id);
        console.log(msg);
        socket.broadcast.to(user.room).emit("isPartnerHome", msg);

    });


    // Runs when client disconnects
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));