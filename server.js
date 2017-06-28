const express = require("express");
const app = express();
const http = require("http").Server(app);

app.use(express.static("public"));

http.listen(3000, () => {
	console.log("Listening on *:3000");
});

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});
