import React, { useState } from 'react';
import GlobalContext from './GlobalContext';

/** init values global state */
let initState = {
  snippets: null, // should be an array
  tmpSnippets: null, // should be an array
  languages: null, // should be an array
  selectedLangTags: null // should be an array
};

export default function GlobalProvider ({ children }) {
  const [globalState, setGlobalState] = useState(initState);
  return <GlobalContext.Provider value={{ globalState, setGlobalState }}>
    {children}
  </GlobalContext.Provider>;
}