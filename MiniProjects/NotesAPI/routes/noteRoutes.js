const express = require("express");
const protect = require("../middleware/tokenMiddleware");
console.log("Note routes loaded");
const {
  createNewNote,
  updateNote,
  getNote,
  deleteNote,
} = require("../controller/noteController");

const router = express.Router();
router.get("/", (req, res) => {
  console.log("Notes route hit");
  res.send("Notes route working");
});
router.get("/notes", protect, getNote);
router.post("/notes", protect, createNewNote);
router.delete("/notes/:id", protect, deleteNote);
router.patch("/notes/:id", protect, updateNote);

module.exports = router;
