
const express = require('express');
var cors = require('cors');
const bodyparser = require('body-parser')
const http = require('http');
const app = require('./app.js');
const { disconnect } = require('process');
const server = http.createServer(app)
const {Server} = require("socket.io");
const connection = require("./config/db.js")

const routs = express();

const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  
io.on('connection', (socket)=>{
    // console.log('user connected');
    socket.on('message',(msg)=>{
        // console.log('--',msg);
     
        socket.broadcast.emit(`${msg[0]}`, {receiver: msg[0],sender: msg[1], msg: msg[2], date_time: msg[3]});
    })

    
    socket.on('disconnect',()=>{
    // console.log('user disconnected')
    })
})



const port = process.env.PORT || 5000

server.listen(port, () => console.log('PORT NUMBER ===', port)).on("error", function (err) {
    const { exec } = require('child_process');
    console.log("killed")

    exec('command here', { 'shell': 'powershell.exe' }, (error, stdout, stderr) => {
        stdout = `npx kill-port ${port}`
        // console.log("killed 2", stdout)
    })
});

