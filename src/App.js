import React from 'react';

import Home from './pages/Home';
import Snippet from './pages/Snippet';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App () {
  return (
    <Router>

      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
    
          <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">C</Link>
          <input className="form-control form-control-dark" type="text" placeholder="Search" aria-label="Search" />
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              <a className="nav-link" href="#">Sign out</a>
            </li>
          </ul>
    
      </nav>


      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/snippet/:id" component={Snippet} />
      </Switch>
    </Router>
  );
}

export default App;
