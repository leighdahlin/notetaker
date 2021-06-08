const express = require('express');
const path = require('path');
const fs = require('fs')
const generateUniqueId = require('generate-unique-id');
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

// app.get('/api/notes/:id', (req,res)=> res.sendFile(path.join(__dirname, '../../../db/db.json')));

app.post('/api/notes',(req,res)=> {
    console.log("You are in the post request")
    const note = req.body;
    let id = generateUniqueId({
        length:5,
        useLetters: false
      });
      note.id = id
      console.log(note)
      console.log(id);
      JSON.stringify(note)
    fs.readFile('../../../db/db.json', 'utf-8',function (err, data){
        if(err) throw err
        var arrayofObjects = JSON.parse(data)
        arrayofObjects.push(note)

        fs.writeFile('../../../db/db.json',JSON.stringify(arrayofObjects),function(err) {
            if(err) {console.log(err);
        }});
    })

    res.json(note)

})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));