'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Modelo del "objeto" al que se hace referencia en la bdd noSQL.
//Al realizar un NEW project va a tener que llevar esta estructura el obj.
var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String
});

//Ojo que mongoose pone en minusculas y lo pruriolaliza para guardar en la bdd (Project->projects)
module.exports = mongoose.model('Project', ProjectSchema);