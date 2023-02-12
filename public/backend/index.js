"use strict";
exports.__esModule = true;
var express = require('express');
var app = express();
var port = 8000;
app.get('/data', function (req, res) {
    res.send({
        id: 'a',
        name: 'b'
    });
});
app.listen(port, function () {
    console.log("SERVER RUNNING AT: ", port);
});
