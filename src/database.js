
const mysql = require('mysql');
const { database } = require('./keys');

const mysqlConnection = mysql.createConnection(database);


function handleDisconnect() {
  console.log('handleDisconnect()');
  connection.destroy();
  connection = mysql.createConnection(db_config);
  connection.connect(function (err) {
    if (err) {
      console.log(' Error when connecting to db  (DBERR001):', err);
      setTimeout(handleDisconnect, 1000);
    }
  });

}

mysqlConnection.connect(function (err) {
  if (err) {
    console.log('Connection is asleep (time to wake it up): ', err);
    setTimeout(handleDisconnect, 1000);
    handleDisconnect();
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;