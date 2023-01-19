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

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({message: "API Listening"});
})