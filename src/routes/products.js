const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

const productModel = require('../models/product');

//Get all products
router.get('/', (request, response) => {
    mysqlConnection.query('SELECT * FROM products', (error, rows, fields) => {
        if (error) throw error;
        response.status(200).json(rows);
    });
});

//Get product by id
router.get('/:id', (request, response) => {
    const { id } = request.params;
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


//Create product
router.post('/', (request, response) => {
    var validProduct = productModel(request.body);
    var error = validProduct.validateSync();
    if (error) throw error;

    mysqlConnection.query('INSERT INTO products set ?', validProduct.toJSON(), (error, res) => {
        if (error) throw error;
        response.status(200).json({
            "status": "success",
            "message": "Producto registrado"
        });
    });
});

//Update Product

router.put('/:id', (request, response) => {
    const  id  = request.params.id;
    console.log(id);
    
    var validProduct = productModel(request.body);
    var error = validProduct.validateSync();
    if (error) throw error;

    mysqlConnection.query('UPDATE products SET ? WHERE _id = ?', [validProduct.toJSON(), id], (error, resSQL) => {
        if (error) throw error;
        return response.status(200).json({
            status: "success",
            message: "Actualización exitosa"
        });
    });
});

//Delete product

router.delete('/:id', (request, response) => {
    const { id } = request.params;
    mysqlConnection.query('DELETE FROM products WHERE _id = ?', id, (error, res) => {
        if (error) throw error;
       
        return response.status(200).json({
            status: "success",
            message: "Borrado exitoso"
        })
    })
});

module.exports = router;