const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/test', async (req, res, next) => {
    try {
        if (!req.session.jwt) { // 세션에 토큰이 없을 시

            // 새로운 토큰을 신청한다. 클라이언트 비밀키를 포함해서 보냄.
            const tokenResult = await axios.post('http://localhost:8001/v1/token', {
                clientSecret: process.env.CLIENT_SECRET,
            });

            // 토큰 발급 성공 시 세션에 저장하고, 실패 시 사유를 응답한다.
            if (tokenResult && tokenResult.data.code === 200) {
                req.session.jwt = tokenResult.data.token;
            } else {
                return res.json(tokenResult.data);
            }
        }

        // 토큰 테스트
        const result = await axios.get('http://localhost:8001/v1/test', {
            headers: { authorization: req.session.jwt },
        });

        return res.json(result.data);
    } catch (error) {
        console.error(error);
        if (error.response.status === 419) {
            return res.json(error.response.data);
        }
        return next(error);
    }
});

module.exports = router;