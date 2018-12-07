var fs = require('fs')
var htmlparser = require('htmlparser')
var request = require('request')

var configFilename = './rss_feeds.txt'

function checkForFile() {
    var isExist = fs.existsSync(configFilename)
    if(!isExist){
        return next(new Error('can not find the file !'))
    }
    return next(null, configFilename)
}

function readRSSFile() {
    fs.readFile(configFilename,function (err, data) {
        if(err){return next(err)}
        var feedList = data
                        .toString()
                        .replace(/^\s+|\s+$/g, '')
                        .split("\n");

        var random = Math.floor(Math.random()*feedList.length)
        next(feedList[random])
    })
}

function downloadRSSFeed(url) {
    request({uri:url},function (err,res, body) {
        
    })
}

function parseRSSFeed() {

}

var tasks = [checkForFile, readRSSFile , downloadRSSFeed, parseRSSFeed]

function next(err, result) {
    if(err){
        throw err
        return
    }

    var currentTask = tasks.shift()
    if(!currentTask){
        return
    }
    currentTask(result)

}