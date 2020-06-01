import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Home from './pages/Home';
import Snippet from './pages/Snippet';

import Navbar from './components/Navbar';
import SearchResult from './pages/SearchResult';

function App () {
  return (
    <Router>

      <Navbar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/snippet/:title" component={Snippet} />
        <Route path="/search" component={SearchResult} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
