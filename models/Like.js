const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema(
  {
    threadId: {
      type: String,
      required: true,
    },
    likedId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

likeSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
