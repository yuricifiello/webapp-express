const express = require("express");
const cors = require("cors");
const moviesRouters = require("./routers/movies");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouters);

app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
