
const path = require('path');

const sendMailWithDeviceName = async(req, res) => {
     try{
        const value = req.body
        const XLSX = require('xlsx');
        const pathName = path.resolve(__dirname, '../storage/device.xlsx');
        const workbook = XLSX.readFile(pathName);
        const sheet_name_list = workbook.SheetNames;
        const dataDeviceName = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        let getLable = []
        for (queryDataDeviceName of dataDeviceName){
            if (value.DeviceName === queryDataDeviceName.device) {
                getLable.push(queryDataDeviceName.lable)
            }
        }
        let contentLable = getLable.toString();

        res.json({
            status: 200,
            message: "Success",
            contentLable,
        })
     } catch (e) {
        res.json({
            status: 500,
            message: "Fail",
            err: e.toString(),
        })
     }
}

module.exports = {
    sendMailWithDeviceName,
}