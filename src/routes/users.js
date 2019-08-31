const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var userModel = require('../models/user');
const checkAuth = require('../middleware/chech-auth')

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);



//Get all users
router.get('/', checkAuth, (req, res) => {
    mysqlConnection.query('SELECT * FROM users', (err, rows, fields) => {
        if (!err) {
            // res.json(rows);
            res.status(200).json(rows);
            return;
        } else {
            console.log(err);
            return;
        }
    });
});

// GET An user by id
router.get('/:id', checkAuth, (req, checkAuth, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM users WHERE id = ?', [id], (err, rows, fields) => {
        if (rows.length <= 0)
            throw response.status(404).json({
                "status": "error",
                "message": "Usuario no encontrado"
            });
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

// Sign-In An User
router.post('/signin', (req, response) => {
    var validUser = userModel(req.body)
    var error = validUser.validateSync();
    if (error) throw error;

    //#region BCRYPTJS
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return response.status(500).json({
                error: err
            })
        }
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                return response.status(500).json({
                    error: err
                })
            }
            else {
                //store the encrypted password
                validUser.password = hash;

                mysqlConnection.query("INSERT INTO users set ?", validUser.toJSON(), function (err, res) {
                    // When done with the connection, release it.
                    // mysqlConnection.destroy();
                    if (!err) {

                        const json = {
                            "status": "success",
                            "message": "Usuario registrado"
                        };
                        response.status(200).json(json);
                    }
                    else {
                        const json = {
                            "status": "error",
                            "data": err,
                            "message": "Error"
                        };
                        console.log("error: ", err);
                        response.status(500).json(json);
                    }
                });
            }
        });
    });
});


//Login a user
router.post('/login', (req, response, next) => {
    var validUser = userModel(req.body)
    const error = validUser.validateSync();
    //if email dosent match with the model regex
    if (error) throw error;

    //search user by email
    mysqlConnection.query("Select * from users where email = ? ", validUser.email, function (err, resSQL, rows) {
        // When done with the connection, release it.
        // mysqlConnection.release();
        // no user finded with that email
        if (resSQL.length == 0) {
            console.log("Error usuario no encontrado");
            const json = {
                "status": "error",
                "data": err,
                "message": "Error usuario no encontrado"
            };
            response.status(403).json(json);

        }
        else if (!err) {
            //if the user is signed
            storedPassword = resSQL[0].password;
            // console.log('Stored password ', storedPassword);
            // console.log('Incoming password ', req.body.password);

            //#region BCRYPT
            //esta funcion viene en la documentacion de bcryp la cual dice que compara  la hash de la data base con la hash que recibe y dice si hacen match o no
            bcrypt.compare(req.body.password, storedPassword, (err, res) => {
                if (err) {
                    //if the password doesnth match with the stored one
                    return response.status(401).json({
                        message: 'Autorización Fallida',
                        status: "error",

                    });
                }
                if (res) {
                    //guardamos la funcion jwt la cual su funcionalidad viene en la documentacion de jsonwebtokens
                    const token = jwt.sign({
                        email: resSQL[0].email,
                        idUser: resSQL[0]._id,
                        nombre: resSQL[0].name,
                    },
                        //Secret key
                        'Knd@321'
                        ,
                        {
                            expiresIn: "1h"
                        }, { algorithm: 'RS256' });
                    console.log('Token', token);


                    return response.status(200).json({
                        status: "success",
                        message: 'Autorización exitosa',
                        token: token,
                        usuario: {
                            "name": resSQL[0].name,
                            "email": resSQL[0].email,
                            "id": resSQL[0].id
                        }
                    })
                }
                return response.status(401).json({
                    message: 'Autorización Fallida',
                    status: "error",
                });
            })
            //#endregion
        } else {//if error while searching the user by email
            const json = {
                "status": "error",
                "data": err,
                "message": "Error en el servidor al solicitar la petición"
            };
            response.status(500).json(json);

        }
    });

});


// update an user
router.put('/:id', checkAuth, (request, response, next) => {
    const id = request.params.id;
    //codigo si no se va actualizar contraseña
    if (request.body.password == undefined) {
        mysqlConnection.query('UPDATE users SET ? WHERE _id = ?', [request.body, id], (error, resSQL) => {
            if (error) throw error;
            return response.status(200).json({
                status: "success",
                message: 'Actualizacion exitosa',

            })
        });

    } else {
        //codigo si quiere actualizar contraseña
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return response.status(500).json({
                    error: err + 'Error en bcrypt'
                })
            }
            bcrypt.hash(request.body.password, salt, function (err, hash) {
                //if error in bcryptjs
                if (err) {
                    return response.status(500).json({
                        error: err + 'Error en bcrypt'
                    })
                }
                else {
                    //new password hashed
                    request.body.password = hash;
                    // Store hash in your password DB.
                    mysqlConnection.query('UPDATE users SET ? WHERE _id = ?', [request.body, id], (error, resSQL) => {
                        if (error) throw error;
                        return response.status(200).json({
                            status: "success",
                            message: 'Actualizacion exitosa',

                        })
                    });
                }//fin else si no existio problema con bcrypt
            });
        });//fin funcion bcrypt
    }//fin else
})


router.delete('/:id', checkAuth, (req, res, next) => {
    const id = req.params.id;
    mysqlConnection.query('DELETE FROM users WHERE _id = ?', id, (error, resSQL) => {
        if (error) throw error;
        if (resSQL.affectedRows > 0) {
            return res.status(200).json({
                status: "success",
                message: 'Usuario borrado',

            })
        } else {
            return res.status(403).json({
                status: "error",
                message: 'Usuario no encontrado',

            })
        }

    });
});


module.exports = router;