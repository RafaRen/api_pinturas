
const mysql = require('mysql');
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
  
  module.exports = mysqlConnection;