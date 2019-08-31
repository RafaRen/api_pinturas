const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/chech-auth')
const { database } = require('../keys');

var orderDetailModel = require('../models/order_detail');

//Get all order details
router.get('/', checkAuth, (request, response) => {
    //instantiate pool conection every petition created
    var mysql = require('mysql2');
    var mysqlConnection = mysql.createConnection(database);

    mysqlConnection.connect(function (err, connection) {
        if (err) throw err; // not connected!

        mysqlConnection.query('SELECT * FROM order_detail', (error, rows, fields) => {
            if (error) throw error;
            //return the current rows from DB
            response.status(200).json(rows);
        });
    });
});

//Get order Detail by id
router.get('/:id', checkAuth, (request, response) => {
    const { id } = request.params;
    //instantiate pool conection every petition created
    var mysql = require('mysql2');
    var mysqlConnection = mysql.createConnection(database);

    mysqlConnection.connect(function (err, connection) {
        if (err) throw err; // not connected!

        mysqlConnection.query('Select * from order_detail WHERE _id = ?', id, (error, rows, fields) => {
            if (error) throw error;
            if (rows.length <= 0)
                return response.status(404).json({
                    "status": "error",
                    "message": "Detalle de orden no encontrada"
                });
            response.status(200).json(rows[0]);
        });
    });
});

//Get order Detail by idOrder
router.get('/idOrder/:id', checkAuth, (request, response) => {
    const { id } = request.params;
    //instantiate pool conection every petition created
    var mysql = require('mysql2');
    var mysqlConnection = mysql.createConnection(database);

    mysqlConnection.connect(function (err, connection) {
        if (err) throw err; // not connected!

        mysqlConnection.query('Select * from order_detail WHERE idOrder = ?', id, (error, rows, fields) => {
            if (error) throw error;
            if (rows.length <= 0)
                return response.status(404).json({
                    "status": "error",
                    "message": "Detalle de orden no encontrada"
                });
            response.status(200).json(rows[0]);
        });

    });
});

//Get order Detail by idOrder
router.get('/idProduct/:id', checkAuth, (request, response) => {
    const { id } = request.params;

    //instantiate pool conection every petition created
    var mysql = require('mysql2');
    var mysqlConnection = mysql.createConnection(database);

    mysqlConnection.connect(function (err, connection) {
        if (err) throw err; // not connected!

        mysqlConnection.query('Select * from order_detail WHERE idProduct = ?', id, (error, rows, fields) => {
            if (error) throw error;
            if (rows.length <= 0)
                return response.status(404).json({
                    "status": "error",
                    "message": "Detalle de orden no encontrada"
                });
            response.status(200).json(rows[0]);
        });
    });
});

//Create order Detail
router.post('/', checkAuth, (request, response) => {
    var validOrderDetail = orderDetailModel(request.body);
    var error = validOrderDetail.validateSync();
    if (error) throw error;

    //instantiate pool conection every petition created
    var mysql = require('mysql2');
    var mysqlConnection = mysql.createConnection(database);

    mysqlConnection.connect(function (err, connection) {
        if (err) throw err; // not connected!

        mysqlConnection.query('INSERT INTO order_detail set ?', validOrderDetail.toJSON(), (error, res) => {
            if (error) throw error;
            response.status(200).json({
                "status": "success",
                "message": "Detalle de orden registrada"
            });
        });
    });
});

//Update Categorie

router.put('/:id', checkAuth, (request, response) => {
    const id = request.params.id;
    console.log(id);

    var validOrderDetail = orderDetailModel(request.body);
    var error = validOrderDetail.validateSync();
    if (error) throw error;

    //instantiate pool conection every petition created
    var mysql = require('mysql2');
    var mysqlConnection = mysql.createConnection(database);

    mysqlConnection.connect(function (err, connection) {
        if (err) throw err; // not connected!

        mysqlConnection.query('UPDATE  order_detail SET ? WHERE _id = ?', [validOrderDetail.toJSON(), id], (error, resSQL) => {
            if (error) throw error;
            return response.status(200).json({
                status: "success",
                message: "Actualización exitosa"
            });
        });
    });
});

//Delete order_detail

router.delete('/:id', checkAuth, (request, response) => {
    const { id } = request.params;

    //instantiate pool conection every petition created
    var mysql = require('mysql2');
    var mysqlConnection = mysql.createConnection(database);

    mysqlConnection.connect(function (err, connection) {
        if (err) throw err; // not connected!

        mysqlConnection.query('DELETE FROM order_detail WHERE _id = ?', id, (error, res) => {
            if (error) throw error;

            return response.status(200).json({
                status: "success",
                message: "Borrado exitoso"
            })
        })
    });
});



//export the current router 
module.exports = router;