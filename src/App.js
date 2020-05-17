import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Home from './pages/Home';
import Snippet from './pages/Snippet';

import Navbar from './components/Navbar';

function App () {
  return (
    <Router>

      <Navbar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/snippet/:title" component={Snippet} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
