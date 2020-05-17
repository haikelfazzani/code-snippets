import React, { useContext } from 'react';
import GlobalContext from '../state/GlobalContext';

const langColors = [
  { lang: 'all', color: 'bg-secondary' },
  { lang: 'javascript', color: 'bg-yellow' },
  { lang: 'html5', color: 'bg-primary' },
  { lang: 'css3', color: 'bg-danger' },
  { lang: 'node-js', color: 'bg-success' },
  { lang: 'react', color: 'bg-info' }
];

export default function ListLanguages () {

  const { globalState, setGlobalState } = useContext(GlobalContext);

  const onSelectLang = (val) => {

    let newSnips = [];
    let selectedLangTags = [];

    if (val && val.length > 0 && val !== 'all') {
      newSnips = globalState.tmpSnippets.filter(snip => snip.language.includes(val));

      // every language has tags: we filter tags by removing dupicates
      globalState.tmpSnippets.forEach(snip => {
        if (snip.language === val) {
          snip.tags.forEach(tag => {
            if (!selectedLangTags.includes(tag)) selectedLangTags.push(tag);
          })
        }
      });
    }

    setGlobalState({
      ...globalState,
      snippets: newSnips.length > 0 ? newSnips : globalState.tmpSnippets,
      selectedLangTags: newSnips.length > 0 ? selectedLangTags : null
    });
  }

  return (<ul className="list-langs mb-5">

    {globalState.languages && globalState.languages.map((lang, i) =>
      <li className="text-center "
        key={lang + i}
        onClick={() => { onSelectLang(lang) }}>
        <i className={"fs-40 mb-1 fab fa-" + (
          lang === 'javascript' ? 'js' : lang === 'all' ? 'buysellads' : lang
        )
          + " "
          + (langColors.find(l => l.lang === lang).color)}>

        </i>
        <div>{lang}</div>
      </li>)}

  </ul>);
}