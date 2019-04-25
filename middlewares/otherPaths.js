const fs   = require('fs');
const url  = require('url');
const path = require('path');

const mimeTypes  = require('./mimeTypes');

const serveSocketIOClient = (req, res) =>{
    res.writeHead(200, {'Content-Type': mimeTypes['.js']});
    console.log('algo');
    fs.readFile('/node_modules/socket.io-client/dist/socket.io.js',(err,contenido)=>{
        return res.end(contenido);
    });
}

module.exports = [
    {required: '/socket.io/socket.io.js', action:serveSocketIOClient}
];