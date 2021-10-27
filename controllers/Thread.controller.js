const ThreadModel = require("../models/Thread");
const CommentModel = require("../models/Comment");
const LikeModel = require("../models/Like");

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.text) {
    res.status(400).send({ message: "Post can not be empty!" });
    return;
  }

  // Create a Tutorial
  const newThread = new ThreadModel({
    avatar: req.body.avatar,
    name: req.body.name,
    text: req.body.text,
  });

  console.log(newThread);

  try {
    // Save Tutorial in the database
    thread = await newThread.save(newThread);
    res.send(thread);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Tutorial.",
    });
  }
};

exports.createLike = async (req, res) => {
  const threadId = req.body.threadId;
  const likedId = req.body.likedId;

  const newLike = new LikeModel({
    threadId: threadId,
    likedId: likedId,
  });

  try {
    like = await newLike.save(newLike);

    res.send(like);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Tutorial.",
    });
  }
};

exports.createComment = async (req, res) => {
  // Validate request
  if (!req.body.text) {
    res.status(400).send({ message: "Post can not be empty!" });
    return;
  }

  // Create a Comment
  const threadId = req.body.id;
  const newComment = new CommentModel({
    avatar: req.body.avatar,
    name: req.body.name,
    text: req.body.text,
  });

  try {
    // Save Comment in the database
    comment = await newComment.save(newComment);

    // add Comment id to thread
    thred = await ThreadModel.find(
      threadId,
      { $push: { comments: comment._id } },
      { new: true, useFindAndModify: false }
    );

    res.send(comment);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Tutorial.",
    });
  }
};

exports.findAll = async (req, res) => {
  const text = req.query.text;
  var condition = text
    ? { text: { $regex: new RegExp(text), $options: "i" } }
    : {};

  try {
    threads = await ThreadModel.find(condition)
      .sort({ createdAt: -1 })
      .populate("comments");
    res.send(threads);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

exports.fetchLike = async (req, res) => {
  const threadId = req.query.threadId;
  var condition = threadId
    ? { threadId: { $regex: new RegExp(threadId), $options: "i" } }
    : {};

  try {
    likes = await LikeModel.find(condition).sort({ createdAt: -1 });
    res.send(likes);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving tutorials.",
    });
  }
};
