const Router = require("koa-router");
const posts = require("./posts");
const auth = require("./auth");
const comments = require("./comments");

const api = new Router();
api.use("/posts", posts.routes());
api.use("/auth", auth.routes());
api.use("/comments", comments.routes());

module.exports = { api };
