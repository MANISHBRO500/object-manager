const express = require("express");
const router = express.Router();
const ObjectItem = require("../models/ObjectItem");

// ✅ Get all objects
router.get("/", async (req, res) => {
  try {
    const items = await ObjectItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch objects" });
  }
});

// ✅ Add new object
router.post("/", async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    if (!name || !price || !quantity) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newItem = new ObjectItem({ name, price, quantity });
    await newItem.save();
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add object" });
  }
});

// ✅ Update object by ID
router.put("/:id", async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const updatedItem = await ObjectItem.findByIdAndUpdate(
      req.params.id,
      { name, price, quantity },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Object not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to update object" });
  }
});

// ✅ Delete object by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await ObjectItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ error: "Object not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete object" });
  }
});

module.exports = router;
