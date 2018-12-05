const events = require('events')
const net = require('net')

let channel = new events.EventEmitter()

channel.clients = {}
channel.subscriptions = {}

channel.on('join',function (id, client) {
    this.clients[id] = client
    this.subscriptions[id] = function (senderId, message) {
        
    }
})