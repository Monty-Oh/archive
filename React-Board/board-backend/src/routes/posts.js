const Router = require("koa-router");
const postsCtrl = require("./posts.ctrl");
const postsMiddleWare = require("./posts.middleware");
const checkLoggedIn = require("../lib/checkLoggedIn");

const posts = new Router();

// posts/~~
posts.get("/", postsCtrl.list);
posts.post("/", checkLoggedIn, postsCtrl.write);
posts.get("/:id", postsMiddleWare.getPostById, postsCtrl.read);
posts.delete(
    "/:id",
    checkLoggedIn,
    postsMiddleWare.getPostById,
    postsMiddleWare.checkOwnPost,
    postsCtrl.remove
);
posts.patch(
    "/:id",
    checkLoggedIn,
    postsMiddleWare.getPostById,
    postsMiddleWare.checkOwnPost,
    postsCtrl.update
);

// upload image
posts.post(
    "/file/image",
    postsMiddleWare.checkFolder,
    postsMiddleWare.upload.single("image"),
    postsCtrl.upload
);

// posts.delete(
//     '/uploads',
//     checkLoggedIn,
//     postsCtrl.cancelUpload,
// )

module.exports = posts;
