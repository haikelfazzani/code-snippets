import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

var browserError = false;
try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
} catch (error) {
  browserError = true;
  recognition = {};
}

function FormSearch (props) {

  const [state, setState] = useState('');

  const onSearch = (e) => {
    e.preventDefault();
    if (state.length > 0) props.history.push('/search?s=' + state);
  }

  const onSpeech = () => {
    if (!browserError) {
      try {
        recognition.start();
        recognition.onresult = (event) => {
          const sp = event.results[0][0].transcript;
          setState(sp);
          props.history.push('/search?s=' + sp);
        }
      } catch (error) { recognition.stop(); }
    }
  }

  return (<>
    <form onSubmit={onSearch} className="w-100 form-search">
      <input
        className="form-control form-control-dark"
        type="search"
        placeholder="# Search"
        onChange={(e) => { setState((e.target.value).toLowerCase()); }}
        value={state}
      />

      <button type="submit" className="btn btn-dark"><i className="fas fa-search"></i></button>
    </form>

    <span className="nav-link" onClick={onSpeech}><i className="fas fa-microphone"></i></span>
  </>);
}

export default withRouter(FormSearch);