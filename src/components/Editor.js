import React, { useState, useEffect, useRef } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import writeContent from '../util/console';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/javascript/javascript';

import './Editor.css';

export default function Editor ({ value, onclick, lang = 'javascript' }) {

  const jsIframe = useRef();
  const [state, setState] = useState({ value, output: null });

  const onChange = (editor, v, value) => { setState({ ...state, value }); }

  const onRun = async () => {

    let iframeDoc = jsIframe.current.contentWindow.document;

    let content = await writeContent('<h1>dfqf</h1>', "", state.value);

    iframeDoc.open().write(content);
    iframeDoc.close();

    function onMsg (msg) {
      setState({ ...state, output: msg.data })
    }

    window.addEventListener("message", onMsg, false);
  }

  useEffect(() => {
    window.addEventListener('keydown', async (e) => {
      if (e.ctrlKey && e.keyCode === 13) await onRun();
    })
  }, []);

  return (
    <div className="editor">
      <CodeMirror
        autoCursor={false}
        onChange={onChange}
        value={state.value}
        options={{
          mode: 'javascript',
          theme: 'monokai',
          lineNumbers: false
        }}
      />
      <button onClick={onRun} className="btn-run btn btn-dark">
        <i className="fa fa-play" onClick={onclick}></i> Run
      </button>

      {lang === 'javascript' && <pre className="ouput mt-2">> {state.output}</pre>}

      <iframe
        ref={jsIframe}
        id="js-console"
        className="w-100 mt-3"
        title="Javascript console"
        style={{ display: lang === "browser" ? 'block' : 'none' }}>
      </iframe>
    </div>
  );

}