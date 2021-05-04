const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path')
const session = require('express-session');
const flash = require('connect-flash');
const logger = require('./logger');
const helmet = require('helmet');
const hpp = require('hpp');
const fs = require('fs');
require('dotenv').config();

const urls = require('./urls');
const pageRouter = require('./routes/page');
const mailRouter = require('./routes/mail');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);

if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(helmet());
    app.use(hpp());
} else {
    app.use(morgan('dev'));
}

fs.readdir('logs', async (error) => {
    if (error) {
        console.error('log 폴더 생성');
        await fs.mkdirSync('logs');
    }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(flash());

app.use(urls.mail, mailRouter);
app.use(urls.home, pageRouter);

/*
* 위의 미들웨어들에서 아무런 응답도 찾지 못했다면
* 해당 미들웨어에서 404 에러를 만들어서 보낸다.
*/
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 개발 환경일 때만 페이지에 에러 로그 출력
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    logger.error(err.status);
    logger.error(err.message);
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    logger.info(`${app.get('port')}번 포트에서 서버 시작`);
    logger.info('404 error will fallback error.pug (/)');
});