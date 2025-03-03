const { extract } = require('./src');

const fs = require('fs');
const path = require('path');

const buffer = fs.readFileSync(path.join(__dirname, 'API_Sample.xlsx'));

extract(buffer, [
    [
      {"key": "profile_type","data": "B2","type": "value","has_key": true},
      {"key": "profile_name","data": "B3","type": "value","has_key": true},
      {"key": "url","data": "B4","type": "value","has_key": true},
      {"key": "method","data": "B5","type": "value","has_key": true},

      {"key": "A6","data": "B6","type": "array","has_key": false},
      {"key": "A7","data": "B7","type": "array","has_key": false},
      {"key": "A8","data": "B8","type": "array","has_key": false},
      {"key": "A9","data": "B9","type": "array","has_key": false},
      {"key": "A10","data": "B10","type": "array","has_key": false},
      {"key": "A11","data": "B11","type": "array","has_key": false},
      {"key": "A12","data": "B12","type": "array","has_key": false},
      {"key": "A13","data": "B13","type": "array","has_key": false},
      {"key": "A14","data": "B14","type": "array","has_key": false},
      {"key": "A15","data": "B15","type": "array","has_key": false},

      {"key": "bct_data_config","data": "A10","type": "table","has_key": true,
        "row_keys":["api_key","label","parameter","unit","point_label","modbus_addr","api_label"]}
    ]
    ])
    .then(result => {
        console.log("adf:", result);
    })
    .catch(error => {
        console.error(error);
    });
