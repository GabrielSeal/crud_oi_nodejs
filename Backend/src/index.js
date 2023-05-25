
const { response } = require('express');
const { request } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');   
require('./config/dbconfig');
const routes = require('./routes')

app.use(cors());
app.use(express.json()); // recurso para ler um json
app.use(routes);
app.listen(3333);