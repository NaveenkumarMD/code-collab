const express = require("express")
const runcode = require("../Functions/Runcode")
const router = express.Router()

router.post("/runcode", (req, res) => {
    const {
        code,
        language,
        input
    } = req.body
    if (!code || !language) {
        return res.json({
            err:"Provide the language and code"
        })
    }
    console.log("runcode function is called..")
    runcode(code, language, input).then(result => {
        res.json(result)
    }).catch(function (err) {
        res.json({
            "err": err
        })
    })

})

module.exports = router