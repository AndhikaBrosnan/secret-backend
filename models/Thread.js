import mongoose from 'mongoose';
const { Schema } = mongoose;

const threadSchema = new Schema(
    {
        user_id: { 
            type: 'ObjectId', 
            ref: 'User',
            required: true
        }, 
        post: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;