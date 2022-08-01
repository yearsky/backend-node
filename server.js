const bodyParser = require("body-parser");
const express = require("express");
const FileUpload = require("express-fileupload");

const app = express();
const cors = require("cors");
const routes = require("./routes");
require("dotenv").config();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(FileUpload());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(routes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Api Running in Port ${process.env.PORT}`)
);

process.on("SIGTERM", () => {
  console.info("SIGTERM signal received.");
  console.log("Closing http server.");
  server.close(() => {
    console.log("Http server closed.");
    process.exit(0);
  });
});
