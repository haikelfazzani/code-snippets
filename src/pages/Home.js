import React from 'react';
import ListSnippets from '../containers/ListSnippets';
import { withRouter } from 'react-router-dom';
import ListLanguages from '../containers/ListLanguages';

function Home () {
  return (<div className="content mb-5">
    <div className="jumbotron text-center m-0 p-0 py-3">

      <h3 className="mb-0 fadeIn">Hi! My name's Haikel Fazzani</h3>
      <small className="m-0 text-muted text-uppercase ltsp2">I'm FullStackJs Software developer</small>

      <p className="lead text-muted">Here you can find some useful code snippets.</p>
    </div>

    <ListLanguages />

    <ListSnippets />
  </div>);
}

export default withRouter(Home);