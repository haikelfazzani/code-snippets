import React, { useContext, useState } from 'react';
import GlobalContext from '../state/GlobalContext';

var browserError = false;
try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
} catch (error) {
  browserError = true;
  recognition = {};
}

export default function FormSearch () {

  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [state, setState] = useState('');

  const onSearch = (e) => {
    let val = (e.target.value).toLowerCase();
    filterSnippets(val);
  }

  const onSpeech = () => {
    if (!browserError) {
      try {
        recognition.start();
        recognition.onresult = (event) => {
          const sp = event.results[0][0].transcript;
          filterSnippets(sp);
        }
      } catch (error) { recognition.stop(); }
    }
  }

  const filterSnippets = (val) => {
    setState(val);
    let newSnips = [];

    if (val && val.length > 0) {
      newSnips = globalState.tmpSnippets.filter(snip => snip.title.toLowerCase().includes(val));
    }

    setGlobalState({
      ...globalState,
      snippets: newSnips.length > 0 ? newSnips : globalState.tmpSnippets
    });
  }

  return (<>
    <input
      className="form-control form-control-dark"
      type="search"
      placeholder="# Search"
      onChange={onSearch}
      value={state}
    />

    <span className="nav-link" onClick={onSpeech}>
      <i className="fas fa-microphone"></i>
    </span>
  </>);
}