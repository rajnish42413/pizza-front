require("dotenv").config({
    silent: true
});

global.Promise = require("bluebird");

const express = require("express"),
    app = express(),
    server = require("http").Server(app),
    io = require("socket.io")(server);

const routes = require("../api.build");

app.use("/api", require("../api.build").default(app));

server.listen(3001, "0.0.0.0", err => {
    if (err) throw err;
    console.log("> Api is ready on http://localhost:" + 3001);
});
