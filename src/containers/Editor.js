import React, { useState } from "react";
import { ControlledEditor } from "@monaco-editor/react";
import { formatOutput } from '../util/console';
import './Editor.css';
import RunCode from "../util/RunCode";
import Iframe from "../components/Iframe";

export default function Editor ({ jsvalue, lang = 'javascript' }) {

  const [state, setState] = useState({ output: null, isCopied: false, hideConsole: true });
  const [editorVal, setEditorVal] = useState(jsvalue);

  const handleEditorChange = (ev, value) => {
    setEditorVal(value);
  };

  const onRun = async () => {
    try {
      let result = await RunCode.run(lang, editorVal);

      setState({
        ...state,
        output: lang.startsWith('javascript') ? formatOutput(result) : result,
        hideConsole: false
      });
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
      document.documentElement.querySelector('.editor').requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  return (
    <div className="w-100 editor pr-3">

      <div className="btn-run mr-3">
        <button onClick={onRun} className="btn btn-dark mb-3">
          <i className="fa fa-play"></i>
        </button>

        <button onClick={onCopy} className="btn btn-dark mb-3">
          <i className={"fa fa-" + (state.isCopied ? "paste text-light" : "copy")}></i>
        </button>

        <button onClick={onFullScreen} className="btn btn-dark">
          <i className="fa fa-compress"></i>
        </button>

      </div>

      <ControlledEditor
        height="100%"
        width="100%"
        onChange={handleEditorChange}
        value={jsvalue}
        language={lang.replace(/\d+/g, '')}
        theme="vs-dark"
        options={{
          automaticLayout: true,
          minimap: { enabled: false },
          fontSize: "16px"
        }}
      />

      <div className="ouput" style={{ display: state.hideConsole ? 'none' : 'block' }}>
        <div className="w-100 d-flex justify-content-between align-items-center bg-main">
          <span className="w-75"><i className="fa fa-terminal"></i> Console</span>
          <span className="badge badge-dark bg-main"
            onClick={() => { setState({ ...state, hideConsole: true }); }}>x</span>
        </div>

        {lang === 'html5' ? <Iframe data={editorVal} /> : <pre>{state.output}</pre>}

      </div>
    </div>
  );
}