const players = [];

const addP = (roomName, id, name, number) => {
    const p = {
        id: id,
        room: roomName,
        name: name,
        number: number
    };
    players.push(p);
    console.log("player added - ", p);
}

const getPlayersInRoom = (room) => players.filter((player) => player.room === room);

const addPlayer = (data, roomName, id) => {
    let pl = getPlayersInRoom(data.room);

    if (pl.length === 2) {
        return {
            error: 'The game already has two players.'
        }
    }

    const existingPlayer = pl.find(p => p.name === data.name);
    if (existingPlayer) {
        return {
            error: 'Name is already taken. Choose a different name.'
        }
    }

    let player = {
        name: data.name,
        score: 0,
        number: -1,
        // room: roomName,
        room: data.room,
        id: id
    };

    if (pl.length === 0) {
        player.number = 1;
    } else {
        player.number = 2;
    }
    players.push(player);
    return player;

    // if (pl.length < 2) {
    //     // const player = { name, room, socketId };
    //     const player = {
    //         name: data.name,
    //         score: 0,
    //         // room: roomName,
    //         room: data.room,
    //         id: id
    //     };

    //     const existingPlayer = players.find((p) => p.room === player.room && p.name === player.name);
    //     if (existingPlayer) {
    //         return {
    //             error: 'Name is already taken. Choose a different name.'
    //         }
    //     }

    //     players.push(player);
    //     return player;
    // } else {
    //     return {
    //         error: 'The game already has two players'
    //     }
    // }
}

const removePlayer = (id) => {
    const index = players.findIndex(player => player.id === id);

    if (index !== -1) {
        return players.splice(index, 1)[0];
    }
}

const getPlayer = (id) => players.find(player => player.id === id);

const getPlayersNamesInRoom = (room) => {
    pl = getPlayersInRoom(room);
    let names = [];
    pl.map(player => names.push(player.name));
    return names;
}


module.exports = {
    addP,
    addPlayer,
    removePlayer,
    getPlayer,
    getPlayersInRoom,
    getPlayersNamesInRoom
}