const http = require('http')
const fs = require('fs')
const path = require('path')
// 根据文件拓展名得出mime类型
const mime = require('mime')
const chatServer = require('./lib/chat_server')
let cache = {};

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

let server = http.createServer(function (req,res) {
    let filePath = false;

    if(req.url == '/'){
        filePath = 'public/index.html'
    }else {
        filePath = 'public' + req.url
    }

    let absPath = './' + filePath;

    serveStatic(res, cache, absPath)
})

server.listen(3900,function () {
    console.log('listening to port 3900')
})
chatServer.listen(server)