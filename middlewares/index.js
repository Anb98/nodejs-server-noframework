const sessionHandler = require('./sesiones');
const serveStaticFiles = require('./staticFiles');

module.exports =  (req,res )=>{
    // console.log(typeof sessionHandler);
    sessionHandler(req,res, ()=>{
        serveStaticFiles(req,res);
    });
}