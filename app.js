var express = require("express")
var mongoose = require("mongoose")
var routes = require("./routes/routes")
var cors = require("cors")

//Mongoose used to connect to MongoDB running
mongoose.connect("mongodb://localhost:27017/Emp_DB", { useNewUrlParser: true })
    .then(() => {
        var app = express()
        app.use(express.json())
        app.use("/api", routes)
        app.listen(3000, () => {
            console.log("Running 127.0.0.1:3000")
        });
    });

