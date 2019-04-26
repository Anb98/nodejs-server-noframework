const fs       = require('fs');
const url      = require('url');
const path     = require('path');

const mimeTypes   = require('./mimeTypes');
const auth        = require('./auth');

/**
 * Envia al cliente los archivos estaticos solicitados
 * @param {Object} req - require 
 * @param {Object} res - response
 */
const serveStaticFiles = (req, res) => {

    const preUrl = url.parse(req.url,true);     //divide la url en sus partes: parametros get, pathname, etc

    let rutaArchivo = "./static" + preUrl.pathname;


    if(!path.extname(rutaArchivo))      //si no solicita ningun archivo buscar el index de esa carpeta
        rutaArchivo+='/index.html';

    const extension = String(path.extname(rutaArchivo)).toLowerCase();

    
    if(extension=='.html'){     //si es .html obviar /views en la ruta al solicitarla
        let rutaArray = rutaArchivo.split('/');
        rutaArray[1] +='/views';
        rutaArchivo   = rutaArray.join('/');
    }


    const isForbidden = auth(req,res,rutaArchivo);
    if(isForbidden) return isForbidden;       // si esta tratando de acceder a una ruta prohibida que retorne la prohibicion


    const tipoContenido = mimeTypes[extension] || 'application/octet-stream';

    fs.readFile(rutaArchivo, (err, contenido) => {
        if (err) {
            res.writeHead(404,{'Content-Type': mimeTypes['.json']});
            return res.end(JSON.stringify({mensaje:'Recurso no encontrado'}));
        }
        
        res.writeHead(200, {'Content-Type': tipoContenido});
        return res.end(contenido);

    });
};

module.exports = serveStaticFiles;