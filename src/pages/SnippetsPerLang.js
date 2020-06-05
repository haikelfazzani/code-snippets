import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import GlobalContext from '../state/GlobalContext';
import SnippetsService from '../services/SnippetsService';
import InlineSkeleton from '../components/InlineSkeleton';
import Card from '../components/Card';
import getIconAndColor from '../util/getIconAndColor';

export default function SnippetsPerLang () {

  const { language } = useParams();
  const { globalState } = useContext(GlobalContext);
  const [state, setState] = useState(async () => {
    let snippets = [];
    let tags = [];
    try {
      snippets = globalState.snippets.filter(s => s.language === language);
      tags = snippets.map(s => s.tags).flatMap(v => v);
      tags = tags.filter((d, i) => tags.indexOf(d) === i);

      setState({ snippets, tmpSnippets: snippets, tags: ['all', ...tags] });
    } catch (error) {
      snippets = await SnippetsService.searchSnippetsByLangs(language);
      tags = snippets.map(s => s.tags).flatMap(v => v);
      tags = tags.filter((d, i) => tags.indexOf(d) === i);
      setState({ snippets, tmpSnippets: snippets, tags: ['all', ...tags] });
    }
    return { snippets, tmpSnippets: snippets, tags: ['all', ...tags] };
  });

  const [activeTag, setActiveTag] = useState('all');

  const onTag = (tag) => {
    let nSnips = state.tmpSnippets.filter(snip => snip.tags.includes(tag));
    setState({ ...state, snippets: tag !== 'all' ? nSnips : state.tmpSnippets });
    setActiveTag(tag)
  }

  return <div className="content py-3">
    <h5 className="mb-3 text-muted">
      <span className="mr-2">
        <i className={"fab fa-" + getIconAndColor(language) + " bg-inherit"}></i> {language} Snippets
      </span>
      {state.snippets && <span>({state.snippets.length})</span>}
    </h5>

    {state.tags && state.tags.length > 0 && <ul className="inline-list mb-3 flipInX">
      {state.tags.map((tag, i) => <li
        className={"badge badge-secondary " + (tag === activeTag ? "bg-dark" : "")}
        key={'tag' + i}
        onClick={() => { onTag(tag) }}>{tag}
      </li>)}
    </ul>}

    {state.snippets && state.snippets.length > 0
      ? state.snippets.map((snippet, i) => <Card snippet={snippet} key={'snip' + i} clx="mb-3" />)
      : <InlineSkeleton />}
  </div>;
}