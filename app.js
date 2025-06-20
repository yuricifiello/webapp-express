const express = require("express");
const cors = require("cors");
const moviesRouter = require("./routers/movies");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
