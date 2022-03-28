const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require("fs");
const app = express(); // express is egy függvény és ez lefut, és objektum jön vissza

const path = require("path");
const dataLocation = path.join(`${__dirname}/../frontend/data/`);

function getFunction(req, res){
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
}

app.use(fileUpload());
app.use("/upload", express.static(`${__dirname}/../frontend/upload`));
app.use("/pub", express.static(`${__dirname}/../frontend/public`));

app.get("/", getFunction);

const uploads = path.join(`${__dirname}/../frontend/upload/`)

// If there is a data.json, read the data from the file, if not, use an empty Array
let jsonData = [];
try {
    let data = fs.readFileSync(`${dataLocation}data.json`, error => {
        if (error) {
            console.log(error);
        }
    });
    jsonData = JSON.parse(data);
} catch (error) {
    fs.writeFile(`${dataLocation}data.json`, JSON.stringify(jsonData), (error) => {
        if (error) {
            console.log(error);
        }
    });
}

app.post("/", (req, res) => {
    // Upload image
    const picture = req.files.picture;
    const answer = {};

    if (picture) {
        picture.mv(uploads + picture.name, error => {
            return res.status(500).send(error);
        });
    }
    answer.pictureName = picture.name;

    // Upload data from form
    const formData = req.body;
    formData.image_name = picture.name;
    jsonData.push(formData);

    fs.writeFile(`${dataLocation}data.json`, JSON.stringify(jsonData), (error) => {
        if (error) {
            console.log(error);
        }
    });
    res.send(answer);
});


const port = 9000;
const ipAddress = "http://127.0.0.1:9000";
app.listen(port, () => {
    console.log(ipAddress)
});