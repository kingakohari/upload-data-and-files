
const express = require("express");
const path = require("path");
const app = express(); // express is egy függvény és ez lefut, és objektum jön vissza

function getFunction(request, response){
    response.sendFile(path.join(`${__dirname}/../frontend/index.html`));
}

app.use(fileUpload());

app.get("/", getFunction);
app.use("/upload", express.static(`${__dirname}/../frontend/upload`));
app.use("/pub", express.static(`${__dirname}/../frontend/public`));

const port = 9000;
const ipAddress = "http://127.0.0.1:9000";
app.listen(port, () => {
    console.log(ipAddress)
});