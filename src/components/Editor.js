import React, { useState, useRef } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import writeContent from '../util/console';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/javascript/javascript';

import './Editor.css';

export default function Editor ({ value, lang = 'javascript' }) {

  const jsIframe = useRef();
  const [state, setState] = useState({ value, output: null, isCopied: false });

  const onChange = (editor, v, value) => { setState({ ...state, value }); }

  const onRun = async () => {

    let iframeDoc = jsIframe.current.contentWindow.document;

    let content = await writeContent('', '', state.value);

    iframeDoc.open().write(content);
    iframeDoc.close();

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

      <div className="btn-run mr-3">
        <button onClick={onRun} className="btn btn-warning mr-3">
          <i className="fa fa-play"></i>
        </button>

        <button onClick={onCopy} className="btn btn-warning">
          <i className={"fa fa-" + (state.isCopied ? "paste text-light" : "copy")}></i>
        </button>
      </div>

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