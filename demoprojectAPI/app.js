const masterUser = require("./API/Master/master_user.js");
const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());


app.use('/user', masterUser);




module.exports = app;