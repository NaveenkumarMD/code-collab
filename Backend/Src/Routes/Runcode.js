const express = require("express")
const runcode = require("../Functions/Runcode")
const router = express.Router()
const fetch = require('node-fetch');

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

    let resData={
        code,
        language,
        name:"MyFirstCode",
        user:"naveen"
    }
    fetch("http://127.0.0.1:8000/check",{
        method:"POST",
        body:JSON.stringify(resData)
    }).then(resp=>{
        res.sendFile(resp)
    }).catch(err=>{
        console.log(err)
    })

    runcode(code, language, input).then(result => {
        res.json(result)
    }).catch(function (err) {
        res.json({
            "err": err
        })
    })

    res.end()

})

router.post("/runAllTestCases",(req,response)=>{
    const {
        code,
        language,
        sample_input,
        sample_output
    } = req.body
    if (!code || !language || !sample_input || ! sample_output) {
        return response.json({
            err:"Provide the language and code"
        })
    }
    var results=[]
    var input_len=sample_input.length
    sample_input.forEach(async(element,i) => {
        try{
            var res=await runcode(code,language,sample_input[i])
            res=res.output
            if(res==sample_output[i]){
                results.push(true)
            }
            else{
                results.push(false)
            }
        }
        catch(err){
            results.push(false)
        }
        if(i==input_len-1){
            console.log("results" ,"is sent",results)
            return response.json({
                res:results
            })
        }
    });
    console.log("runcode function is called..")

})

module.exports = router