const Post = require("../mongo/models/post");
const Comment = require("../mongo/models/comment");
const Joi = require("joi");
const sanitizeHtml = require("sanitize-html");
const fs = require("fs");
const send = require("koa-send");

const sanitizeOption = {
    allowedTags: [
        "h1",
        "j2",
        "b",
        "i",
        "u",
        "s",
        "p",
        "ul",
        "ol",
        "li",
        "blockquote",
        "a",
        "img",
    ],
    allowedAttributes: {
        a: ["href", "name", "target"],
        img: ["src", "alt", "height", "width", "loading", "crossorigin"],
        li: ["class"],
    },
    // allowedSchemas: ["http"],
    allowedSchemesByTag: {
        img: ["data", "http"],
    },
};

// 글쓰기
exports.write = async (ctx) => {
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        body: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required(),
    });

    const result = Joi.validate(ctx.request.body, schema);
    if (result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const { title, body, tags } = ctx.request.body;

    const post = new Post({
        title,
        body: sanitizeHtml(body, sanitizeOption),
        tags,
        user: ctx.state.user,
    });
    try {
        await post.save();
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
};

// HTML 제거와 문자열 길이를 200자로 제한
const removeHtmlAndShorten = (body) => {
    const filtered = sanitizeHtml(body, {
        allowedTags: [],
    });
    return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

// 조회
exports.list = async (ctx) => {
    const page = parseInt(ctx.query.page || "1", 10);

    if (page < 1) {
        ctx.status = 400;
        return;
    }

    const { tag, username } = ctx.query;
    const query = {
        ...(username ? { "user.username": username } : {}),
        ...(tag ? { tags: tag } : {}),
    };

    try {
        const posts = await Post.find(query)
            .sort({ _id: -1 })
            .limit(10)
            .skip((page - 1) * 10)
            .lean()
            .exec();
        const postCount = await Post.countDocuments(query).exec();
        ctx.set("Last-Page", Math.ceil(postCount / 10));
        ctx.body = posts.map((post) => ({
            ...post,
            body: removeHtmlAndShorten(post.body),
        }));
    } catch (e) {
        ctx.throw(500, e);
    }
};

exports.read = async (ctx) => {
    ctx.body = ctx.state.post;
};

// import remove comments
exports.remove = async (ctx) => {
    const { id } = ctx.params;
    try {
        await Post.findByIdAndRemove(id).exec();
        await Comment.deleteMany({ postId: id });
        ctx.status = 204;
    } catch (e) {
        ctx.throw(500, e);
    }
};

exports.update = async (ctx) => {
    const schema = Joi.object().keys({
        title: Joi.string(),
        body: Joi.string(),
        tags: Joi.array().items(Joi.string()),
    });

    const result = Joi.validate(ctx.request.body, schema);
    if (result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const { id } = ctx.params;

    const nextData = { ...ctx.request.body };
    // body값이 있으면 필터링
    if (nextData.body) {
        nextData.body = sanitizeHtml(nextData.body, sanitizeOption);
    }

    try {
        const post = await Post.findByIdAndUpdate(id, nextData, {
            new: true,
        }).exec();
        if (!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
};

exports.upload = async (ctx) => {
    ctx.body = ctx.file.path;
    return;
};

//remove all images
exports.cancelUpload = async (ctx) => {};
