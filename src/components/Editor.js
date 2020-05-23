import React, { useState } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { evalConsole, formatOutput } from '../util/console';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/javascript/javascript';

import 'codemirror/addon/fold/foldgutter.css'

import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';

import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/xml-fold';

import './Editor.css';

export default function Editor ({ jsvalue, lang = 'javascript' }) {

  const [state, setState] = useState({ output: null, isCopied: false, hideConsole: true });
  const [editorVal, setEditorVal] = useState(jsvalue);

  const onChange = (editor, v, data) => {
    setEditorVal(data);
  }

  const onRun = async () => {
    try {
      let result = await evalConsole(editorVal);
      setState({ ...state, output: formatOutput(result), hideConsole: false });
    } catch (error) {
      setState({ ...state, output: error, hideConsole: false });
    }
  }

  const onCopy = () => {
    const el = document.createElement('textarea');
    el.value = editorVal;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    setState({ ...state, isCopied: true });

    setTimeout(() => { setState({ ...state, isCopied: false }); }, 700);
  }

  const onFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.querySelector('.content').requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  return (
    <div className="editor">
      <CodeMirror
        autoCursor={false}
        onChange={onChange}
        value={editorVal}
        options={{
          mode: 'javascript',
          theme: 'monokai',
          lineNumbers: true,
          matchBrackets: true,
          autoCloseBrackets: true,
          foldGutter: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        }}
      />

      <div className="btn-run mr-3">
        <button onClick={onRun} className="btn btn-dark mr-3">
          <i className="fa fa-play"></i>
        </button>

        <button onClick={onCopy} className="btn btn-dark mr-3">
          <i className={"fa fa-" + (state.isCopied ? "paste text-light" : "copy")}></i>
        </button>

        <button onClick={onFullScreen} className="btn btn-dark">
          <i className="fa fa-compress"></i>
        </button>

      </div>

      {lang === 'javascript' && <div className="ouput" style={{ display: state.hideConsole ? 'none' : 'block' }}>
        <div className="d-flex justify-content-between align-items-center">
          <span><i className="fa fa-terminal"></i> Console</span>
          <span className="badge badge-danger" onClick={() => { setState({ ...state, hideConsole: true }); }}>x</span>
        </div>
        <pre>{state.output}</pre>
      </div>}
    </div>
  );

}