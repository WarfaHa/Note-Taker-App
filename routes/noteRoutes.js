// Allows us to work with files and directory paths
const path = require("path");
// Allows to to work with files such as read and write
const fs = require("fs");

// This npm package is used to create unique id's based on the current time, process and machine name.
// https://www.npmjs.com/package/uniqid
var uniqid = require("uniqid");

module.exports = (app) => {
  
  // GET Route for a specific note
  app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });

  // POST Route for a new note
  app.post("/api/notes", (req, res) => {
    let db = fs.readFileSync("db/db.json");
    db = JSON.parse(db);
    res.json(db);
    
    let userNote = {
      title: req.body.title,
      text: req.body.text,
     
      id: uniqid(),
    };
    
    db.push(userNote);
    fs.writeFileSync("db/db.json", JSON.stringify(db));
    res.json(db);
  });

  // DELETE Route for a specific note
  app.delete('/api/notes/:id', (req, res) => {
    
    let db = JSON.parse(fs.readFileSync('db/db.json'))
    
     // Make a new array of all notes except the one with the ID provided in the URL
    let result = db.filter(item => item.id !== req.params.id);
    
    // Save that array to the filesystem
    fs.writeFileSync('db/db.json', JSON.stringify(result));
    res.json(result);
    
  })
};
