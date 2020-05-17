import React from 'react';
import ListSnippets from '../containers/ListSnippets';
import { withRouter } from 'react-router-dom';

function Home () {
  return (<div className="content">
    <div className="jumbotron text-center m-0 p-0 py-3">
      <h1 className="display-4">Welcome to my blog!</h1>
      <p className="lead">Here you could find some code snippets and code editor.</p>
    </div>

    <ListSnippets />
  </div>);
}

export default withRouter(Home);