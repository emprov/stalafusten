const express = require('express')
const app = express()
const port = 5500

var server = app.listen(port, () => console.log('App listening on local port ' + port))
app.use(express.static('public'))

//initialize server on port 3000
///const io = require('socket.io')(3000);
//const io = require('socket.io')();
const io = require('socket.io').listen(server);
var firstLetter = randomLetter();
var users = {};
var gameResult = {};

io.on('connection', socket => {
    console.log(socket.id + ': Connected');
    socket.emit('new-game', firstLetter);
    
    socket.on('new-user', name =>{
        users[socket.id] = name;
        console.log('New User joined. User list ' + JSON.stringify(users));  
    })

    socket.on('submit-event', message => {
        console.log('submit-event:' + JSON.stringify(message));
        io.emit('game-over-event', 'Spiel beendet');
    })

    socket.on('return-answer', message => {
        console.log('return-answer: '+ JSON.stringify(message));
        message['gameLetter'] = firstLetter;
        gameResult[socket.id] = message;
        if(Object.keys(gameResult).length == Object.keys(users).length){
            console.log('Answers collected: ' + JSON.stringify(gameResult));
            io.emit('game-result-broadcast', Object.values(gameResult));
            gameResult = {};
        }
        
    })

    

    socket.on('client-reset-event', function() {
        console.log(socket.id + ': reset request');
        io.emit('reset-broadcast-event');
        firstLetter = randomLetter();
        io.emit('new-game', {'firstLetter': firstLetter , 'users': Object.values(users) });
    }) 

    socket.on('disconnect', () =>{
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        console.log('User left: ' + users[socket.id]);
        delete users[socket.id];
        console.log('User left. User list ' + JSON.stringify(users));
    })
});

function randomLetter() {
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    return characters.charAt(Math.floor(Math.random() * charactersLength));
}
