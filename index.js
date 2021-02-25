const express = require("express");
const http = require("http");
const port = 8000;
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const bodyParser = require("body-parser");
const routes = require('./app/routes')

app.use(cors('*'));
app.use(bodyParser.json())

routes.declare(app);

server.listen(port, () => console.log(`Listening on port ${port}`));