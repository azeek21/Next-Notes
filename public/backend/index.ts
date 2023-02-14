import { Express, Request, Response } from "express";
const express = require('express')

const app = express()

const port = 8000;

app.get('/data', (req, res) => {
    res.send({
    id: 'a',
    name: 'b',
})
})


const NEWS = [
    {
        "id": 1,
        "title": "News Article 1",
        "description": "Description 1",
        "category": "category 1"
    },
    {
        "id": 2,
        "title": "News Article 2",
        "description": "Description 2",
        "category": "category 2"
    },
    {
        "id": 3,
        "title": "News Article 3",
        "description": "Description 3",
        "category": "category 3"
    },
    {
        "id": 4,
        "title": "News Article 4",
        "description": "Description 4",
        "category": "category 4"
    }
]


app.get('/news', (req: Request, res: Response) => {
    res.send(
        NEWS
    )
})



app.listen(port, () => {
    console.log("SERVER RUNNING AT: ", port);
    
})




