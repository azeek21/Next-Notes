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
var NEWS = [
    {
        "id": 1,
        "title": "News Article 1",
        "description": "Description 1",
        "category": "adult"
    },
    {
        "id": 2,
        "title": "News Article 2",
        "description": "Description 2",
        "category": "sports"
    },
    {
        "id": 3,
        "title": "News Article 3",
        "description": "Description 3",
        "category": "politics"
    },
    {
        "id": 4,
        "title": "News Article 4",
        "description": "Description 4",
        "category": "sports"
    }
];
var FileterByCategory = function (news, category) {
    if (category) {
        return news.filter(function (n) { return n.category === category; });
    }
    return news;
};
app.get('/news', function (req, res) {
    res.send(FileterByCategory(NEWS, req.query.category));
});
app.listen(port, function () {
    console.log("SERVER RUNNING AT: ", port);
});
