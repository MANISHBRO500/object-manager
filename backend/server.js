import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import objectRoutes from "./routes/objectRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ DB Error:", err));

app.use("/api/objects", objectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
