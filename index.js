const http = require('http');

const {PORT,HOST} = require('./config');
const {serveStaticFiles} = require('./middlewares');


const server = http.createServer(serveStaticFiles);

server.listen(PORT, HOST, ()=>{
    console.log(`Server running on: https://${HOST}:${PORT}`);
});