const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

// Allow CORS only for your frontend
app.use(cors({
  origin: "https://manishbro500.github.io"
}));

// Routes
const objectRoutes = require("./routes/objects");
app.use("/api/objects", objectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
