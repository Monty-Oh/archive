const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

/*
* 로그인에 필요한 모듈, index.js와 passport/각 로그인 전략.
* js 에서 local, kakao에 따라 추가 모듈을 불러온다.
*/
const passport = require('passport');

/*
* helmet은 http 헤더 설정을 변경하여 몇가지 알려준 웹 취약성으로 부터 앱을 보호한다.
* hpp는 http parameter pollution attack으로부터 보호한다.
*/
const helmet = require('helmet');
const hpp = require('hpp');

const fs = require('fs');

// express와 redis 연결
// const RedisStore = require('connect-redis')(session);

require('dotenv').config();

const urls = require('./urls');
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const { sequelize } = require('./models');
const passportConfig = require('./passport');
const logger = require('./logger');

const app = express();
sequelize.sync();
passportConfig(passport);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8000);

//배포일때는 combined 모드로 실행
if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(helmet());
    app.use(hpp());
} else {
    app.use(morgan('dev'));
}

fs.readdir('logs', async (error) => {
    if (error) {
        logger.error('logs 폴더 생성');
        await fs.mkdirSync('logs');
    }
});

fs.readdir('uploads', async (error) => {
    if (error) {
        logger.info('uploads 폴더 생성');
        logger.error('uploads 폴더가 없습니다. uploads 폴더를 생성합니다.');
        await fs.mkdirSync('uploads');
    }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(urls.img, express.static(path.join(__dirname, 'uploads')));
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
app.use(passport.initialize());
app.use(passport.session());

app.use(urls.home, pageRouter);
app.use(urls.auth, authRouter);
app.use(urls.post, postRouter);
app.use(urls.user, userRouter);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development 개발중일 때만 에러 로그 출력
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
});