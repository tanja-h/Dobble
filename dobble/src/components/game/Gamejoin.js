import React, { useEffect, useContext } from 'react'
import { PlayerContext } from '../../context/PlayerContext';

function Gamejoin({ socket1, location }) {
    // console.log(location.gameCode);
    // let gameCode = location.gameCode;
    // let socket = location.gamejoinProps.socket;

    const [player, setPlayer] = useContext(PlayerContext);
    
    useEffect(() => {
        console.log("player u gamejoin", player);
        console.log("room u gameJoin", player.room);
        console.log("socket1 u gameJoin", socket1);
        
        return () => {
            handleDisconnect();
        }
    }, [location]);


    const handleDisconnect = () => {
        socket1.close();
        console.log("handle disconnect - ", player.name);
    }

    socket1.on('start1', handleStart1);
    // socket1.on('init', handleInit);

    function handleStart1(data) {
        console.log('start1');
        const cards = data.cards;
        const players = data.players;
        console.log(cards, players);
    }

    // function handleInit(number) { 
    //     setPlayer({ ...player, number: number });
    //     console.log("number - ",number);
    // }

    const clickclg = () => {
        console.log("klik", player);
        // console.log("klik", gameCode);
    }

    return (
        <div>
            <div>Wellcome {player.name}</div>
            <div>{player.room}</div>
            <div>{socket1.id}</div>
            <button onClick={clickclg}>clg player</button>
        </div>
    )
}

export default Gamejoin
