"use strict";
exports.__esModule = true;
var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
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
var EVENTS = [
    {
        id: "0",
        title: "Event  0",
        description: "desc 0",
        category: "sports",
        data: "today"
    },
    {
        id: "1",
        title: "Event  1",
        description: "desc 1",
        category: "politics",
        data: "today"
    },
    {
        id: "2",
        title: "Event  2",
        description: "desc 2",
        category: "politics",
        data: "today"
    },
    {
        id: "3",
        title: "Event  3",
        description: "desc 3",
        category: "education",
        data: "today"
    },
    {
        id: "4",
        title: "Event  4",
        description: "desc 4",
        category: "party",
        data: "today"
    },
    {
        id: "5",
        title: "Event  5",
        description: "desc 5",
        category: "party",
        data: "today"
    },
];
var FileterByCategory = function (news, category) {
    if (category === "ALL") {
        return news;
    }
    if (category) {
        return news.filter(function (n) { return n.category === category; });
    }
    return news;
};
app.get('/news', function (req, res) {
    res.send(FileterByCategory(NEWS, req.query.category));
});
app.get('/dashboard', function (req, res) {
    console.log("Dashboard requested ...");
    setTimeout(function () {
        res.send({
            likes: 11,
            followers: 22,
            posts: 45,
            status: "gold"
        });
    }, 1000);
});
app.get('/events', function (req, res) {
    setTimeout(function () {
        res.send(FileterByCategory(EVENTS, req.query.category));
    }, 1000);
});
app.listen(port, function () {
    console.log("SERVER RUNNING AT: ", port);
});
