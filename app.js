var express = require("express")
var mongoose = require("mongoose")
var routes = require("./routes/routes")
var cors = require("cors")


mongoose.connect("mongodb://localhost:27017/Emp_DB", { useNewUrlParser: true })
    .then(() => {
        var app = express()
        app.use(express.json())
        app.use("/api", routes)
        app.listen(3000, () => {
            console.log("Running 127.0.0.1:3000")
        });
    });

