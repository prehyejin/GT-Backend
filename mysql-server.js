const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({ path: ".env" });
//const fileupload = require('express-fileupload');

const app = express();

const PORT = process.env.PORT || 3001;

const allowedOrigins = [
	"http://localhost:3000",
	"http://ict.gatc.co.kr",
	"https://ict.gatc.co.kr",
];

// Set CORS option
app.use(
	cors({
		origin: function (origin, callback) {
			// allow requests with no origin
			// (like mobile apps or curl requests)
			if (!origin) return callback(null, true);
			if (allowedOrigins.indexOf(origin) === -1) {
				var msg =
					"The CORS policy for this site does not " +
					"allow access from the specified Origin.";
				return callback(new Error(msg), false);
			}
			return callback(null, true);
		},
	})
);

// Parse requests of content-type: application/json
app.use(bodyParser.json());

// Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Use File Upload
//app.use(fileupload());

// RESTful API route for DB
app.use("/", require("./src/app/mysql/route/route.js"));

// static files
app.use("/static", express.static("public"));

// DB Connection
const db = require("./src/app/mysql/model/index.js");
db.sequelizeConfig.sync();

// Default route for server status
app.get("/", (req, res) => {
	res.json({ message: `Server is running on port ${PORT}` });
});

// Set listen port for request
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
