const express = require('express');
const app = express();
const readFileExcel = require('./controller/readFileExcel');
const dotenv = require('dotenv')
dotenv.config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/readFileExcel', readFileExcel.readFileExcel);

app.listen(process.env.PORT, ()=>{
  console.log(`Server is runnning port: ${process.env.PORT}`);
});
