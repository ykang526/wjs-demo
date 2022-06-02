const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());


const genres = [
    { "romance" },
    { "action" },
    { "" }
]


app.get('/api/genres', (req, res) => {
    res.send(genres)
});