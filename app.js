
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const ejs = require("ejs");
app.set('view engine', 'ejs');
app.use(express.static("public"));

// Mongoose

mongoose.connect("mongodb://localhost:27017/trackoDB")

const tracoSchema = new mongoose.Schema({
    userName: String,
    passWord: String
})

const Tracko = mongoose.model("Tracko", tracoSchema)

const tracko = new Tracko({
    userName: "Admin",
    passWord: "test123"
})

// tracko.save()

var details = {
    username: "",
    password: ""
};

app.get("/", function (req, res) {
    res.render("login", { error: "" });
});

app.post("/", function (req, res) {
    details = {
        username: req.body.Username,
        password: req.body.password
    };

    Tracko.findById(details.username, function (err, tracko) {
        console.log(details.password);
        if (!err) {
            if ("test123" === details.password) {
                // continue 
            }
            else {
                res.render("login", { error: "Incorrect Username or Password" });
            }
        }
    });
    if (details.username !== "Admin" || details.password !== "test123") {
        res.render("login", { error: "Incorrect Username or Password" });
    }
    res.redirect("/dashboard")

});

// Dashboard

app.get("/dashboard", function (req, res) {
    res.render("dash", { userName: details.username });
});

// Questinaire

app.get("/quiz", function (req, res) {
    res.render("quiz", { userName: details.username });
});

// app.post("/quiz", function (req, res) {
//     // const user = JSON.parse(req.body);
//     // console.log(user);
//     // res.render("music", { music: musicMood })
// })

// Music

app.get("/music", function (req, res) {
    res.render("music");
})

app.get("/musicsad", function (req, res) {
    res.render("musicsad");
})

app.get("/musicmod", function (req, res) {
    res.render("musicmod"); s
})

// Start the server on port 3000
app.listen(3001, function () {
    console.log("Server started on port 3000");
});