const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addP, addPlayer, removePlayer, getPlayersInRoom, getPlayersNamesInRoom } = require('./Players');
const { createNewDeck } = require('./Algorithm');
const { makeId } = require('./Util');

const PORT = process.env.PORT || 5000;

const router = require('./router');
const { initGame } = require('./Game');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('new socket connection -', socket.id);

    socket.on('start', handleStart);
    socket.on('disconnect', handleDisconnect);

    socket.on('newGame', handleNewGame);
    socket.on('joinGame', handleJoinGame);

    function handleStart(data, callback) {
        let room = makeId(6);
        const player = addPlayer(data, room, socket.id);
        if (player.error) {
            console.log(player.error);
            return callback(player.error);
        }

        socket.join(player.room);
        console.log(`Player ${player.name} has joined the game room ${player.room}`);
        socket.broadcast.to(player.room).emit('info', `Player ${player.name} has joined the game!`);
        socket.emit('gameCode', room);
        socket.emit('init', player.number);
        if (getPlayersInRoom(player.room).length === 2) {
            const newDeckOfCards = createNewDeck();
            const state = initGame(newDeckOfCards);
            
            console.log('names', getPlayersInRoom(player.room));
            io.to(player.room).emit('start1', { players: getPlayersInRoom(player.room), cards: newDeckOfCards });
        }
    }

    function handleNewGame(player) {
        let room = makeId(6);
        console.log("room u newGame", room);
        socket.emit('gameCode', room);
        addP(room, socket.id, player.name, 1);
        socket.emit('init', 1);
    }

    function handleJoinGame(player, callback) {
        let room = player.room;
        // let p = data.player;
        let pl = getPlayersInRoom(room);
        if (pl.length === 0) {
            return callback('Uknown game code.');
        }

        if (pl.length === 2) {
            return callback('This game is already in progress.');
        }

        if (pl.find(p => player.name === p.name)) {
            return callback('Name is already taken. Choose a different name.');
        }

        addP(room, socket.id, p.name, 2);
        socket.emit('init', 2);

        const newDeckOfCards = createNewDeck();
        console.log('players', getPlayersInRoom(room));
        io.to(room).emit('start1',
            {
                players: getPlayersInRoom(room),
                cards: newDeckOfCards
            });
        console.log("join kraj");
    }

    function handleDisconnect() {
        const player = removePlayer(socket.id);
        if (player) {
            console.log(`client socket disconnected`, player.name);
        } else {
            console.log('Socket connection closed', socket.id);
        }
    }
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port *:${PORT}`));