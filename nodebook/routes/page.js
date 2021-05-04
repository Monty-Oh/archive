const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');
const urls = require('../urls');

const router = express.Router();

// 로그인 시 호출되는 프로필 라우터, user 정보 담아서 보냄
router.get(urls.getprofile, isLoggedIn, (req, res) => {
    res.render('profile', {
        title: '내 정보 - NodeBook',
        user: req.user,
        urls,
    });
});

// 프로필에서 프로필 수정 시 들어가는 정보 수정 페이지
router.get(urls.update, isLoggedIn, async (req, res) => {
    try {
        const exUser = await User.findOne({
            where: { id: req.user.id }
        });
        if (exUser.provider === 'kakao') {
            res.render('update', {
                title: '프로필수정 - NodeBook',
                user: req.user,
                modifyError: req.flash('updateError'),
                provider: 'kakao',
                urls,
            });
        } else {
            res.render('update', {
                title: '프로필수정 - NodeBook',
                user: req.user,
                modifyError: req.flash('updateError'),
                provider: 'local',
                urls,
            });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 회원 가입
router.get(urls.getjoin, isNotLoggedIn, (req, res) => {
    res.render('join', {
        title: '회원가입 - NodeBook',
        user: req.user,
        joinError: req.flash('joinError'),
        urls,
    });
});

// DB에 있는 모든 포스트들 가져옴, 로그인 유무는 상관 없음
router.get(urls.main, async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: ['id', 'nick'],
            },
            order: [['createdAt', 'DESC']],
        });
        res.render('main', {
            title: 'NodeBook',
            twits: posts,
            user: req.user,
            loginError: req.flash('loginError'),
            URL: process.env.PORTFOLIOURL,
            urls,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;