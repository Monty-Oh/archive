const express = require('express');

const urls = require('../urls');
const { isLoggedIn } = require('./middlewares');
const { User, Follow } = require('../models');

const router = express.Router();

// 해당 id에 대한 팔로우 라우터
router.post(urls.postfollow(), isLoggedIn, async (req, res, next) => {
    try {

        // 팔로우 하는 사용자를 DB에서 조회
        const user = await User.findOne({ where: { id: req.user.id } });

        // 현재 로그인 한 사용자와의 관계를 지정함, req.params.id를 10진수의 실수로 바꿔 넣는다.
        await user.addFollowing(parseInt(req.params.id, 10));
        res.send('success');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete(urls.deletefollow(), isLoggedIn, async (req, res, next) => {
    try {

        // params 객체의 id와 연결된 팔로우를 해제한다.
        const user = await User.findOne({ where: { id: req.user.id } });
        await user.removeFollowing(parseInt(req.params.id, 10));
        res.send('success');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;