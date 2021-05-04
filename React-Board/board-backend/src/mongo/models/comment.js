const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({
    body: String,
    user: {
        _id: mongoose.Types.ObjectId,
        username: String,
    },
    postId: mongoose.Types.ObjectId,
    publishedDate: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("Comment", CommentSchema);
