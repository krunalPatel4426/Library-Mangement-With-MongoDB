const express = require("express");
const {getAllBooks, getBookById, getAllIssuedBook, addNewBook, updateBook} = require("../controllers/bookController");
const app = express.Router();
const {bookModel, userModel} = require("../modals/index");

app.get("/", getAllBooks);

app.get("/:id", getBookById);

app.get("/issued/by-user", getAllIssuedBook);

app.post("/addBook", addNewBook);

app.put("/updateBook/:id", updateBook);

module.exports = app;