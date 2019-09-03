const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/chech-auth')
const { database } = require('../keys');

var categorieModel = require('../models/categorie');

//Get all categories
router.get('/', (request, response) => {

    //instantiate pool conection every petition created
    var mysql = require('mysql2');
    var mysqlConnection = mysql.createConnection(database);

    mysqlConnection.connect(function (err, connection) {
        if (err) throw err; // not connected!

        mysqlConnection.query('SELECT * FROM categories', (error, rows, fields) => {
            if (error) throw error;
            //return the current rows from DB
            response.status(200).json(rows);
        });
    });
});

//Get categorie by id
router.get('/:id', (request, response) => {
    const { id } = request.params;
    //instantiate pool conection every petition created
    var mysql = require('mysql2');
    var mysqlConnection = mysql.createConnection(database);

    mysqlConnection.connect(function (err, connection) {
        if (err) throw err; // not connected!
        mysqlConnection.query('Select * from categories WHERE _id = ?', id, (error, rows, fields) => {
            if (error) throw error;
            if (rows.length <= 0)
                return response.status(404).json({
                    "status": "error",
                    "message": "Categoria no encontrada"
                });
            response.status(200).json(rows[0]);
        });

    });
});

//Create categorie
router.post('/', checkAuth, (request, response) => {
    var validCategorie = categorieModel(request.body);
    var error = validCategorie.validateSync();
    if (error) throw error;

    //instantiate pool conection every petition created
    var mysql = require('mysql2');
    var mysqlConnection = mysql.createConnection(database);

    mysqlConnection.connect(function (err, connection) {
        if (err) throw err; // not connected!

        mysqlConnection.query('INSERT INTO categories set ?', validCategorie.toJSON(), (error, res) => {
            if (error)
                response.status(500).json({
                    "status": "error",
                    "message": error
                });

            response.status(200).json({
                "status": "success",
                "message": "Categoria registrada"
            });
        });
    });
});

//Update Categorie

router.put('/:id', checkAuth, (request, response) => {
    const id = request.params.id;
    console.log(id);

    var validCategorie = categorieModel(request.body);
    var error = validCategorie.validateSync();
    if (error) throw error;



    //instantiate pool conection every petition created
    var mysql = require('mysql2');
    var mysqlConnection = mysql.createConnection(database);

    mysqlConnection.connect(function (err, connection) {
        if (err) throw err; // not connected!

        mysqlConnection.query('UPDATE  categories SET ? WHERE _id = ?', [validCategorie.toJSON(), id], (error, resSQL) => {
            if (error) throw error;
            return response.status(200).json({
                status: "success",
                message: "Actualización exitosa"
            });
        });
    });
});


//Delete categorie

router.delete('/:id', checkAuth, (request, response) => {
    const { id } = request.params;

    //instantiate pool conection every petition created
    var mysql = require('mysql2');
    var mysqlConnection = mysql.createConnection(database);

    mysqlConnection.connect(function (err, connection) {
        if (err) throw err; // not connected!
        mysqlConnection.query('DELETE FROM categories WHERE _id = ?', id, (error, res) => {
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