const EventEmitter = require('events').EventEmitter
const fs = require('fs'),
    watchDir = './watch',
    processedDir = './done'

class Watcher extends EventEmitter {
    constructor(watchDir, processedDir) {
        super()
        this.watchDir = watchDir
        this.processedDir = processedDir
    }

    watch() {
        console.log('watch')
        let watch = this
        fs.readdir(this.watchDir, function (err, files) {
            if (err) {
                throw err
            }
            for (let file of files) {
                watch.emit('process', file)
            }
            watch.end()
        })
    }

    start() {
        console.log('start')
        let watch = this
        fs.watchFile(watchDir, function () {
            watch.watch()
        })
    }

    end() {
        let watch = this
        watch.emit('end')
    }
}

let watcher = new Watcher(watchDir, processedDir)
watcher.on('process', function (file) {
    console.log('process')
    var watchFile = this.watchDir + '/' + file
    var processFile = this.processedDir + '/' + file.toLowerCase()

    fs.rename(watchFile, processFile, function (err) {
        if (err) throw err
    })
})
watcher.on('end', function () {
    console.log('end...')
})
watcher.start()
