//Keys for heroku mysql ClearDB MySQL
module.exports = {
    database:{
        host:'us-cdbr-iron-east-02.cleardb.net',
        user:'b18469d6706cbb',
        password:'1dbe4ebd',
        database:'heroku_1b819384bce6abd',
        multipleStatements: true,
        connectionLimit : 100,
        debug : 'false',
        connectionLimit : 2980000000,
        connectTimeout  : 60 * 60 * 1000,
        acquireTimeout  : 60 * 60 * 1000,
        timeout         : 60 * 60 * 1000
    }
};
//Local keys
// module.exports = {
//     database:{
//         host:'localhost',
//         user:'root',
//         password:'root',
//         database:'database_pinturas',
//         multipleStatements: true,
//         connectionLimit : 100

//     }
// };