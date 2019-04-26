const querystring = require('querystring');

module.exports = (req) => {
    return new Promise((resolve,reject)=>{
        if (req.method == 'POST') {
            let body = '';
    
            req.on('data', (data) => {
                body += data;
    
                if (body.length > 1e6)
                    req.connection.destroy();
            });
    
            req.on('end', () => {
                resolve(querystring.parse(body));
            });
        }else{
            resolve();
        }
    });
};