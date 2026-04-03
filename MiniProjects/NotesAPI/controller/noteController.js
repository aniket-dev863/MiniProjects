const Note = require("../models/note");

const createNewNote = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(401).json({
      msg: "Pls try Again",
    });
  }
  const userID = req.user.id;
  try {
    const note = await Note.create({
      title,
      content,
      user: userID,
    });
    res.status(200).json({
      msg: "Note created Successfully",
      Note: {
        title: note.title,
        content: note.content,
        user: note.user,
      },
    });
  } catch (error) {
    res.status(401).json({
      msg: "Some Error Occured here",
      Error: error.message,
    });
  }
};

const getNote = async (req, res) => {
  const userID = req.user.id;
  try {
    const allNotes = await Note.find({ user: userID });
    res.status(200).json({
      msg: `Fetched all notes for :${userID}`,
      Notes: {
        allNotes,
      },
    });
  } catch (error) {
    res.status(401).json({
      msg: "Some Error Occured",
      Error: error.message,
    });
  }
};

const updateNote = async (req, res) => {
  const noteID = req.params.id;
  const { title, content } = req.body;
  try {
    const note = await Note.findById(noteID);
    if (!note) {
      return res.status(404).json({
        msg: "Note Not Found",
      });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({
        msg: "You are not the creater of the note ",
      });
    }
    if (title) note.title = title;
    if (content) note.content = content;
    const updatedNote = await note.save();
    res.status(200).json({
      msg: "Note Updated Successfully",
      note: updatedNote,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      error: error.message,
    });
  }
};

const deleteNote = async (req, res) => {
  const noteID = req.params.id;
  try {
    const note = await Note.findById(noteID);
    if (!note) {
      return res.status(404).json({
        msg: "Note not found",
      });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({
        msg: "You are not the creater of the note ",
      });
    }
    const deletedNote = await Note.deleteOne({ _id: noteID });
    res.status(200).json({
      msg: "Note Deleted Succefully",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      error: error.message,
    });
  }
};

module.exports = { createNewNote, updateNote, getNote, deleteNote };
