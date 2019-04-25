const http = require('http');
const webSocket   = require('ws');

const {PORT,HOST} = require('./config');
const {serveStaticFiles} = require('./middlewares');


const server = http.createServer(serveStaticFiles);


require('./controllers/ctrl.calendario')();

server.listen(PORT, HOST, ()=>{
    console.log(`Server running on: https://${HOST}:${PORT}`);
});