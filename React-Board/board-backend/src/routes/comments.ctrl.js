const Joi = require("joi");
const Comment = require("../mongo/models/comment");

exports.write = async (ctx) => {
    const schema = Joi.object().keys({
        body: Joi.string().required(),
    });
    const result = Joi.validate(ctx.request.body, schema);
    if (result.error) {
        console.error(result.error);
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const { body } = ctx.request.body;
    const comment = new Comment({
        body,
        user: ctx.state.user,
        postId: ctx.state.post._id,
    });

    try {
        await comment.save();
        ctx.status = 204;
    } catch (e) {
        ctx.throw(500, e);
    }
};

exports.read = async (ctx) => {
    const postId = ctx.state.post._id;

    try {
        const result = await Comment.find({ postId: postId }).sort(
            "publishedDate"
        );
        ctx.body = result;
    } catch (e) {
        ctx.throw(500, e);
    }
};

exports.remove = async (ctx) => {
    const { commentId } = ctx.params;
    try {
        const postId = (await Comment.findOne({ _id: commentId })).postId;
        await Comment.findByIdAndDelete(commentId);
        const result = await Comment.find({ postId: postId });
        ctx.body = result;
    } catch (e) {
        ctx.throw(500, e);
    }
};

// 업데이트 작성중.. request body 안에 내용을 포함해야함. joi 이용
exports.update = async (ctx) => {
    const schema = Joi.object().keys({
        body: Joi.string().required(),
    });

    const result = Joi.validate(ctx.request.body, schema);
    if (result.error) {
        ctx.statue = 400;
        ctx.body = result.error;
        return;
    }
    const { commentId } = ctx.params;
    const nextData = { ...ctx.request.body };

    try {
        const postId = (await Comment.findOne({ _id: commentId })).postId;
        await Comment.findByIdAndUpdate(commentId, nextData, {
            new: true,
        }).exec();
        const result = await Comment.find({ postId: postId });
        ctx.body = result;
    } catch (e) {
        ctx.throw(500, e);
    }
};
