const http = require('http');
const webSocket   = require('ws');

const {PORT,HOST} = require('./config');
const {serveStaticFiles} = require('./middlewares');


const server = http.createServer(serveStaticFiles);

// WebSocketServer
const wss = new webSocket.Server({server});

wss.on('connection',ws =>{
    console.log('user conected');

    ws.send(JSON.stringify({nombre:'abdiel'}));

    ws.on('message',message =>{
        console.log('message :', message);
    })

});



require('./controllers/ctrl.calendario')();

server.listen(PORT, HOST, ()=>{
    console.log(`Server running on: https://${HOST}:${PORT}`);
});