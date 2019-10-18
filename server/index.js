require("dotenv").config({
    silent: true
});
global.Promise = require("bluebird");

const express = require("express"),
    next = require("next"),
    cors = require("cors"),
    bodyParser = require("body-parser"),
    routes = require("../routes"),
    config = require("../configs/app.js"),
    app = next({ dev: false });
app
    .prepare()
    .then(() => {
        const server = express(),
            http = require("http").Server(server),
            io = require("socket.io")(http);
        server.use("/api", routes.api);
        routes.web(server, app);
        routes.socket(io);
        http.listen(config.port, err => {
            if (err) throw err;
            console.log("> Ready on http://localhost:" + config.port);
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });