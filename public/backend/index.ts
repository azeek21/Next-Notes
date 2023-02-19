import { Express, Request, Response } from "express";
const express = require('express')
const cors = require('cors');
const app = express()

app.use(cors())
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

type EventType = {
    id: string,
    title: string,
    description: string,
    category: "sports" | "politics" | "party" | "education",
    data: string
}


const EVENTS: EventType[] = [
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

]



const FileterByCategory = (news: any, category: string) => {
    if (category === "ALL") {
        return news;
    }
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

app.get('/dashboard', (req: Request, res: Response) => {

    setTimeout(() => {
        res.send(
            {
                likes: 11,
                followers: 22,
                posts: 45,
                status: "gold"
            }
        )   
    }, 1000);
})

app.get('/events', (req: Request, res: Response) => {

    setTimeout(() => {
        res.send(FileterByCategory(EVENTS, req.query.category as string))
    }, 1000);
})


app.listen(port, () => {
    console.log("SERVER RUNNING AT: ", port);
    
})




