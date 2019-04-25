const fs = require('fs');
const mimeTypes = require('./mimeTypes');

module.exports = (req,res,rutaArchivo) =>{

    const isSession = Object.keys(req.session).length;
    const rolUser = req.session.rol;
    const carpetaRol = rutaArchivo.split('/')[3];

    console.log('isSession :', isSession);
    console.log('rolUser :', rolUser);
    console.log('carpetaRol :', carpetaRol);
    

    if(isSession)
    {   //no autenticado
        fs.readFile('./static/views/403.html', (err, contenido) => {
            res.writeHead(403, {'Content-Type': mimeTypes['.html']});
            return res.end(contenido);
        });
    }
    else if(rolUser==carpetaRol ) // autenticado y con permiso
    {  
        return false;   //seseion ok

    }else if(rolUser==undefined && carpetaRol.length ==0)   //no autenticado pero publico
    { 
        return false;   //seseion ok
    }
    else   // autenticado pero trata de acceder a una ruta no permitida
    {
        fs.readFile('./static/views/403.html', (err, contenido) => {
            res.writeHead(403, {'Content-Type': mimeTypes['.html']});
            return res.end(contenido);
        });
    }
};