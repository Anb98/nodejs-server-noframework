const http = require('http');

const {PORT,HOST} = require('./config');


const {serveStaticFiles} = require('./middlewares');
const server = http.createServer(serveStaticFiles);


const io     = require('socket.io')(server);
const socket = require('./sockets');
socket(io);


require('./controllers/ctrl.calendario')();

server.listen(PORT, HOST, ()=>{
    console.log(`Server running on: https://${HOST}:${PORT}`);
});