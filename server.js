const express = require("express");
const body_parser = require("body-parser");
const fs = require("fs");
let app = express();
app.set("port", process.env.PORT || 4000);

app.use(body_parser());
app.use(express.static("public"));

app.post("/regeo/save/", (req, res) => {
    let geo = req.body;
    console.log(`${geo.x},${geo.y}`);
    fs.writeFile(
        `./output/${geo.x}.csv`,
        `${geo.x}#${geo.y}#${geo.lng}#${geo.lat}#${geo.format}#${JSON.stringify(
            geo.components
        )}\n`,
        {
            flag: "a",
            encoding: "utf-8"
        },
        err => {
            if (err) {
                console.log(err);
                res.json({
                    status: 200
                });
            } else {
                res.json({
                    status: 0
                });
            }
        }
    );
});

app.listen(app.get("port"), () => {
    console.log(
        `Express started on http://localhost:${app.get(
            "port"
        )};press Ctrl-C to terminate`
    );
});
