const express=require("express")
const router=express.Router()

router.get("/",(req,res)=>{
    console.log("Hello")
    res.send("gello")
})

module.exports=router