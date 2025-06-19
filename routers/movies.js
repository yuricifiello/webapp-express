const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// Rotta index: lista film
router.get("/", (req, res) => {
  const sql = "SELECT * FROM movies";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Rotta show: dettaglio film + recensioni
router.get("/:id", (req, res) => {
  const movieId = req.params.id;
  const sqlMovie = "SELECT * FROM movies WHERE id = ?";
  const sqlReviews = "SELECT * FROM reviews WHERE movie_id = ?";

  db.query(sqlMovie, [movieId], (err, movieResults) => {
    if (err) return res.status(500).json({ error: err });
    if (movieResults.length === 0)
      return res.status(404).json({ error: "Film non trovato" });

    db.query(sqlReviews, [movieId], (err, reviewResults) => {
      if (err) return res.status(500).json({ error: err });

      res.json({
        ...movieResults[0],
        reviews: reviewResults,
      });
    });
  });
});

module.exports = router;
