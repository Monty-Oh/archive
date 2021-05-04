const Router = require("koa-router");
const commentsCtrl = require("./comments.ctrl");
const commentsMiddleware = require("./comments.middleware");
const checkLoggedIn = require("../lib/checkLoggedIn");

const comments = new Router();
// write comments
comments.post(
    "/",
    checkLoggedIn,
    commentsMiddleware.getPostByQuery,
    commentsCtrl.write
);

// read comments, checkLoggedIn not required
comments.get("/", commentsMiddleware.getPostByQuery, commentsCtrl.read);

// delete comment
comments.delete("/:commentId", checkLoggedIn, commentsCtrl.remove);

comments.put("/:commentId", checkLoggedIn, commentsCtrl.update);

module.exports = comments;
