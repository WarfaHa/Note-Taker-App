const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// got error "Cannot access 'app' before initialization" so I had to move it below the app
// routes to route files
require('./routes/noteRoutes')(app);

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
// Fixed error get the notes page
// Finally got a 200 success status on Insomnia
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Listening to app
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
