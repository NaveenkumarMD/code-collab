const compiler=require("compilex")
var compileroptions={
    stats:true
}
compiler.init(compileroptions)

function runcode(language,code,input){
    return new Promise(function(resolve,reject){
        switch (language) {
            case "python":
                var envData={OS:"windows"}
                console.log(code)
                compiler.compilePythonWithInput(envData,code,input,function(data){
                    console.log(data)
                })
                resolve("ran")
                break;
        
            default:
                break;
        }
    })
}

module.exports=runcode