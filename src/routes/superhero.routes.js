const express = require("express");
const superhero_model = require("../models/superhero.model");
const routes = express.Router();

/* Crear un nuevo registro 
    mongoose method: save()
    https://localhost:5000/ 
*/
routes.post("/", (req, res) => {
    const new_superhero = superhero_model(req.body);
    new_superhero
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err })); 
});

/* listar todos los registros de la BD 
    mongoose method: find()
*/
routes.get("/", (req, res) =>{
    superhero_model
        .find()
        .then((data) => res.json(data))
        .catch((err)=> res.json({message: err})); 
});

/* consultar un usuario por ID
    http: GET
    mongoose method: findById({_id: ?})
*/
routes.get("/:superheroId", (req, res) =>{
    const {superheroId} = req.params;
    superhero_model
        .findById({_id: superheroId})
        .then((data) => res.json(data))
        .catch((err)=> res.json({message: err})); 
});

/* modificar todos los usuarios existentes
    http: PUT
    mongoose method: updateOne()
*/
routes.put("/:superheroId", (req, res) =>{
    const {superheroId} = req.params.superheroId;
    /* const {superhero, universe, superporwers, address} = req.body;*/
    const query = { _id: superheroId};
    const update = { $set: req.body};
    superhero_model
        .updateOne(query, update)
        .then((data) => res.json(data))
        .catch((err)=> res.json({message: err})); 
});

/* eliminar uno de los superheroes existentes
    http: DELETE
    mongoose method: deleteOne()
*/
routes.delete("/:superheroId", (req, res) =>{
    const {superheroId} = req.params;
    superhero_model
        .deleteOne({_id: superheroId})
        .then((data) => res.json(data))
        .catch((err)=> res.json({message: err})); 
});

/* --eliminar todas las coincidencias realizando las busquedas por una
    propiedad especifica
    http: DELETE
    mongoose method: deleteMany()
*/
routes.delete("/", (req, res) =>{
    const query = {superhero: {$regex: "batman"}};
    superhero_model
        .deleteMany({query})
        .then((data) => res.json(data))
        .catch((err)=> res.json({message: err})); 
});

/* --consultar por una propiedad  los registros que sean diferentes
    http: GET
    mongoose method: distinct
*/
routes.get("/superpowers-list/:property", (req, res) =>{
    const property = req.params.property;
    superhero_model
        .distinct(property)
        .then((data) => res.json(data))
        .catch((err)=> res.json({message: err})); 
});

/* consultar por una propiedad  los 5 registros que sean diferentes
    http: GET
    mongoose method: distinct & slice con parametro limit
*/
routes.get("/:property/:limit", (req, res) =>{
    const property = req.params.property;
    const limit = parseInt(req.params.limit);
    superhero_model
        .distinct(property)
        .then((data) => res.json(data.slice(0, limit)))
        .catch((err)=> res.json({message: err})); 
});

module.exports = routes;
