var http = require('http')
var fs = require('fs')
var path = require('path')
// 根据文件拓展名得出mime类型
var mime = require('mime')
var cache = {};

function send404(res) {
    res.writeHead(404,{'Content-Type': 'text/plain'})
    res.write(404,'Error 404:response not found')
    res.end()
}

function sendFile(res, filePath, fileContents) {
    res.writeHead(200, {
        'Content-Type': mime.lookup(path.basename(filePath))
    })
    res.end(fileContents)
}

function serveStatic(res, cache, absPath) {
    if(cache[absPath]){
        // 如果文件在内存中，则从内存中返回文件
        sendFile(res, absPath,cache[absPath])
    }else {
        fs.exists(absPath, function (exists) {
            if(exists){
                fs.readFile(absPath, function (err, data) {
                    if(err){
                        send404(res)
                    }else {
                        cache[absPath] = data
                        sendFile(res, absPath, data)
                    }
                })
            }else {
                send404(res)
            }
        })
    }
}