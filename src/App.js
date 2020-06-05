import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Snippet from './pages/Snippet';
import SearchResult from './pages/SearchResult';
import SnippetsPerLang from './pages/SnippetsPerLang';

function App () {
  return (
    <Router>

      <Navbar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/snippet/:title" component={Snippet} />
        <Route path="/search" component={SearchResult} />

        <Route path="/:language" component={SnippetsPerLang} />

        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
