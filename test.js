const { extract } = require('./src');

const fs = require('fs');
const path = require('path');


extract(buffer, [[
    {
        key: "A3",
        data: "B3",
        type: "value",
        has_key: false,
    },
    {
        key: "A4",
        data: "B4",
        type: "value",
        has_key: false,
    },
    {
        key: "data_config",
        data: "A10",
        type: "table",
        has_key: true,
    }
]])
    .then(result => {
        console.log("adf:", result);
    })
    .catch(error => {
        console.error(error);
    });