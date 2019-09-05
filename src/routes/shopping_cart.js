const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/chech-auth')
const { database } = require('../keys');

var cartModel = require('../models/cart');


//Get product by id
router.get('/:id/:idUser/:idProduct', (request, response) => {
    const { id, idUser, idProduct } = request.params;
    //instantiate pool conection every petition created
    var mysql = require('mysql2');
    var mysqlConnection = mysql.createConnection(database);

    mysqlConnection.connect(function (err, connection) {
        if (err) throw err; // not connected!
        mysqlConnection.query('Select * from cart WHERE _id = ? AND idUser=? AND idProduct = ?', { id, idUser, idProduct }, (error, rows, fields) => {
            if (error) throw error;
            if (rows.length <= 0)
                return response.status(404).json({
                    "status": "error",
                    "message": "Producto en carrito de compras no encontrado"
                });
            response.status(200).json(rows[0]);
        });
    });
});

//Get products from user
router.get('/:id/:idUser', (request, response) => {
    const { id, idUser } = request.params;
    //instantiate pool conection every petition created
    var mysql = require('mysql2');
    var mysqlConnection = mysql.createConnection(database);

    mysqlConnection.connect(function (err, connection) {
        if (err) throw err; // not connected!
        mysqlConnection.query('Select * from cart WHERE _id = ? AND idUser=?', { id, idUser, idProduct }, (error, rows, fields) => {
            if (error) throw error;
            if (rows.length <= 0)
                return response.status(404).json({
                    "status": "error",
                    "message": "Producto en carrito de compras no encontrado"
                });
            response.status(200).json(rows[0]);
        });
    });
});


//Create product to the shopping cart
router.post('/', checkAuth, (request, response) => {
    var cartModel = cartModel(request.body);
    var error = cartModel.validateSync();
    if (error) throw error;

    //instantiate pool conection every petition created
    var mysql = require('mysql2');
    var mysqlConnection = mysql.createConnection(database);

    mysqlConnection.connect(function (err, connection) {
        if (err) throw err; // not connected!
        mysqlConnection.query('INSERT INTO cart set ?', cartModel.toJSON(), (error, res) => {
            if (error) throw error;

            response.status(200).json({
                "status": "success",
                "message": "Producto agregado al carrito"
            });
        });
    });
});


//Delete product from cart

router.delete('/:id', checkAuth, (request, response) => {
    const { id } = request.params;
    //instantiate pool conection every petition created
    var mysql = require('mysql2');
    var mysqlConnection = mysql.createConnection(database);

    mysqlConnection.connect(function (err, connection) {
        if (err) throw err; // not connected!
        mysqlConnection.query('DELETE FROM cart WHERE _id = ?', id, (error, res) => {
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