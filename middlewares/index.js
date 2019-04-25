const fs   = require('fs');
const url  = require('url');
const path = require('path');

const mimeTypes  = require('./mimeTypes');
const otherPaths = require('./otherPaths');

/**
 * 
 * @param {Object} res - Response from server
 * @param {Number} code - codigo de error
 * @param {Object} mensaje - Objeto js a enviar como json
 */
const sendError= (res,code,mensaje)=>{
    res.writeHead(code,{'Content-Type': mimeTypes['.json']});
    return res.end(JSON.stringify(mensaje));
};


/**
 * 
 * @param {Object} req - require 
 * @param {Object} res - response
 */
const serveStaticFiles = (req, res) =>{

    //divide la url en sus partes: parametros get, pathname, etc
    const preUrl = url.parse(req.url,true);
    const ruta = otherPaths.find((value, i)=>{
        if(preUrl.pathname==value.required)
        return value;
    });

    //si la rulta existe en otherPath realizar accion para la ruta
    if(ruta) return ruta.action(req,res);


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

    const tipoContenido = mimeTypes[extension] || 'application/octet-stream';

    fs.readFile(rutaArchivo, (err, contenido) => {
        if (err) 
            return sendError(res, 404,{mensaje:'Pagina no encontrada'});
        
        res.writeHead(200, {'Content-Type': tipoContenido});
        return res.end(contenido);

    });
};

module.exports = {serveStaticFiles};