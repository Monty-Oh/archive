const mongoose = require("mongoose");
const Post = require("../mongo/models/post");
const fs = require("fs");
const multer = require("@koa/multer");
const { ObjectId } = mongoose.Types;
const DIRECTORY_UPLOAD_IMAGES = "uploads";

exports.getPostById = async (ctx, next) => {
    const { id } = ctx.params;
    if (!ObjectId.isValid(id)) {
        ctx.status = 400;
        return;
    }
    try {
        const post = await Post.findById(id);
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

exports.checkOwnPost = (ctx, next) => {
    const { user, post } = ctx.state;
    if (post.user._id.toString() !== user._id) {
        ctx.status = 403;
        return;
    }
    return next();
};

exports.checkFolder = (ctx, next) => {
    if (!fs.existsSync(DIRECTORY_UPLOAD_IMAGES))
        fs.mkdirSync(DIRECTORY_UPLOAD_IMAGES);
    return next();
};

exports.upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, "uploads/");
        },
        filename(req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});
