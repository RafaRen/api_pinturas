//Keys for heroku mysql ClearDB MySQL
module.exports = {
    database:{
        host:'us-cdbr-iron-east-02.cleardb.net',
        user:'b18469d6706cbb',
        password:'1dbe4ebd',
        database:'heroku_1b819384bce6abd',
        multipleStatements: true,
        waitForConnections: true,
        connectionLimit: 0,
        queueLimit: 0
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