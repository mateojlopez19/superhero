const express = require("express");
const superhero_routes_access = require("./superhero.routes");
const routes = express.Router();

const app_routes_system = (app) => {
    /* http://localhost:5000/api/v1 */
    app.use("/api/v1", routes);
    /* http://localhost:5000/api/v1/users */
    routes.use("/superheros", superhero_routes_access)
};

module.exports = app_routes_system;