

const mysql = require('mysql2');
const { database } = require('./keys');

const mysqlConnection = mysql.createConnection(database);

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

//Function build by Rafael Renteria where recive a function that execute the script to mysql and renew conection and then release it
function sqlOpenCloseConnection(mysqlScript) {
  //instantiate pool conection every petition created
  var mysql = require('mysql2');
  var mysqlConnection = mysql.createConnection(database);
  //open connection if went closed
  mysqlConnection.connect(function (err, connection) {
    if (err) throw err; // not connected!
    //after the query ends the connection its released
    mysqlScript;
  });

}




module.exports = { mysqlConnection, sqlOpenCloseConnection };