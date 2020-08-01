const express = require("express");
const body_parser = require("body-parser");
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {},
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: 'log.log'})
    ],
});

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(body_parser());
app.use(express.static("public"));

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.post("/log", (req, res) => {
    const body = req.body;
    body.datetime = Date.now();
    logger.info(body);
    res.json({
        status: 200
    });
});

app.listen(app.get("port"), () => {
    const port = app.get('port');
    console.log(
        `Express started on http://localhost:${port};press Ctrl-C to terminate`
    );
});
