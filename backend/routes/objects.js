const express = require("express");
const router = express.Router();
const ObjectItem = require("../models/ObjectItem");

// Get all objects
router.get("/", async (req, res) => {
  const items = await ObjectItem.find();
  res.json(items);
});

// Add new object
router.post("/", async (req, res) => {
  const { name, price, quantity } = req.body;
  const newItem = new ObjectItem({ name, price, quantity });
  await newItem.save();
  res.json(newItem);
});

// Update object
router.put("/:id", async (req, res) => {
  const { name, price, quantity } = req.body;
  const updatedItem = await ObjectItem.findByIdAndUpdate(
    req.params.id,
    { name, price, quantity },
    { new: true }
  );
  res.json(updatedItem);
});

// Delete object
router.delete("/:id", async (req, res) => {
  await ObjectItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

module.exports = router;
