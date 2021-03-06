const ThreadModel = require("../models/Thread")
const CommentModel = require("../models/Comment")

// Create and Save a new Tutorial
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.text) {
        res.status(400).send({ message: "Post can not be empty!" });
        return;
    }

    // Create a Tutorial
    const newThread = new ThreadModel ({
        avatar: req.body.avatar,
        name: req.body.name,
        text: req.body.text,
    });

    console.log(newThread)

    try {
        // Save Tutorial in the database
        thread = await newThread.save(newThread);
        res.send(thread);
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while creating the Tutorial."
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
    const threadId = req.body.id
    const newComment = new CommentModel({
        avatar: req.body.avatar,
        name: req.body.name,
        text: req.body.text,
    })

    try {
        // Save Comment in the database
        comment = await newComment.save(newComment);

        // add Comment id to thread
        thred = await ThreadModel.findByIdAndUpdate(
            threadId,
            { $push: { comments: comment._id } },
            { new: true, useFindAndModify: false }
        );

        res.send(comment);
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while creating the Tutorial."
        });
    }
};

exports.findAll = async (req, res) => {
    const text = req.query.text;
    var condition = text ? { text: { $regex: new RegExp(text), $options: "i" } } : {};
  
    try {
        threads = await ThreadModel.find(condition).populate("comments")
        res.send(threads);
    } catch(error) {
        res.status(500).send({
          message:
            error.message || "Some error occurred while retrieving tutorials."
        });
    }
  };