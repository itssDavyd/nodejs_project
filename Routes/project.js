'use strict';

//Cargamos el express para usar las enrutaciones.
var express = require('express');
//Cargamos controlador.
var ProjectController = require('../Controllers/project');
//Cargamos el router.
var router = express.Router();

router.get("/home", ProjectController.home);
router.get("/test", ProjectController.test);
router.get('/project/:id?', ProjectController.getProject);

//CRUD
router.post("/save", ProjectController.save);
router.get('/projects', ProjectController.getProjects);
router.put('/update-project/:id', ProjectController.update);
router.delete('/del-project/:id', ProjectController.delete);

module.exports = router;