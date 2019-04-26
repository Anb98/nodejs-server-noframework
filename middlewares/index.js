const url = require('url')

const sessionHandler   = require('./sesiones');
const serveStaticFiles = require('./staticFiles');
const postParameter    = require('./postParameter');
const customRoutes     = require('./otherRoutes');

module.exports =  (req,res )=>{
    sessionHandler(req,res, async ()=>{
        const post = await postParameter(req);   // parseo de los parametros post
        req.body   = post;                        // asignacion de parametros post al require


        const preUrl          = url.parse(req.url,true);     //divide la url en sus partes: parametros get, pathname, etc
        const isCustomRoute   = customRoutes(req, preUrl.pathname);   
        if(isCustomRoute) req = isCustomRoute(req);     // si es una ruta establecida se asigna a req

        serveStaticFiles(req,res);
    });
};