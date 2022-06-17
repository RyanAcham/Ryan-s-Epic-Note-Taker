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
//for adding new notes
app.post("/api/notes", (req, res)=>{
    let noteNew = req.body;
    let list = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let length = (list.length).toString();

    noteNew.len = length;
    list.push(noteNew);

    fs.writeFileSync("./db/db.json", JSON.stringify(list));
    res.json(list);
});
//for deleting notes depending on their length as identification
app.delete("/api/notes/:len", (req,res)=>{
    let list = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let id = (req.params.len).toString();

    list = list.filter(selected =>{
        return selected.id != id;
    });
    fs.writeFileSync("./db/db.json", JSON.stringify(list));
    res.json(list);
});
app.listen(PORT, () => console.log("Listening on port "+ PORT));