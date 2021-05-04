const express = require('express');
const nodemailer = require('nodemailer');
const logger = require('../logger');
const urls = require('../urls');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('mail', {
        text: '제 이메일로 자동으로 전송됩니다. ',
        mailMessage: req.flash('mailMessage'),
        urls,
    });
});

router.post('/', async (req, res, next) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_ID,
                pass: process.env.GMAIL_PASSWORD,
            }
        });

        const mailOptions = {
            from: req.body.email,
            to: process.env.GMAIL_ID,
            subject: `${req.body.email} 로 부터 도착한 메세지(ASSN2-mysite)`,
            text: req.body.quest
        };

        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                logger.error(error.message);
                req.flash('mailMessage', '전송에 실패했습니다.');
            } else {
                logger.info('Email sent: ' + info.response);
                req.flash('mailMessage', '전송에 성공했습니다.');
            }
            return res.redirect('/mail');
        });
    } catch (error) {
        logger.error(error.message);
        next(error);
    }
});

module.exports = router;