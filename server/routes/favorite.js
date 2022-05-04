const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => {

    // MongoDB에서 정보를 가져오기.
    Favorite.find({
        "movieId": req.body.movieId
    })
        .exec((err, info) => {
            if (err) return res.status(400).send(err);
            // 가져온 숫자 정보를 프론트(React)에 보내주기.
            res.status(200).json({ success: true, favoriteNumber: info.length });
        });
});

router.post('/favorited', (req, res) => {

    // 사용자가 제시된 영화를 Favorite 리스트에 넣었는지 DB에서 확인하기.

    // MongoDB에서 정보를 가져오기.
    Favorite.find({
        "movieId": req.body.movieId,
        "userFrom": req.body.userFrom
    })
        .exec((err, info) => {
            if (err) return res.status(400).send(err);
            // 가져온 정보를 판단하여 참/거짓으로 프론트(React)에 보내주기.
            let result = false;
            if (info.length !== 0) {
                result = true;
            }
            res.status(200).json({ success: true, favorited: result });
        });
});

router.post('/addToFavorite', (req, res) => {
    const favorite = new Favorite(req.body);
    favorite.save((err, doc) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true });
    })
});

router.post('/removeFromFavorite', (req, res) => {
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, doc });
        });
});

router.post('/getFavoritedMovie', (req, res) => {
    Favorite.find({ 'userFrom': req.body.userFrom })
        .exec((err, favorites) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, favorites });
        });
});

module.exports = router;