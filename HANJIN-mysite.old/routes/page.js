const express = require('express');
const fs = require('fs');
const path = require('path');
const urls = require('../urls');

const router = express.Router();

router.get(urls.home, (req, res) => {
    res.render('intro', {
        title: 'Welcome!!',
        urls,
    });
});

router.get(urls.main, (req, res) => {
    res.render('main', {
        title: 'ASSN2-mysite',
        urls,
    });
});

module.exports = router;