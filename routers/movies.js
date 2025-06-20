const express = require("express");
const router = express.Router();
const {
  getAllMovies,
  getMovieById,
  createReview,
} = require("../controllers/moviesController");

router.get("/", getAllMovies);
router.get("/:id", getMovieById);
router.post("/:id/reviews", createReview);

module.exports = router;
