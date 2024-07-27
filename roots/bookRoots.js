const express = require("express");
const {getAllBooks} = require("../controllers/bookController");
const app = express.Router();
const {bookModel, userModel} = require("../modals/index");

app.get("/", getAllBooks);

module.exports = app;