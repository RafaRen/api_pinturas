const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/chech-auth')
const { database } = require('../keys');

const productModel = require('../models/product');

//Get all products
router.get('/', (request, response) => {
    //instantiate pool conection every petition created
    var mysql = require('mysql2');
    var mysqlConnection = mysql.createConnection(database);

    mysqlConnection.connect(function (err, connection) {
        if (err) throw err; // not connected!


        mysqlConnection.query('SELECT * FROM products', (error, rows, fields) => {
            if (error) throw error;
            response.status(200).json(rows);
        });
    });

});

//Get product by id
router.get('/:id', (request, response) => {
    const { id } = request.params;
    //instantiate pool conection every petition created
    var mysql = require('mysql2');
    var mysqlConnection = mysql.createConnection(database);

    mysqlConnection.connect(function (err, connection) {
        if (err) throw err; // not connected!

        mysqlConnection.query('Select * from products WHERE _id = ?', id, (error, rows, fields) => {
            if (error) throw error;
            if (rows.length <= 0)
                return response.status(404).json({
                    "status": "error",
                    "message": "Producto no encontrado"
                });
            response.status(200).json(rows[0]);
        });
    });
});

//Get product by categorie ID
router.get('/idCategory/:id', (request, response) => {
    const { id } = request.params;
    //instantiate pool conection every petition created
    var mysql = require('mysql2');
    var mysqlConnection = mysql.createConnection(database);

    mysqlConnection.connect(function (err, connection) {
        if (err) throw { err }; // not connected!

        mysqlConnection.query('show variables like "max_connections"', (error, rows, fields) => {
            if (error) throw error;
            console.log(rows);
                    response.status(200).json({
                "status": "success",
                "data": rows

            });
            
        });
        
        // mysqlConnection.query('Select * from products WHERE idCategory = ?', id, (error, rows, fields) => {
        //     if (error) throw error;
        //     if (rows.length <= 0)
        //         return response.status(404).json({
        //             "status": "error",
        //             "message": "El idCategoria = " + id + " no tiene productos relacionados"
        //         });

        //     response.status(200).json({
        //         "status": "success",
        //         "data": rows

        //     });

        // });

    });
});


//Create product
router.post('/', checkAuth, (request, response) => {
    var validProduct = productModel(request.body);
    var error = validProduct.validateSync();
    if (error) throw error;

    //instantiate pool conection every petition created
    var mysql = require('mysql2');
    var mysqlConnection = mysql.createConnection(database);
    mysqlConnection.connect(function (err, connection) {
        if (err) throw err; // not connected!

        mysqlConnection.query('INSERT INTO products set ?', validProduct.toJSON(), (error, res) => {
            if (error) throw error;
            response.status(200).json({
                "status": "success",
                "message": "Producto registrado"
            });
        });
    });
});

//Update Product

router.put('/:id', checkAuth, (request, response) => {
    const id = request.params.id;
    console.log(id);

    var validProduct = productModel(request.body);
    var error = validProduct.validateSync();
    if (error) throw error;

    //instantiate pool conection every petition created
    var mysql = require('mysql2');
    var mysqlConnection = mysql.createConnection(database);

    mysqlConnection.connect(function (err, connection) {
        if (err) throw err; // not connected!

        mysqlConnection.query('UPDATE products SET ? WHERE _id = ?', [validProduct.toJSON(), id], (error, resSQL) => {
            if (error) throw error;
            return response.status(200).json({
                status: "success",
                message: "Actualización exitosa"
            });
        });
    });
});

//Delete product

router.delete('/:id', checkAuth, (request, response) => {
    const { id } = request.params;
    //instantiate pool conection every petition created
    var mysql = require('mysql2');
    var mysqlConnection = mysql.createConnection(database);

    mysqlConnection.connect(function (err, connection) {
        if (err) throw err; // not connected!

        mysqlConnection.query('DELETE FROM products WHERE _id = ?', id, (error, res) => {
            if (error) throw error;

            return response.status(200).json({
                status: "success",
                message: "Borrado exitoso"
            })
        })
    });
});

module.exports = router;