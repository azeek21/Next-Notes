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

app.listen(port, () => {
    console.log("SERVER RUNNING AT: ", port);
    
})




