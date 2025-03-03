const ExcelJS = require('exceljs/dist/es5');
const colCache = require('exceljs/dist/es5/utils/col-cache');
const fs = require('fs');

// Schema format: An array containing element for every sheet
// The element of each sheet is an array containing key-value pairs for result
// The key-value pair is an object containing key, data, type, has_key
// if not has_key, then key is taken from the cell address, else key is the key
// type is either value or table
// if type is value, then data is the value of the cell, read from the cell address and assign to key in result
// if type is table, then data is the starting cell of the table, read array of rows and assign to key in result
/*
    [
        [
            {
                "key": "<cell address>",
                "data": "<cell address>",
                "type": "value"/"table"/"array",
                "has_key": true/false, // if the "key" is a key for the value
            }
        ]
    ]
*/

const extract = async (buffer, schema=[]) => {
    let result = {};

    try {
        const wb = new ExcelJS.Workbook();
        const workbook = await wb.xlsx.load(buffer);

        let index = 0;
        workbook.eachSheet(function(sheet, sheetId) {
            const sheetSchema = schema[index];
            if (!sheetSchema) return;

            const tables = Object.values(sheet.tables);
            for (let j = 0; j < sheetSchema.length; j++) {
                const schemaElement = sheetSchema[j];
                if (!schemaElement.data || !schemaElement.key) continue;
                //
                let key = schemaElement.has_key ? schemaElement.key : sheet.findCell(schemaElement.key);
                if (!key) continue;
                //
                if (schemaElement.type === 'table') {
                    const table = tables.find(table => table.table.tableRef.startsWith(`${schemaElement.data}:`));
                    if (table) {
                        const rowsKey = schemaElement.row_keys;
                        const ref = table.table.tableRef;
                        const [startAddr,endAddr] = ref.split(':').map(addr => colCache.decodeEx(addr));
                        let rows = [];
                        for (let r = startAddr.row; r <= endAddr.row; r++) {
                            let row = rowsKey ? {} : [];
                            let cIndex = 0;
                            for (let c = startAddr.col; c <= endAddr.col; c++) {
                                const cell = sheet.findCell(r, c);
                                const cellRes = cell.value ? (typeof cell.value === 'object' ? (cell.value.result || cell.value.text) : cell.value) : '';
                                //
                                if (rowsKey) {
                                    if (rowsKey[cIndex]) {
                                        row[rowsKey[cIndex]] = cellRes;
                                    }
                                } else {
                                    row.push(cellRes);
                                }
                                //
                                cIndex++;
                            }
                            rows.push(row);
                        }
                        result[key] = rows;
                    }
                } else if (schemaElement.type === 'array') {
                    const cell = sheet.findCell(schemaElement.data);
                    const cellRes = cell.value ? (typeof cell.value === 'object' ? (cell.value.result || cell.value.text) : cell.value) : '';
                    // last array
                    let lastArray = result[key] || [];
                    if (Array.isArray(lastArray)) {
                        lastArray.push(cellRes);
                    }
                    result[key] = lastArray;
                } else {// value type
                    const cell = sheet.findCell(schemaElement.data);
                    const cellRes = cell.value ? (typeof cell.value === 'object' ? (cell.value.result || cell.value.text) : cell.value) : '';
                    result[key] = cellRes;
                }
            }

            index++;
        });
    } catch (error) {
        console.error(error);
        return result;
    }

    return result;
};

const extractFromFile = async (filePath, schema=[]) => {
    const buffer = fs.readFileSync(path.resolve(__dirname, filePath));
    return await extract(buffer, schema);
};

module.exports = {
    extract,
    extractFromFile,
};