const mongoose = require("mongoose");
const Board = require("../models/board");
const createBoard = async (req, res) => {
  const title = req.body;
  if (!title) {
    res.status(400).json(`Board title is required .`);
  }
  try {
    const userId = req.user.id;
    const board = await Board.create({
      title,
      owner: userId,
      members: [userId],
    });
    res.status(200).json({
      msg: "Board Created Successfully",
      board,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Some Error Occured ",
      Error: error.message,
    });
  }
};
const getBoard = async (req, res) => {
  try {
    const userId = req.user.id;
    const allBoard = await Board.find({ members: userId });
    /**
     * .populate("owner","name email");
     */
    res.status(200).json({
      msg: "fetched all Baord ",
      length: allBoard.length,
      allBoard,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Server Error`,
      Error: error.message,
    });
  }
};
const getBoardById = async (req, res) => {
  try {
    const userId = req.user.id;
    const boardId = req.params.id;
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({
        msg: `Board Not Found `,
      });
    }
    const isMember = board.members.some(
      (member) => member.toString() === userId,
    );
    if (!isMember) {
      return res.status(403).json({
        msg: `You are not authorized to acess this Board .`,
      });
    }
    res.status(200).json({
      msg: `Board fetched .`,
      board,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Server Error`,
      Error: error.message,
    });
  }
};
module.exports = {
  createBoard,
  getBoard,
  getBoardById,
  updateBoard,
  deleteBoard,
  addMember,
  removeMember,
};
