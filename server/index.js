const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io')
const fs = require('fs');

//Init server
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

//Listen for connections
io.on('connection', (socket) => {
    console.log('CONNECTED ', socket.id)

    socket.on("joinRoom", (data) => {
        socket.join(data)
        console.log("USER with ID: " + socket.id + " joined room: " + data)
    });

    socket.on("sendMessage", (data) => {
        socket.to(data.room).emit("recieveMessage", data)
    })
    socket.on('disconnect', () => {
        console.log('USER DISCONNECTED ', socket.id)
    })
});

app.use(cors());



server.listen(3001, () => {
    console.log('SERVER RUNNING');
})