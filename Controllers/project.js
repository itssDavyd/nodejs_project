'use strict';

var ProjectModel = require('../Models/project');
const mongoose = require("mongoose");

//Declaracion de un controlador, se usa de esta forma como si fuese un obj de una clase.
var controller = {
    home: function (req, res) {
        return res.status(200).send({
            message: 'Soy home'
        })
    },
    test: function (req, res) {
        return res.status(200).send({
            message: 'Soy test'
        })
    },

    getProject: async function (req, res) {
        var id = req.params.id;

        if (id == null) {
            return res.status(404).send({
                message: 'El proyecto no existe'
            });
        }

        //buscame en la bdd el id y lo que retornas en la promesa..
        await ProjectModel.findById(id)
            .then((project) => {
                if (!project) {
                    return res.status(404).send({
                        message: 'El proyecto no existe'
                    });
                }
                res.status(200).send({
                    message: 'Listado de proyecto',
                    project: project
                });
            })
            .catch((err) => {
                if (err) {
                    return res.status(500).send({
                        message: 'Error al buscar el proyecto',
                        err: err
                    })
                }
            });
    },

    save: function (req, res) {
        //Instanciamos nuestro Modelo de Project.
        var project = new ProjectModel();

        //Posteriormente recogemos todos nuestros parametros de la REQUEST, para asignarselos a nuestro Modelo.
        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        //Una vez realizado la asignacion, accedemos al metodo save, que espera una Promesa por lo cual tenemos then en caso de que la promesa sea satisfactoria, y en caso de error sera controlado con catch.
        project.save().then((projectStored) => {
            return res.status(200).send({
                message: 'proyecto saved',
                project: projectStored
            });
        }).catch((err) => {
            if (!projectStored) {
                return res.status(404).send({
                    message: 'No se ha podido guardar el proyecto'
                })
            }
            if (err) {
                return res.status(500).send({
                    message: 'Error al guardar el proyecto'
                })
            }
        })
    },

    getProjects: function (req, res) {
        //Por defecto no estamos usando ningun pre-filtrado, en caso de querer filtrar por algun campo usariamos en el find los filters que queramos filtrar.
        //El exec es para que una vez filtre ejecute la query y posteriormente instancie las promesas con sus respectivas response.
        //Indicando en el sort() un "+" obtenemos el orden asc y con el "-" desc.
        ProjectModel.find({}).sort('-year').exec().then((project) => {
            return res.status(200).send({
                message: 'Listado de proyectos',
                project: project
            });
        }).catch((err) => {
            if (!project) {
                return res.status(404).send({
                    message: 'Error no se encontro los proyectos a listar'
                })
            }
            if (err) {
                return res.status(500).send({
                    message: 'Error al listar los proyectos'
                })
            }
        })
    },

    update: function (req, res) {
        var projectId = req.params.id;
        var update = req.body;

        //obtienes el id por el parametro a actualizar y le pasas el body entero de la REQ a actualizar, lo que hace es ir a la bdd y en ese ID, actualiza con los nuevos datos de la body.
        //Pasando el 3 parametro que es el options indicamos que queremos el ultimo objeto actualizado si no por defecto te muestra el objeto antiguo antes de ser actualizado.
        ProjectModel.findByIdAndUpdate(projectId, update, {new: true}).then((project) => {
            return res.status(200).send({
                message: 'Updated success',
                project: project
            });
        }).catch((err) => {
            if (!project) {
                return res.status(404).send({
                    message: 'Error no se ha encontrado el projecto a actualizar'
                })
            }
            if (err) {
                return res.status(500).send({
                    message: 'Error al actualizar el projecto'
                })
            }
        });
    },

    delete: function (req, res) {
        var projectId = req.params.id;
        //Busca el id del objeto a eliminar y lo elimina.
        ProjectModel.findByIdAndDelete(projectId).then((project) => {
            return res.status(200).send({
                message: 'Se ha borrado correctamente el projecto',
                project: project
            })
        }).catch((err) => {
            if (!project) {
                return res.status(404).send({
                    message: 'No se ha podido encontrar el projecto a borrar'
                })
            }
            if (err) {
                return res.status(500).send({
                    message: 'No se ha podido borrar el projecto'
                })
            }
        });
    }
}

module.exports = controller;