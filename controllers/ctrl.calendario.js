const insertar = async ()=>{
    const con = await require('./ctrl.conection');
    const result = await con.query('insert into calendario(start,end,text) values (?,?,?)',['inicio', 'fin','texto']);
    console.log('result :', result);
};

const mostrar = async () =>{
    const con = await require('./ctrl.conection');
    const result = await con.query('select * from calendario');
    result.forEach(registro => {
        console.log('registro :', registro);
    });
}

module.exports = mostrar;