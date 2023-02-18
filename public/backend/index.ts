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
]


const FileterByCategory = (news: typeof NEWS, category: string) => {
    if (category){
        return news.filter(n => n.category === category)
    }
    return news;
}


app.get('/news', (req: Request, res: Response) => {

    res.send(
        FileterByCategory(NEWS, req.query.category as string)
    )
})



app.listen(port, () => {
    console.log("SERVER RUNNING AT: ", port);
    
})




