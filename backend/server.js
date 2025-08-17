// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000;

// ================== Middleware ==================
app.use(express.json());

// Allow CORS from your GitHub Pages frontend
app.use(
  cors({
    origin: "https://manishbro500.github.io", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ================== MongoDB Connection ==================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // stop app if no DB
  }
};

// ================== Schema & Model ==================
const objectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
});

const ObjectItem = mongoose.model("objectitems", objectSchema);

// ================== Routes ==================

// test route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running...");
});

// Get all objects
app.get("/api/objects", async (req, res) => {
  try {
    const objects = await ObjectItem.find();
    res.json(objects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add object
app.post("/api/objects", async (req, res) => {
  try {
    const { name, description } = req.body;
    const newObject = new ObjectItem({ name, description });
    await newObject.save();
    res.json(newObject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================== Start Server AFTER DB connects ==================
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
