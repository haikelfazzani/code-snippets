import React from 'react';
import { withRouter } from 'react-router-dom';
import InlineSkeleton from '../components/InlineSkeleton';
import Card from '../components/Card';
import useFilter from '../hooks/useFilter';
import Navbar from '../components/Navbar';

function SearchResult () {

  const { snippets } = useFilter();

  return (<>
    <Navbar />
    <div className="content py-5">

      <h5 className="mb-3 text-muted"><i className="fas fa-search"></i> Search results</h5>

      {snippets
        ? snippets.map((snippet, i) => <Card snippet={snippet} key={'snip' + i} clx="mb-3" />)
        : <InlineSkeleton />}
    </div>
  </>);
}

export default withRouter(SearchResult);