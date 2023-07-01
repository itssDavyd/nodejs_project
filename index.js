'use strict'

//Realizamos la instancia a la libreria que nos proporciona la conexion con la BDD de Mongo
var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

//Guardamos la Promesa en mongoose con las globales para tener acceso total.
mongoose.Promise = global.Promise;

//Realizamos la conexion con nuestra bdd de MongoDB y a la BDD que nos interesa.
mongoose.connect('mongodb://127.0.0.1:27017/portfolio').then(() => {
    console.log('Conection success');

    //Creacion del servidor una vez estableces la conexion.
    app.listen(port,()=>{
        console.log('Server OK! | URL=> http://localhost:3700');
    })

}).catch(err => console.log(err));