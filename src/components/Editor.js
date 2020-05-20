import React, { useState, useEffect } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import evalConsole from '../util/console';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/javascript/javascript';

import './Editor.css';

export default function Editor ({ jsvalue, lang = 'javascript' }) {

  const [state, setState] = useState({ output: null, isCopied: false });
  const [editorVal, setEditorVal] = useState(jsvalue);

  const onChange = (editor, v, data) => {
    setEditorVal(data);
  }

  const onRun = async () => {

    try {
      await evalConsole(editorVal);
    } catch (error) { }

    function onMsg (msg) {
      setState({ ...state, output: msg.data });
    }

    window.addEventListener("message", onMsg, false);
  }

  const onCopy = () => {
    const el = document.createElement('textarea');
    el.value = state.value;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    setState({ ...state, isCopied: true });

    setTimeout(() => { setState({ ...state, isCopied: false }); }, 700);
  }

  useEffect(()=>{  
    setEditorVal(jsvalue);
  },[jsvalue]);

  return (
    <div className="editor">
      <CodeMirror
        autoCursor={false}
        onChange={onChange}
        value={editorVal}
        options={{ mode: 'javascript', theme: 'monokai', lineNumbers: false }}
      />

      <div className="btn-run mr-3">
        <button onClick={onRun} className="btn btn-dark mr-3">
          <i className="fa fa-play"></i>
        </button>

        <button onClick={onCopy} className="btn btn-dark">
          <i className={"fa fa-" + (state.isCopied ? "paste text-light" : "copy")}></i>
        </button>
      </div>

      {lang === 'javascript' && <pre className="ouput mt-2">> {state.output}</pre>}
    </div>
  );

}