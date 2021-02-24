const express = require('express');
const app = express();
const ticket = require('./ticket');
const userAbnormal = require('./user-abnormal');
const ticketDemo = require('./updateTicketDemo');
const groupAlert = require('./groupAlert');
const readFileData = require('./readFile');
const dotenv = require('dotenv')
dotenv.config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/updateTicketFields', ticket.addFieldTicket);
app.get('/getUserAbnormal', userAbnormal.getUserAbnormal);
app.get('/update', ticket.updateTicket);
app.get('/updateDemo', ticketDemo.demo);
app.get('/getGroupAlert',groupAlert.getGroupAlert)
app.get('/readFileData',readFileData.processFile)

app.listen(process.env.PORT, ()=>{
  console.log(`Server is runnning port: ${process.env.PORT}`);
});
