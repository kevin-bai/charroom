const http = require('http')
const fs = require('fs')

http.createServer(function (req, res) {
    if (req.url == '/') {
        fs.readFile('./titles.json', function (err, data) {
            if (err) {
                console.log('err')
                res.end(() => {
                    console.log('server error')
                })
            } else {
                let titles = JSON.parse(data)
                console.log('title', titles)
                fs.readFile('./index.html', function (err, data) {
                    if (err) {
                        res.end('server error')
                    } else {
                        let tmp = data.toString()
                        let html = tmp.replace('%', titles.join("<li></li>"))
                        res.writeHead(200, {"Content-Type": "text/html"})
                        res.end(html)
                    }
                })
            }
        })
    } else {
        res.end(function () {
            console.log('server err')
        })
    }
}).listen(3801, function () {
    console.log('listening to port 3801')
})


const eventEmitter = require('events').EventEmitter

let channel = new eventEmitter()
channel.on('hello', function () {
    console.log('hello world')
})

channel.emit('hello')