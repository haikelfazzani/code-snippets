import React, { useState } from "react";
import { ControlledEditor } from "@monaco-editor/react";
import { evalConsole, formatOutput } from '../util/console';
import './Editor.css';

function debounce (callback, wait) {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
}

export default function Monaco ({ jsvalue, lang = 'javascript' }) {

  const [state, setState] = useState({ output: null, isCopied: false, hideConsole: true });
  const [editorObject, setEditorObject] = useState(null);
  const [editorVal, setEditorVal] = useState(jsvalue);

  const editorDidMount = (e, editor) => {
    setEditorObject(editor);
    // let containerEl = document.querySelector('.editor');
    // settings.height = containerEl.scrollHeight + (containerEl.scrollHeight * 0.24);
  }

  const handleEditorChange = (ev, value) => {
    setEditorVal(value);
  };

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
    <div className="w-100 h-100 editor">
      <ControlledEditor
        editorDidMount={editorDidMount}
        height="100vh"
        width="100%"
        value={editorVal}
        onChange={handleEditorChange}
        language="javascript"
        theme="vs-dark"
        options={{
          automaticLayout: true,
          minimap: {
            enabled: false
          },
          scrollBeyondLastLine: false
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