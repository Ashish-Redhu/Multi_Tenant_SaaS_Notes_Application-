const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const checkNoteLimit = require("../middlewares/checkNoteLimit");
const noteController = require("../controllers/noteController");

// Protect all note routes with verifyToken
router.post("/", verifyToken, checkNoteLimit, noteController.createNote);
router.get("/", verifyToken, noteController.getAllNotes);
router.get("/:id", verifyToken, noteController.getNoteById);
router.put("/:id", verifyToken, noteController.updateNote);
router.delete("/:id", verifyToken, noteController.deleteNote);

module.exports = router;