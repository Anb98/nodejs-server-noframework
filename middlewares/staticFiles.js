const fs       = require('fs');
const url      = require('url');
const path     = require('path');

const mimeTypes  = require('./mimeTypes');
const otherRoutes = require('./otherRoutes');

const customRoutes = (req,res, pathname) =>{
    const ruta = otherRoutes.find((route, i)=>{
        const method      = req.method.toLowerCase();
        const routeMethod = route.method && route.method.toLowerCase() || 'get';

        if(pathname==route.link && method == routeMethod)
        return route;
    });

    //si la rulta existe en otherRoutes realizar accion para la ruta
    if(ruta) return ruta.action(req,res);
    else return false;
};


/**
 * Envia al cliente los archivos estaticos solicitados
 * @param {Object} req - require 
 * @param {Object} res - response
 */
const serveStaticFiles = (req, res) =>{

    //divide la url en sus partes: parametros get, pathname, etc
    const preUrl = url.parse(req.url,true);
    
    
    const isCustomRoute = customRoutes(req,res,preUrl);
    if(isCustomRoute) return isCustomRoute;


    let rutaArchivo = "./static" + preUrl.pathname;

    //si no solicita ningun archivo buscar el index de esa carpeta
    if(!path.extname(rutaArchivo)) 
        rutaArchivo+='/index.html';

    const extension = String(path.extname(rutaArchivo)).toLowerCase();

    
    //si es .html obviar /views en la ruta al solicitarla
    if(extension=='.html'){
        let rutaArray = rutaArchivo.split('/');
        rutaArray[1] +='/views';
        rutaArchivo   = rutaArray.join('/');
    }

    const tipoContenido = mimeTypes[extension] || 'application/octet-stream';

    fs.readFile(rutaArchivo, (err, contenido) => {
        if (err) {
            res.writeHead(code,{'Content-Type': mimeTypes['.json']});
            return res.end(JSON.stringify({mensaje:'Recurso no encontrado'}));
        }
        
        res.writeHead(200, {'Content-Type': tipoContenido});
        return res.end(contenido);

    });
};

module.exports = serveStaticFiles;