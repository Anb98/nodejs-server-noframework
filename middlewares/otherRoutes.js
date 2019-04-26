const mimeTypes  = require('./mimeTypes');

const logout = (req)=>{
    req.session = {};
    req.url= '/index.html';
    return req;
}


const routes = [
    {link: '/logout', action:logout},

];

const customRoutes = (req, pathname) =>{
    const ruta = routes.find((route, i)=>{
        const method      = req.method.toLowerCase();
        const routeMethod = route.method && route.method.toLowerCase() || 'get';

        if(pathname==route.link && method == routeMethod)
            return route;
    });


    //si la rulta existe en otherRoutes realizar accion para la ruta
    if(ruta) return ruta.action;
    else return false;
};

module.exports = customRoutes;
