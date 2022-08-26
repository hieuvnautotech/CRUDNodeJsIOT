const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan"); // để log
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./server/database/connection");

const app = express();
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

// var bodyParser = require("body-parser");
//log req
app.use(morgan("tiny"));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
// parse various different custom JSON types as JSON
app.use(bodyParser.json());

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));

// parse an HTML body into a string
app.use(bodyParser.text({ type: "text/html" }));
// app.use(function (req, res) {
//   res.setHeader("Content-Type", "text/plain");
//   res.write("you posted:\n");
//   res.end(JSON.stringify(req.body, null, 2));
// });

// set view engine
app.set("view engine", "ejs");
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
app.use("/", require("./server/routes/router"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
