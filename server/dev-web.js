global.Promise = require("bluebird");
// global.__NEXT_DATA__ = {};
var proxy = require("http-proxy-middleware");

const express = require("express"),
    next = require("next"),
    routes = require("../routes/web"),
    config = require("../configs/app.js"),
    app = next({ dev: true });

app.prepare()
    .then(() => {
        const server = express();
        server.set("subdomain offset", 1);
        server.use(
            "/api",
            proxy({ target: "localhost:3001", changeOrigin: true })
        );
        routes(server, app);
        server.listen(config.port, err => {
            if (err) throw err;
            console.log("> Web is ready on http://localhost:" + config.port);
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
