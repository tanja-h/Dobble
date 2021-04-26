const players = [];

const addPlayer = (name, number, roomName, id) => {
    const p = {
        name: name,
        number: number,
        room: roomName,
        id: id
    };
    players.push(p);
    console.log("player added - ", p);
}

const getPlayersInRoom = (room) => players.filter((player) => player.room === room);

const removePlayer = (id) => {
    const index = players.findIndex(player => player.id == id);

    if (index !== -1) {
        return players.splice(index, 1)[0];
    }
}

const getPlayer = (id) => {
    return players.find(player => player.id == id);
}

// const getPlayersNamesInRoom = (room) => {
//     pl = getPlayersInRoom(room);
//     let names = [];
//     pl.map(player => names.push(player.name));
//     return names;
// }


module.exports = {
    addPlayer,
    removePlayer,
    getPlayer,
    getPlayersInRoom
    // getPlayersNamesInRoom
}