const compiler = require("compilex")
const os = require("os")
const process = require("process")
const { getForStatements, getBigONotation } = require("./CalculateComplexity")
var compileroptions = {
    stats: true
}
compiler.init(compileroptions)

function parseInput(code) {
    let newlineSplit = code.split("\n")
    let forStatements = getForStatements(newlineSplit);
    return getBigONotation(forStatements);
}

function runcode(code, language, input) {
    const formatMemoryUsage = (data) => `${Math.round(data / 1024 * 100) / 100} KB`;

    var memoryBefore = process.memoryUsage()
    memoryBefore = memoryBefore.heapUsed
    var timeComplexity = parseInput(code)
    var memoryUsage = process.memoryUsage()
    memoryUsage = memoryUsage.heapUsed - memoryBefore
    console.log(timeComplexity, formatMemoryUsage(memoryUsage))


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