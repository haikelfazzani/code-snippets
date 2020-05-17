import React from 'react';
import { Link } from 'react-router-dom';
import FormSearch from '../containers/FormSearch';

export default function Navbar () {
  return (

    <nav className="navbar navbar-dark sticky-top bg-dark flex-nowrap">

      <Link className="navbar-brand p-0" to="/"><i className="fas fa-hospital-symbol"></i></Link>

      <FormSearch />

      <ul className="navbar-nav">
        <li className="nav-item text-nowrap">
          <a className="nav-link" href="https://github.com/haikelfazzani"><i className="fab fa-github"></i></a>
        </li>
      </ul>

    </nav>
  );
}