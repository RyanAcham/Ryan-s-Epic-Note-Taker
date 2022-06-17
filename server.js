const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
//listens to see if heroku can find a port; default port is 8000
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("Listening on port "+ PORT));