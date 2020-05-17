import React, { useContext } from 'react';
import GlobalContext from '../state/GlobalContext';

export default function FormSearch () {

  const { globalState, setGlobalState } = useContext(GlobalContext);

  const onSearch = (e) => {
    let val = (e.target.value);
    let newSnips = [];

    if (val && val.length > 0) {
      newSnips = globalState.tmpSnippets.filter(snip => snip.title.toLowerCase().includes(val));
    }

    setGlobalState({
      ...globalState,
      snippets: newSnips.length > 0 ? newSnips : globalState.tmpSnippets
    });
  }

  return (
    <input
      className="form-control form-control-dark mr-3"
      type="text"
      placeholder="# Search"
      onChange={onSearch}
    />
  );
}