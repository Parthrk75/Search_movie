const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Slashash_Tech',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + db.threadId);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/list-favorite', (req, res) => {
  const sql = 'SELECT * FROM favorites';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving favorite movies: ' + err);
      res.status(500).send('Error retrieving favorite movies.');
    } else {
      res.status(200).json(results);
    }
  });
});

app.post('/mark-as-favorite', (req, res) => {
  const movieId = req.body.movieId;

  const sql = 'INSERT INTO favorites (movie_id) VALUES (?)';
  db.query(sql, [movieId], (err, result) => {
    if (err) {
      console.error('Error marking the movie as a favorite: ' + err);
      res.status(500).send('Error marking the movie as a favorite.');
    } else {
      console.log('Movie marked as a favorite.');
      res.status(200).send('Movie marked as a favorite.');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
