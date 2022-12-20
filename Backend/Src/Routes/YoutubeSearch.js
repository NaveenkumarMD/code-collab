const express = require("express");
const router = express.Router();
const youtubesearchapi = require("youtube-search-api");

router.post("/search", (req, res) => {
  youtubesearchapi
    .GetListByKeyword(req.body.searchTerm, false, 5)
    .then((result) => res.json(result))
    .then((err) => console.log(err));
});

router.post("/video", (req, res) => {
  youtubesearchapi
    .GetVideoDetails(req.body.videoId)
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

module.exports = router;
