import React, { useContext } from 'react';
import GlobalContext from '../state/GlobalContext';

export default function FormSearch () {

  const { globalState, setGlobalState } = useContext(GlobalContext);

  return (
    <input
      className="form-control form-control-dark mr-3"
      type="text"
      placeholder="# Search"
      onChange={(e) => {
        let val = (e.target.value);
        if (val && val.length > 0) {
          setGlobalState({ ...globalState, searchQuery: val.toLowerCase() });
        }
      }}
    />
  );
}