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
    languages: null,
    selectedLangTags: null // every snippet has tags
  });

  useEffect(() => {
    SnippetsService.getSnippets()
      .then(snippets => {

        let languages = ['all'];
        snippets.forEach(r => {
          if (!languages.includes(r.language)) languages.push(r.language);
        });

        setState({
          ...state,
          snippets,
          tmpSnippets: snippets,
          languages
        });

        setGlobalState({ ...setGlobalState, tmpSnippets: snippets, snippets, languages });

        localStorage.setItem('js-snippets', JSON.stringify(snippets));
      });
  }, []);

  useEffect(() => {
    if (globalState.snippets) {
      setState({
        ...state,
        snippets: globalState.snippets,
        selectedLangTags: globalState.selectedLangTags
      });
    }
  }, [globalState.snippets]);

  const onSelectTag = (tag) => {
    let newSnips = [];

    newSnips = state.tmpSnippets.filter(snip => snip.tags.includes(tag));

    setState({ ...state, snippets: newSnips });
  }

  return (<div className="row m-0">

    {state.selectedLangTags && <div className="w-100 bg-main d-flex justify-content-between mb-3">
      <button className="btn btn-dark bg-main border-0">
        <i className="fa fa-list"></i> {globalState.currentLang}
      </button>
      <Dropdown data={state.selectedLangTags} title="TAGS" onSelect={onSelectTag} />
    </div>}

    {state.snippets
      ? state.snippets.map((snippet, i) => <Card snippet={snippet} key={'snip' + i} clx="mb-3" />)
      : <InlineSkeleton />}

  </div>);
}