import express from "express";
import ObjectModel from "../models/Object.js";

const router = express.Router();

// Get all objects
router.get("/", async (req, res) => {
  const objects = await ObjectModel.find();
  res.json(objects);
});

// Add object
router.post("/", async (req, res) => {
  const { name, quantity, price } = req.body;
  const newObject = new ObjectModel({ name, quantity, price });
  await newObject.save();
  res.json(newObject);
});

// Update object
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updated = await ObjectModel.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
});

// Delete object
router.delete("/:id", async (req, res) => {
  await ObjectModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
