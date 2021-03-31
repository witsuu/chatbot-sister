const Route = require("express").Router();

Route.get("/", (req, res) => res.send("serve connected"));

module.exports = Route;
