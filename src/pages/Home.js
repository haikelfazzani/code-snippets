import React from 'react';
import ListSnippets from '../containers/ListSnippets';
import { withRouter } from 'react-router-dom';
import ListLanguages from '../containers/ListLanguages';

function Home () {
  return (<div className="content">
    <div className="jumbotron text-center m-0 p-0 py-3">
      <h3>Welcome to my blog!</h3>
      <p className="lead">Here you could find some code snippets and code editor.</p>
    </div>

    <ListLanguages />

    <ListSnippets />
  </div>);
}

export default withRouter(Home);