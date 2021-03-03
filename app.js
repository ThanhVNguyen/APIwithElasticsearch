const express = require('express');
const app = express();
const ticket = require('./controller/ticket');
const userAbnormal = require('./controller/user-abnormal');
const ticketDemo = require('./controller/updateTicketDemo');
const groupAlert = require('./controller/groupAlert');
const readFileData = require('./controller/readFile');
const readFileExcel = require('./controller/readFileExcel');
const sendMailWithDeviceName = require('./controller/sendMailWithDeviceName');
const dotenv = require('dotenv')
dotenv.config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/updateTicketFields', ticket.addFieldTicket);
app.get('/getUserAbnormal', userAbnormal.getUserAbnormal);
app.get('/update', ticket.updateTicket);
app.get('/updateDemo', ticketDemo.demo);
app.get('/getGroupAlert',groupAlert.getGroupAlert);
app.get('/readFileData',readFileData.processFile);
app.get('/readFileExcel', readFileExcel.readFileExcel);
app.post('/sendMailWithDeviceName',sendMailWithDeviceName.sendMailWithDeviceName);

app.listen(process.env.PORT, ()=>{
  console.log(`Server is runnning port: ${process.env.PORT}`);
});
