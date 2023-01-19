/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: _Priyansh Parikh_ Student ID: _158341214_ Date: _18/01/2023_
* Cyclic Link: _______________________________________________________________
*
********************************************************************************/ 

const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const app = express();
const cors = require('cors');
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();
const HTTP_PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({message: "API Listening"});
})

app.post("/api/movies", (req, res) => {
    db.addNewMovie(req.body)
    .then((movie) => {
        res.status(201).json(movie);
    })
    .catch(() => {
        res.status(500).json({message: "Fail to add new movie"});
    });
}) 

app.get("/api/movies", (req, res)=>{
    db.getAllMovies(req.query.page, req.query.perPage, req.query.title)
    .then((movie) => {
        res.json(movie);
    })
    .catch((err) => {
        res.json(err);
    });
})

app.get("/api/movies/:_id", (req, res)=>{
    db.getMovieById(req.params._id)
    .then((movie) => {
        res.json(movie)
    })
    .catch(()=>{
        res.json({message: `Update failed ${req.params._id}`});
    });
})

app.put("/api/movies/:_id", (req, res)=>{
    db.updateMovieById(req.body, req.params._id)
    .then((movie) => {
        res.json({message: `Movie updated successfully!`})
    })
    .catch(()=>{
        res.json({message: `update failed ${req.params._id}`});
    });
})

app.delete("/api/movies/:_id", (req, res)=>{
    db.deleteMovieById(req.params._id)
    .then(((movie)=>{
        res.status(201).json({message: `Movie deleted`})
    }))
    .catch(()=>{
        res.status(500).json({message: `Delete failed ${req.params._id}`});
    });
})

app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
    });
   }).catch((err)=>{
    console.log(err);
});