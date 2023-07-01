'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();


//Middleware -> Se ejecuta antes de las rutas suele ser para acciones de seguridad.
//Obtienes del app la url, le pasas el parametro extended a false por que es la config que lleva y parseamos a JSON.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

//CORS

/** Routing
 * [POST] - A la hora de querer pasarle parametros por URL (?) Para acceder a ellos se usa query, en caso de tener en el body los parametros se usa body y en caso de tener un parametro asignado a la url (/testpost/:id) se usaria params.
 * */
/*
app.get('/', (req, response) => {
response.status(200).send(
    "<h1>Pagina de inicio.</h1>"
)
})
app.get('/testget', (req, response) => {
response.status(200).send({
    message: "Hola mundo desde api nodejs."
})
})
app.get('/testpost', (req, response) => {
console.log(req.body.nombre);
response.status(200).send({
    message: "Hola desde post capullo."
})
})*/

//IMPORTANTE, Instanciar el fichero que contiene las Routes de mi Controller para poder usarlo, a mayores se le añade el /api delante de todas las rutas que cargue el fichero ROUTES.
var project_routes = require('./Routes/project');
app.use('/api', project_routes);

//export
module.exports = app;