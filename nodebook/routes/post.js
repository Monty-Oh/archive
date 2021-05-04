const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const urls = require('../urls');
const { Post, Hashtag, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

// 이미지 업로드할 multer 모듈 설정과 라우터
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});
router.post(urls.img, isLoggedIn, upload.single('img'), (req, res) => {
    console.log(req.file);
    res.json({ url: `${urls.img}/${req.file.filename}` });
});

// 게시글 업로드 처리하는 모듈과 라우터
const upload2 = multer();
router.post(urls.postpost, isLoggedIn, upload2.none(), async (req, res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            userId: req.user.id,
        });
        const hashtags = req.body.content.match(/#[^\s#]*/g);
        if (hashtags) {
            const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
                where: { title: tag.slice(1).toLowerCase() },
            })));
            await post.addHashtags(result.map(r => r[0]));
        }
        res.redirect(urls.main);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

/*
* 해시태그로 조회하는 /post/hash 라우터
* 해당 해시태그가 존재하면 모든 게시글을 가져옴
*/
router.get(urls.hashtag, async (req, res, next) => {
    const query = req.query.hashtag;
    console.log(query);
    if (!query) {
        return res.redirect(urls.main);
    }
    try {
        const hashtag = await Hashtag.findOne({ where: { title: query } });
        let posts = [];
        if (hashtag) {
            posts = await hashtag.getPosts({ include: [{ model: User }] });
        }
        return res.render('main', {
            title: `${query} | NodeBook`,
            user: req.user,
            twits: posts,
            urls,
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

/*
* 게시글 좋아요or좋아요 취소 라우터
* 해당 id의 게시글의 do를 보고 좋아요를 추가할지 삭제할지 나눈다.
*/
router.post(urls.postlike(), async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const post = await Post.findOne({ where: { id: req.params.id } });
        // console.log(user, post);
        if (req.params.do === 'like') {
            await user.addPostLike(post);
        } else {
            await user.removePostLike(post);
        }
        res.send('success');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 해당 id의 포스트를 삭제한다.
router.delete(urls.deletepost(), async (req, res, next) => {
    try {
        await Post.destroy({ where: { id: req.params.id } });
        res.send('success');
    } catch (error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;