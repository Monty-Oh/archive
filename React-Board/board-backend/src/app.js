require("dotenv").config();
const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const serve = require("koa-static");
const path = require("path");
const send = require("koa-send");
const cors = require("koa-cors");

const { api } = require("./routes");
const mongo = require("./mongo");
const jwtMiddleware = require("./lib/jwtMiddleware");

const { MONGO_URI, PORT } = process.env;
const port = PORT || 4000;

mongo(MONGO_URI);

const app = new Koa();
const router = new Router();

router.use("/api", api.routes());

app.use(cors());
app.use(bodyParser());
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());

const uploadsDirectory = path.resolve(__dirname, "../uploads");
app.use(serve(uploadsDirectory));
const buildDirectory = path.resolve(__dirname, "../../board-frontend/build");
app.use(serve(buildDirectory));

// 404 handler
app.use(async (ctx) => {
    if (ctx.status === 404) {
        //get uploads folder
        if (ctx.path.indexOf("/uploads") === 0) {
            const filename = path.parse(ctx.path).base;
            await send(ctx, filename, {
                root: uploadsDirectory,
            });
        }
        // homepage
        else if (ctx.path.indexOf("/api") !== 0) {
            await send(ctx, "index.html", { root: buildDirectory });
        }
    }
});

// app.use(async (ctx) => {
//     if (ctx.status === 404 && ctx.path.indexOf("/api") !== 0) {
//         console.log(ctx.path);
//         await send(ctx, "index.html", { root: buildDirectory });
//     }
// });

module.exports = { app, port };
