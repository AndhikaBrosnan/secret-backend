const mongoose = require('mongoose')
const Schema = mongoose.Schema

const threadSchema = new Schema(
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
        comments: [
            { 
                type: 'ObjectId', 
                ref: 'Comment',
            }
        ], 
    },
    { timestamps: true }
);

threadSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;