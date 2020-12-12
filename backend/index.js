const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;
const router = require('./router');

const { addPlayer, removePlayer, getPlayer, getPlayersInRoom } = require('./Players');
const { makeId } = require('./Util');
const { createGameState, findMatchingElement, updateGameState } = require('./Game');

const state = {};

io.on('connection', (socket) => {
    console.log('new socket connection -', socket.id);

    socket.on('newGame', handleNewGame);
    socket.on('joinGame', handleJoinGame);
    socket.on('disconnect', handleDisconnect);
    socket.on('guessElement', handleGuessElement);


    function handleNewGame(playerName, callback) {
        console.log("data", playerName);
        let roomName = makeId(6);
        if (getPlayersInRoom(roomName).length > 0) {
            return callback('Internal server error! Please try again.');
        }

        addPlayer(playerName, 1, roomName, socket.id);
        socket.join(roomName);
        console.log(`Player ${playerName} has joined the game room ${roomName}`);
        socket.emit('gameCode', roomName);
        socket.emit('init', 1);
    }

    function handleJoinGame(data, callback) {
        console.log("data", data);
        let roomName = data.gameCode;
        let playerName = data.playerName;
        let pl = getPlayersInRoom(roomName);

        if (pl.length === 0) {
            return callback('Uknown game code.');
        }

        if (pl.length === 2) {
            return callback('This game is already in progress.');
        }

        if (pl.find(p => p.name === playerName)) {
            return callback('Name is already taken. Choose a different name.');
        }

        addPlayer(playerName, 2, roomName, socket.id);
        socket.join(roomName);
        socket.broadcast.to(roomName).emit('info', `Player ${playerName} has joined the game!`);
        socket.emit('init', 2);
        console.log(`Player ${playerName} has joined the game room ${roomName}`);

        pl = getPlayersInRoom(roomName);    //updated list because of the player no. 2
        const gameState = createGameState(pl);
        state[roomName] = gameState;
        io.to(roomName).emit('gameState', gameState);
        console.log('game started');
    }

    function handleDisconnect() {
        const player = removePlayer(socket.id);
        if (player) {
            console.log(`client disconnected`, player.name);
        } else {
            console.log('Socket connection closed', socket.id);
        }
    }

    function handleGuessElement(element) {
        const player = getPlayer(socket.id);
        const gameState = state[player.room];

        const centralCard = gameState.deckOfCards[0];
        const playerCard = gameState.players[player.number - 1].card;

        if (element == findMatchingElement(centralCard, playerCard)) {
            socket.emit('info', 'match found');
            game = updateGameState(gameState, player.number - 1);

            if (game.winner) {
                console.log('winner', game.winner);
                io.to(player.room).emit('gameOver', game.winner);
            } else {
                io.to(player.room).emit('gameState', game.gameState);
            }
        } else {
            socket.emit('info', 'try again');
        }
    }

});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port *:${PORT}`));