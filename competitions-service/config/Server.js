const express = require('express');

module.exports = class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;

        this.routes = {
            competitions: '/api/v1/competitions'
        };
        this.routesSetUp();

        this.middlewareConfig();
    }

    routesSetUp() {
        this.app.use(this.routes.competitions, require('../routes/competitions.routes'));
    }

    middlewareConfig() {
        // this.app.use(cors());
        // this.app.use(express.json());
    }

    turnOn() {
        this.app.listen(this.port, () => { console.log('Competition MICROSERVICE running.') });
    }
}