import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InlineSkeleton from '../components/InlineSkeleton';
import Card from '../components/Card';
import getIconAndColor from '../util/getIconAndColor';
import AirSnippets from '../services/AirSnippets';
import Navbar from '../components/Navbar';

export default function SnippetsPerLang () {

  const { language } = useParams();
  const [snippets, setSnippets] = useState([]);
  const [tmpSnippets, setTmpSnippets] = useState([]); // immutable

  const [tags, setTags] = useState(['all']);

  const [activeTag, setActiveTag] = useState('all');

  useEffect(() => {
    AirSnippets.searchSnippetsByLangs(language)
      .then(r => {
        if (r) {
          setSnippets(r);
          setTmpSnippets(r);
          setTags([...tags, ...r.map(r => r.fields.tags.split(/\,/g)).flat()])
        }
      });
  }, [language]);

  const onTag = (tag) => {
    setSnippets(tag === 'all' ? tmpSnippets : tmpSnippets.filter(s => s.fields.tags.includes(tag)));
    setActiveTag(tag)
  }

  return <>
    <Navbar />

    <div className="content py-3">
      <h5 className="mb-3 text-muted">
        <span className="mr-2">
          <i className={"fab fa-" + getIconAndColor(language) + " bg-inherit"}></i> {language} Snippets
      </span>
        {snippets && <span>({snippets.length})</span>}
      </h5>

      {tags && tags.length > 0 && <ul className="inline-list mb-3 flipInX">
        {tags.map((tag, i) => <li
          className={"badge badge-secondary " + (tag === activeTag ? "bg-dark" : "")}
          key={'tag' + i}
          onClick={() => { onTag(tag) }}>{tag}
        </li>)}
      </ul>}

      {snippets && snippets.length > 0
        ? snippets.map((snippet, i) => <Card snippet={snippet} key={'snip' + i} clx="mb-3" />)
        : <InlineSkeleton />}
    </div>
  </>;
}