const sessionHandler = require('./sesiones');
const serveStaticFiles = require('./staticFiles');
const postParameter = require('./postParameter');

module.exports =  (req,res )=>{
    sessionHandler(req,res, async ()=>{
        const post = await postParameter(req);   // parseo de los parametros post
        req.body = post;                        // asignacion de parametros post al require
        serveStaticFiles(req,res);
    });
};