import React, { useEffect, useState } from 'react';
import SnippetsService from '../services/SnippetsService';
import Card from '../components/Card';

export default function ListSnippets () {

  const [snippets, setSnippets] = useState(null);

  useEffect(() => {
    SnippetsService.getSnippets()
      .then(resp => {
        setSnippets(resp);
        localStorage.setItem('js-snippets', JSON.stringify(resp));
      })

  }, []);

  return (<div className="row">
    {snippets && snippets.map((snippet, i) => <Card snippet={snippet} key={'snip' + i} /> )}
  </div>);
}