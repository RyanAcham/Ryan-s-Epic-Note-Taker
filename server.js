const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
//listens to see if heroku can find a port; default port is 8000
const PORT = process.env.PORT || 8000;
//setting up express directories
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//routing
//notes routing
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
//routing for saved notes
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});
//routing to index
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.listen(PORT, () => console.log("Listening on port "+ PORT));