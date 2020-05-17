import React from 'react';
import ListSnippets from '../containers/ListSnippets';

export default function Home () {
  return (<div className="content">
    <div className="jumbotron text-center m-0 p-0 py-2">
      <h1 className="display-4">Welcome to my blog!</h1>
      <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
    </div>

    <ListSnippets />
  </div>);
}