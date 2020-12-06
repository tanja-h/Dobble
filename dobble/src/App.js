import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import Rules from './components/rules/Rules';
import Game from './components/game/Game';
import Slike from './components/cards/Slike';
import { PlayerContext } from './context/PlayerContext';
import Gamejoin from './components/game/Gamejoin';

import io from 'socket.io-client';
let socket1;
const ENDPOINT = 'localhost:5000';
socket1 = io(ENDPOINT);

function App() {
  console.log("socket1 u app", socket1);

  const [player, setPlayer] = useState({
    name: 'player 1',
    room: '2',
    number: -1
  });

  const ctxPlayer = [player, setPlayer];

  return (
    <Router>
      <div className="App">
        <PlayerContext.Provider value={ctxPlayer}>
          <Switch>
            <Route path="/" exact component={() => <Home socket1={socket1} />} />
            <Route path="/rules" component={Rules} />
            <Route path="/game" component={Game} />
            <Route path="/gameJoin" component={() => <Gamejoin socket1={socket1} />} />
            <Route path="/slike" component={Slike} />
          </Switch>
        </PlayerContext.Provider>
      </div>
    </Router>
  );
}

export default App;
