const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
var cors = require('cors');//NOS PERMITE TENER ACCESO A OTRO SERVIDOR DESDE OTRO PUERTO YA QUE ANTERIORMENTE SE TRABAJABA EN LOCAL CON EL MISMO PUERTO
const bodyParser = require('body-parser');//body parser se utiliza para cuando hacemos post con json para traer los datos con req.body

//initializations
const app = express();

// server settings
app.set('port', process.env.PORT || 4000);
//obtiene la direccion de la carpeta views
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')

}));
app.set('view engine', '.hbs');
mongoose.Promise = global.Promise;//Enable promises

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());//middleware para inccorporar el acceso desde otros "lados"
app.use(bodyParser.urlencoded({ extended: false }));



// Global variables
app.use((req, res, next) => {
    next();
})


// Constants for routes
const userRoute = require('./routes/users');
const categorieRoute = require('./routes/categories');
const productRoute = require('./routes/products');
const orderRoute = require('./routes/orders');
const orderDetailsRoute = require('./routes/order_details');
const cartRoute = require('./routes/shopping_cart');



//Routes
app.use(require('./routes/index'));
app.use('/users', userRoute);
app.use('/categories', categorieRoute);
app.use('/products', productRoute);
app.use('/orders', orderRoute);
app.use('/order_detail', orderDetailsRoute);
app.use('/cart',cartRoute);


app.use((req, res, next) => {
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

//Public
app.use(express.static(path.join(__dirname, 'public')));




module.exports = app;