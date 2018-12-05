const socketio = require('socket.io')
let io;
let guestNumber = 1
let nickName = {}
let nameUsed = []
let currentRoom = {}

exports.listen = function (server) {
    io = socketio.listen(server)
    io.set('log level', 1)
    io.sockets.on('connection',function (socket) {
        guestNumber = assignGuestNumber(socket, guestNumber, nickName, nameUsed)
        joinRoom(socket, 'lobby')
        handleMessageBroadcasting(socket,nickName)
        handleChangeNameAttemps(socket,nickName,nameUsed)
        handleRoomJoining(socket)
        
        socket.on('rooms',function () {
            socket.emit('rooms',io.sockets.manager.rooms)
        })

        handleClientDisconnect(socket, nickName, nameUsed)
        
    })
}

/**
 * 赋予用户游客号码
 * @param socket
 * @param guestNumber
 * @param nickName
 * @param nameUsed
 */
function assignGuestNumber(socket, guestNumber, nickName, nameUsed) {
    var name = 'Guest' + guestNumber;
    nickName[socket.id] = name
    socket.emit('nameResult',{
        success: true,
        name: name
    })
    nameUsed.push(name)
    return guestNumber + 1
}

/**
 * 加入聊天室
 * @param socket
 * @param roomName
 */
function joinRoom(socket, roomName) {
    socket.join(roomName)
    currentRoom[socket.id] = roomName
    socket.emit('joinResult',{
        room: roomName
    })
    socket.broadcast.to(roomName).emit('message',function () {
        text: `${nickName[socket.id]} has joined in room ${roomName}.`
    })
    let usersInRooms = io.sockets.clients(roomName)
    if(usersInRooms.length > 1){

    }
}

/**
 *
 * @param socket
 * @param nickName
 */
function handleMessageBroadcasting(socket, nickName) {

}


function handleRoomJoining(socket) {

}


function handleChangeNameAttemps(socket, nickName, nameUsed) {
    
}


function handleClientDisconnect(socket, nickName, nameUsed) {
    
}