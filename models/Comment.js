import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = new Schema(
    {
        thread_id: { 
            type: 'ObjectId', 
            ref: 'Thread',
            required: true
        }, 
        comment: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;