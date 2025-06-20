const db = require("../db/connection");

function getAllMovies(req, res) {
  db.query("SELECT * FROM movies", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
}

function getMovieById(req, res) {
  const sqlMovie = "SELECT * FROM movies WHERE id = ?";
  const sqlReviews = "SELECT * FROM reviews WHERE movie_id = ?";
  const movieId = req.params.id;

  db.query(sqlMovie, [movieId], (err, movieResults) => {
    if (err) return res.status(500).json({ error: err });
    if (movieResults.length === 0)
      return res.status(404).json({ error: "Film non trovato" });

    db.query(sqlReviews, [movieId], (err, reviewResults) => {
      if (err) return res.status(500).json({ error: err });

      res.json({ ...movieResults[0], reviews: reviewResults });
    });
  });
}

function createReview(req, res) {
  const movieId = req.params.id;
  const { name, vote, text } = req.body;
  if (!name || !vote || !text)
    return res.status(400).json({ error: "Tutti i campi sono obbligatori" });

  const sql =
    "INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)";
  db.query(sql, [movieId, name, vote, text], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res
      .status(201)
      .json({
        message: "Recensione inserita con successo",
        id: result.insertId,
      });
  });
}

module.exports = { getAllMovies, getMovieById, createReview };
