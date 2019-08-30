const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

var categorieModel = require('../models/categorie');

//Get all categories
router.get('/', (request, response) => {
    mysqlConnection.query('SELECT * FROM categories', (error, rows, fields) => {
        if (error) throw error;
        //return the current rows from DB
        response.status(200).json(rows);
    });
});

//Get categorie by id
router.get('/:id', (request, response) => {
    const { id } = request.params;
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

//Create categorie
router.post('/', (request, response) => {
    var validCategorie = categorieModel(request.body);
    var error = validCategorie.validateSync();
    if (error) throw error;

    mysqlConnection.query('INSERT INTO categories set ?', validCategorie.toJSON(), (error, res) => {
        if (error) throw error;
        response.status(200).json({
            "status": "success",
            "message": "Categoria registrada"
        });
    });
});

//Update Categorie

router.put('/:id', (request, response) => {
    const  id  = request.params.id;
    console.log(id);
    
    var validCategorie = categorieModel(request.body);
    var error = validCategorie.validateSync();
    if (error) throw error;

    mysqlConnection.query('UPDATE  categories SET ? WHERE _id = ?', [validCategorie.toJSON(), id], (error, resSQL) => {
        if (error) throw error;
        return response.status(200).json({
            status: "success",
            message: "Actualización exitosa"
        });
    });
});


//Delete categorie

router.delete('/:id', (request, response) => {
    const { id } = request.params;
    mysqlConnection.query('DELETE FROM categories WHERE _id = ?', id, (error, res) => {
        if (error) throw error;
       
        return response.status(200).json({
            status: "success",
            message: "Borrado exitoso"
        })
    })
});

//export the current router 
module.exports = router;