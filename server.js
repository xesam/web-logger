const express = require("express");
const body_parser = require("body-parser");
const fs = require("fs");
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'log.log' })
    ],
});

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(body_parser());
app.use(express.static("public"));

app.use("/log", (req, res) => {
    const body = req.body;
    logger.info(body);
    res.json({
        status: 200
    });
});

app.listen(app.get("port"), () => {
    console.log(
        `Express started on http://localhost:${app.get(
            "port"
        )};press Ctrl-C to terminate`
    );
});
