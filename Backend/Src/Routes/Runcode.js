const express = require("express")
const runcode = require("../Functions/Runcode")
const router = express.Router()

router.post("/runcode", (req, res) => {
    const {
        code,
        language,
        input,
        sample_input,
        sample_output
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

router.post("/runAllTestCases",(req,res)=>{
    const {
        code,
        language,
        sample_input,
        sample_output
    } = req.body
    if (!code || !language) {
        return res.json({
            err:"Provide the language and code"
        })
    }
    var results=[]
    Promise.all(
        sample_input.forEach((input,i)=>{
            return new Promise(async (resolve)=>{
                try {
                    let res=await runcode(code,language,input)
                    res=res.output
                    results.push(sample_output[i]==res)
                    resolve()
                } catch (error) {
                    results.push(false)
                }
            })
        })
    ).then(()=>{
        console.log(results)
    })
    
    console.log(results)

    console.log("runcode function is called..")

})

module.exports = router