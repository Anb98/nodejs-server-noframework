const http = require('http');

const {app} = require('./config');


const serverHandler = require('./middlewares');
const server = http.createServer(serverHandler);


const io     = require('socket.io')(server);
const socket = require('./sockets');
socket(io);


// require('./controllers/ctrl.calendario')();

server.listen(app.PORT, app.HOST, ()=>{
    console.log(`Server running on: https://${app.HOST}:${app.PORT}`);
});