const mongoose = require("mongoose");
const Post = require("../mongo/models/post");
const User = require("../mongo/models/user");

const { ObjectId } = mongoose.Types;

// comments.write에 쓰임, 해당 postId를 불러와서 외부 키로 사용하기 위해 ctx.state.post에 등록
exports.getPostByQuery = async (ctx, next) => {
    const { postId } = ctx.query;
    if (!ObjectId.isValid(postId)) {
        ctx.status = 400;
        return;
    }

    try {
        const post = await Post.findById(postId);
        if (!post) {
            ctx.status = 404;
            return;
        }
        ctx.state.post = post;
        return next();
    } catch (e) {
        ctx.throw(500, e);
    }
};
// 중복코드! middleware.js로 묶어야함
