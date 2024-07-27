
const express = require("express");
const dotenv = require("dotenv");
const app = express();
const dbConnection = require("./databaseConnection.js");
app.use(express.json());
const PORT = 8081;
dotenv.config();
dbConnection();
const bookRoot = require("./roots/bookRoots.js");

app.use("/books", bookRoot);
app.listen(PORT, () => {
    console.log("Server UP at 8081");
});