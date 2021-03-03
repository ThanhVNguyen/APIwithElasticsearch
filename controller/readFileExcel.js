const dotenv = require('dotenv')
dotenv.config();
const path = require('path');

const readFileExcel = async(req, res) => {
    try {
        const XLSX = require('xlsx');
        const pathName = path.resolve(__dirname, '../storage/device.xlsx');
        const workbook = XLSX.readFile(pathName);
        const sheet_name_list = workbook.SheetNames;
        const dataFileExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        res.json({
            status: 200,
            message: "Success",
            dataFileExcel,
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
    readFileExcel,
}