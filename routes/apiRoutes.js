const path = require("path");
const fs = require("fs");

//  npm package used to create unique id's based on the current time, process and machine name.
// https://www.npmjs.com/package/uniqid
var uniqid = require("uniqid");

// routing
module.exports = (app) => {
  
  app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });

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
};
