const express = require('express');
const fileUpload = require('express-fileupload');
const app = express(); // express is egy függvény és ez lefut, és objektum jön vissza

// default options
app.use(fileUpload());

const path = require("path");

function getFunction(request, response){
    response.sendFile(path.join(`${__dirname}/../frontend/index.html`));
}

app.use(fileUpload());

app.get("/", getFunction);
app.use("/upload", express.static(`${__dirname}/../frontend/upload`));
app.use("/pub", express.static(`${__dirname}/../frontend/public`));

const uploads = path.join(`${__dirname}/../frontend/upload/`)

app.post("/", (req, res) => {
	//Upload image
	const image = req.files.picture
	const answer = {}

	if(image) {
		console.dir(image)
		
		image.mv(uploads + image.name)
	}

	answer.imageName = image.name
	res.send(answer)


	//Upload data from form
	const formData = req.body
	formData.image_name = picture.name
	jsonData.push(formData)

});

const port = 9000;
const ipAddress = "http://127.0.0.1:9000";
app.listen(port, () => {
    console.log(ipAddress)
});