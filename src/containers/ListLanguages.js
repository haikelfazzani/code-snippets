import React, { useContext } from 'react';
import GlobalContext from '../state/GlobalContext';
import getIconAndColor from '../util/getIconAndColor';

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
            if (tag && !selectedLangTags.includes(tag)) selectedLangTags.push(tag);
          })
        }
      });
    }

    setGlobalState({
      ...globalState,
      snippets: newSnips.length > 0 ? newSnips : globalState.tmpSnippets,
      selectedLangTags: newSnips.length > 0 ? selectedLangTags : null,
      currentLang: val
    });
  }

  return (<ul className="list-langs mb-5">

    {globalState.languages && globalState.languages.map((lang, i) =>
      <li
        className="text-center"
        key={lang + i}
        onClick={() => { onSelectLang(lang) }}
      >

        <i className={"fs-40 mb-1 " + getIconAndColor(lang)
          + (globalState.currentLang === lang ? "bg-main" : "")}>
        </i>

        <div>{lang}</div>
      </li>)}

  </ul>);
}