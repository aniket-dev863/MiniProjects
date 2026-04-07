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
const updateBoard = async (req, res) => {
  const { title } = req.body;
  try {
    const userId = req.user.id;
    const boardId = req.params.id;
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({
        msg: "Requested Board Does not exist",
      });
    }
    if (board.owner.toString() !== userId) {
      return res.status(403).json({
        msg: `You are not Authorized to Acess this Board .`,
      });
    }
    if (title) board.title = title;
    const updatedBoard = await board.save();
    res.status(200).json({
      msg: `Board Updated Successfuly`,
      updatedBoard,
    });
  } catch (err) {
    res.status(500).json({
      msg: `Server Error Occured`,
      Error: err.message,
    });
  }
};
const addMember = async (req, res) => {
  const { UserId } = req.body;
  const boardId = req.params.id;
  try {
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({
        msg: "Requested Board Does not Exist ",
      });
    }
    if (board.owner.toString() !== req.user.id) {
      return res.status(403).json({
        msg: `You are not Authorised to view this baord `,
      });
    }
    const alreadyMember = board.members.some(
      (member) => member.toString() === UserId,
    );
    if (alreadyMember) {
      return res.status(200).json({
        msg: `User id:${UserId} is already member of the Board .`,
      });
    }
    board.members.push(UserId);
    await board.save();
    res.status(200).json({
      msg: "Member added to Board member Successfully .",
      members: board.members,
    });
  } catch (error) {
    res.status(500).json({
      Msg: "Some Error Occured",
      ERROR: error.message,
    });
  }
};
const removeMember = async (req, res) => {
  const boardId = req.params.id;
  const userToremove = req.params.userId;
  try {
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({
        msg: "Requested Board Does not Exist",
      });
    }
    if (board.owner.toString() !== req.user.id) {
      return res.status(403).json({
        msg: "Only Board Owner Can Remove members",
      });
    }
    if (board.owner.toString() === userToremove) {
      return res.status(400).json({
        msg: "Owner of the Board cannot be removed ",
      });
    }
    board.members = board.members.filter(
      (member) => member.toString() !== userToremove,
    );
    await board.save();
    res.status(200).json({
      msg: "Board Member removed successfully",
      Members: board.members,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Sever Error",
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
