const express = require("express")
const runcode = require("../Functions/Runcode")
const router = express.Router()

router.post("/runcode", (req, res) => {
    const {
        code,
        language,
        input
    } = req.body
    if (!code || !language || !input){
        return res.json({
            err:"Provide all the fields"
        })
    }
    console.log(code)
    runcode(code,language,input).then((msg)=>{
        console.log(msg)
    })



})

module.exports = router