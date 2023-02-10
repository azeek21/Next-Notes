"use strict";
exports.__esModule = true;
var express = require('express');
var app = express();
var port = 8000;
app.get('/users', function (req, res) {
    res.send([{
            id: 'b',
            name: 'd',
            username: 'a',
            email: 'a',
            address: 'a',
            phone: 'a',
            website: 'a',
            company: 'a'
        }]);
});
app.listen(port, function () {
    console.log("SERVER RUNNING AT: ", port);
});
