const express = require("express");
const router = express.Router();
const SerpApi = require('google-search-results-nodejs')

router.post("/blogsearch", (req, res) => {
    let {searchTerm}=req.body
    const search = new SerpApi.GoogleSearch("54483bdae41dbf663b7f7eec8f84fdbf9ded0161fdf9838bd49137812618d695")
    search.json({
     q:"allintitle:"+ searchTerm, 
    }, (result) => {
      res.json(result)
    })

});



module.exports = router;
