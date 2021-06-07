const express = require('express');
const path = require('path');
const fs = require('fs')
const id = require('generate-unique-id');
const { fstat } = require('fs');

const app = express();
const PORT = 3500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/../../../public'));

app.get('/notes', (req,res) => res.sendFile(path.join(__dirname, '../../notes.html')));
// app.get('/notes', (req,res) => res.sendFile(path.join(__dirname, '../../css/style.css')));

app.get('/', (req,res) => res.sendFile(path.join(__dirname, '../../index.html')));

app.get('/api/notes', (req,res)=> res.sendFile(path.join(__dirname, '../../../db/db.json')));

app.post('/api/notes',(req,res)=> {
    console.log("You are in the post request")
    const newNote = req.body;
    //need to push newNote to db.json file
    fs.writefile('../../../db/db.json',newNote,function(err) {
        if(err) {console.log(err);
    }});
    res.json(newNote)

})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));