import { Express, Request, Response } from "express";
const express = require('express')

const app = express()

const port = 8000;

app.get('/users', (req, res) => {
    res.send([{
    id: 'b',
    name: 'd',
    username: 'a',
    email: 'a',
    address: 'a',
    phone: 'a',
    website: 'a',
    company: 'a',
}])
})

app.listen(port, () => {
    console.log("SERVER RUNNING AT: ", port);
    
})




