const compiler = require("compilex")
var compileroptions = {
    stats: true
}
compiler.init(compileroptions)

function runcode(code, language, input) {
    return new Promise(function (resolve, reject) {
        switch (language) {
            case "python":
                var envData = { OS: "windows" }
                if (input) {
                    try {
                        compiler.compilePythonWithInput(envData, code, input, function (result) {
                            console.log(result)
                            resolve(result)
                        })
                    } catch (error) {
                        reject(error)
                    }

                }
                else {
                    try {
                        compiler.compilePython(envData, code, function (result) {
                            console.log(result)
                            resolve(result)
                        })
                    }
                    catch (error) {
                        reject(error)
                    }

                }
                break;
            case "java":
                var envData = { OS: "windows" }
                if (input) {
                    try {
                        compiler.compileJavaWithInput(envData, code, input, function (result) {
                            console.log(result)
                            resolve(result)
                        })
                    } catch (error) {
                        reject(error)
                    }

                }
                else {
                    try {
                        compiler.compileJava(envData, code, function (result) {
                            console.log(result)
                            resolve(result)
                        })
                    }
                    catch (error) {
                        reject(error)
                    }

                }
                break;
                
            case "cpp" || "c":
                var envData = { OS: "windows" }
                if (input) {
                    try {
                        compiler.compileCPPWithInput(envData, code, input, function (result) {
                            console.log(result)
                            resolve(result)
                        })
                    } catch (error) {
                        reject(error)
                    }

                }
                else {
                    try {
                        compiler.compileCPP(envData, code, function (result) {
                            console.log(result)
                            resolve(result)
                        })
                    }
                    catch (error) {
                        reject(error)
                    }

                }
                break;
                

            default:
                break;
        }
    }
    )
}
module.exports = runcode