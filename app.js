const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const router = require('./router');


const app = express();
app.use(bodyParser.json());

router(app);




app.listen(3000);
