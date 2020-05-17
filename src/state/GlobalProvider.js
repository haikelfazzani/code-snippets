import React, { useState } from 'react';
import GlobalContext from './GlobalContext';

/** init values global state */
let initState = {
  snippets: null, // its an array
  searchQuery: null // navbar search form
};

export default function GlobalProvider ({ children }) {
  const [globalState, setGlobalState] = useState(initState);
  return <GlobalContext.Provider value={{ globalState, setGlobalState }}>
    {children}
  </GlobalContext.Provider>;
}