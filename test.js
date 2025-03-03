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

      {"key": "A6","object_key": "B6","type": "object","has_key": false, "data": "C6"},
      {"key": "A7","object_key": "B7","type": "object","has_key": false, "data": "C7"},
      {"key": "A8","object_key": "B8","type": "object","has_key": false, "data": "C8"},
      {"key": "A9","object_key": "B9","type": "object","has_key": false, "data": "C9"},
      {"key": "A10","object_key": "B10","type": "object","has_key": false, "data": "C10"},
      {"key": "A11","object_key": "B11","type": "object","has_key": false, "data": "C11"},
      {"key": "A12","object_key": "B12","type": "object","has_key": false, "data": "C12"},
      {"key": "A13","object_key": "B13","type": "object","has_key": false, "data": "C13"},
      {"key": "A14","object_key": "B14","type": "object","has_key": false, "data": "C14"},
      {"key": "A15","object_key": "B15","type": "object","has_key": false, "data": "C15"},

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
