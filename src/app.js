import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/Home';

import './styles/App.css';
import './styles/scroll.css';
import LyricDetails from './pages/LyricDetails';

export default function App () {

  return <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/lyric/:artist/:title" component={LyricDetails} />
    </Switch>
  </Router>;
}