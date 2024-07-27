const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
function dbConnection(){
    const DB_URl = process.env.MONGO_URI;
    console.log(DB_URl);
     mongoose.connect(DB_URl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("Hello")
}

const db = mongoose.connection;
console.log("working");
db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", function(){
    console.log("DB Connection Done.");
});

module.exports = dbConnection;

