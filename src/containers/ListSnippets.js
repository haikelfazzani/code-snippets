import React, { useEffect, useState } from 'react';
import SnippetsService from '../services/SnippetsService';
import Card from '../components/Card';
import InlineSkeleton from '../components/InlineSkeleton';
import { useContext } from 'react';
import GlobalContext from '../state/GlobalContext';
import Dropdown from '../components/Dropdown';

export default function ListSnippets () {

  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [state, setState] = useState({
    snippets: null,
    tmpSnippets: null,
    languages: null
  });

  useEffect(() => {
    SnippetsService.getSnippets()
      .then(snippets => {

        let languages = ['all'];
        snippets.forEach(r => {
          if (!languages.includes(r.language)) languages.push(r.language);
        })

        setState({
          ...state,
          snippets,
          tmpSnippets: snippets,
          languages
        });
        setGlobalState({ ...setGlobalState, snippets });

        localStorage.setItem('js-snippets', JSON.stringify(snippets));
      });
  }, []);

  useEffect(() => {
    if (state.tmpSnippets && globalState.searchQuery) {
      let newSnips = state.tmpSnippets.filter(snip => snip.title
        .toLowerCase()
        .includes(globalState.searchQuery)
      );

      setState({
        ...state,
        snippets: globalState.searchQuery.length > 1 ? newSnips : state.tmpSnippets
      });
    }
  }, [globalState.searchQuery]);

  const onSelectLang = (lang) => {
    let newSnips = [];
    if (lang === 'all') {
      newSnips = state.tmpSnippets;
    }
    else {
      newSnips = state.tmpSnippets.filter(snip => snip.language === lang);
    }
    setState({ ...state, snippets: newSnips });
  }

  return (<div className="row">

    {state.languages && <div className="w-100 bg-main d-flex justify-content-between mb-3">
      <button className="btn btn-dark bg-main border-0"><i className="fa fa-list"></i> Snippet list</button>
      <Dropdown data={state.languages} title="Filter" onSelect={onSelectLang} />
    </div>}

    {state.snippets
      ? state.snippets.map((snippet, i) => <Card snippet={snippet} key={'snip' + i} clx="mb-3" />)
      : <InlineSkeleton />}
  </div>);
}