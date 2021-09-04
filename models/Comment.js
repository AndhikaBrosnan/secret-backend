const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema(
    {
        avatar: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        likes: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

commentSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;