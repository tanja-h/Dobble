import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import Rules from './components/rules/Rules';
import Game from './components/game/Game';
import { PlayerContext } from './context/PlayerContext';


function App() {
  const [player, setPlayer] = useState({
    name: 'Player',
    number: 1
  });

  const ctxPlayer = [player, setPlayer];

  return (
    <Router>
      <div className="App">
        <PlayerContext.Provider value={ctxPlayer}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rules" component={Rules} />
            <Route path="/game" component={Game} />
          </Switch>
        </PlayerContext.Provider>
      </div>
    </Router>
  );
}

export default App;
