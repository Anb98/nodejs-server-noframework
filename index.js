const http = require('http');
const fs   = require('fs');
const url  = require('url');
const path = require('path');

const {PORT,HOST} = require('./config');


const serveStaticFiles = (req, res) =>{
    console.log('req :', req)

    //divide la url en sus partes: parametros get, pathname, etc
    const preUrl = url.parse(req.url,true);
    let rutaArchivo = "./static" + preUrl.pathname;


    //si no solicita ningun archivo buscar el index de esa carpeta
    if(!path.extname(rutaArchivo)) 
        rutaArchivo+='/index.html';

    const extension = String(path.extname(rutaArchivo)).toLowerCase();

    //si es .html obviar /views en la ruta al solicitarla
    if(extension=='.html'){
        let rutaArray = rutaArchivo.split('/');
        rutaArray[1]+='/views';
        rutaArchivo = rutaArray.join('/');
    }


    const mimeTypes = {
        '.html': 'text/html',
        '.js'  : 'text/javascript',
        '.css' : 'text/css',
        '.json': 'application/json',
        '.png' : 'image/png',
        '.jpg' : 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif' : 'image/gif',
        '.ico' : 'image/x-icon',
        '.wav' : 'audio/wav',
        '.mp4' : 'video/mp4',
        '.pdf' : 'application/pdf',
        '.woff': 'application/font-woff',
        '.ttf' : 'application/font-ttf',
        '.eot' : 'application/vnd.ms-fontobject',
        '.otf' : 'application/font-otf',
        '.svg' : 'application/image/svg+xml'
    };
    const tipoContenido = mimeTypes[extension] || 'application/octet-stream';


    fs.readFile(rutaArchivo, (err, contenido) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});

            return res.end("404 Not Found");
        }  
        
    
        res.writeHead(200, {'Content-Type': tipoContenido});
        res.write(contenido);
    
        return res.end();
    });
};


const server = http.createServer(serveStaticFiles);

server.listen(PORT, HOST, ()=>{
    console.log(`Server running on: https://${HOST}:${PORT}`);
});