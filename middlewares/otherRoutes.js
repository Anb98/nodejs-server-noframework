const fs   = require('fs');
const url  = require('url');
const path = require('path');

const mimeTypes  = require('./mimeTypes');

const logout = (req, res)=>{
    req.session.reset();
    fs.readFile('./static/views/index.html',(err,contenido)=>{
        res.writeHead(200, {'Content-Type': mimeTypes['.html']});
        return res.end(contenido);
    });
}

module.exports = 
[
    {link: '/logout', action:logout},
];