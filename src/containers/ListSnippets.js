import React, { useEffect, useState } from 'react';
import SnippetsService from '../services/SnippetsService';
import Card from '../components/Card';
import InlineSkeleton from '../components/InlineSkeleton';
import { useContext } from 'react';
import GlobalContext from '../state/GlobalContext';;

export default function ListSnippets () {

  const { setGlobalState } = useContext(GlobalContext);
  const [state, setState] = useState({ snippets: null, languages: null });

  useEffect(() => {
    SnippetsService.getSnippets()
      .then(snippets => {

        let languages = ['all'];
        snippets.forEach(r => {
          if (!languages.includes(r.language)) languages.push(r.language);
        });

        setState({ ...state, snippets, languages });
        setGlobalState({ ...setGlobalState, snippets, languages });

        localStorage.setItem('js-snippets', JSON.stringify(snippets));
      });
  }, []);


  return (<div className="row m-0">

    {state.snippets
      ? state.snippets.map((snippet, i) => <Card snippet={snippet} key={'snip' + i} clx="mb-3" />)
      : <InlineSkeleton />}

  </div>);
}