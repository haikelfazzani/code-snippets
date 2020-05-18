import React, { useState } from 'react';
import GlobalContext from './GlobalContext';

/** init values global state */
let initState = {
  snippets: null, // should be an array
  tmpSnippets: null, // should be an array
  languages: null, // should be an array
  selectedLangTags: null,
  currentLang: 'all' // current language clicked by user (top bar: langs icons)
};

export default function GlobalProvider ({ children }) {
  const [globalState, setGlobalState] = useState(initState);
  return <GlobalContext.Provider value={{ globalState, setGlobalState }}>
    {children}
  </GlobalContext.Provider>;
}