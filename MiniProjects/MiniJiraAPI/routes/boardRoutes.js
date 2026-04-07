const express = require("express");
const protect = require("../middlewares/tokenMiddleware");
const {
  createBoard,
  getBoard,
  getBoardById,
  updateBoard,
  deleteBoard,
  addMember,
  removeMember,
} = require("../controllers/boardControllers");
const router = express.Router();
router.use(protect);

router.get("/", getBoard);
router.get("/:id", getBoardById);
router.post("/", createBoard);
router.patch("/:id", updateBoard);
router.delete("/:id", deleteBoard);

router.post("/:id/members", addMember);
router.delete("/:id/members/:userId", removeMember);

module.exports = router;
