import React, { useState } from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import { evalConsole, formatOutput } from '../util/console';
import './Playground.css';

const source = `function identity<T>(arg: T): T {    
  return arg;    
}    
let output1 = identity<string>("myString");    
let output2 = identity<number>( 100 );  
console.log(output1);  
console.log(output2); `;

export default function PLayground () {

  const [editorValue, setEditorValue] = useState(source);
  const [editorOutput, setEditorOutput] = useState('');

  const onRun = async () => {
    try {
      let resultCompiler = window.ts.transpileModule(editorValue, {
        compilerOptions: {
          allowJs: true,
          declaration: true,
          emitDeclarationOnly: true,
          noEmitOnError: true,
          noImplicitAny: true,
          target: window.ts.ScriptTarget.ES5,
          module: window.ts.ModuleKind.CommonJS
        }
      });

      let result = await evalConsole(resultCompiler.outputText);
      setEditorOutput(formatOutput(result));
    } catch (error) {
      setEditorOutput(error);
    }
  }

  return (<div className="container-fluid bg-editor d-flex pl-0 pr-0">
    <ControlledEditor
      height="100vh"
      width="50%"
      onChange={(ev, value) => { setEditorValue(value); }}
      value={editorValue}
      language="typescript"
      theme="vs-dark"
      options={{ minimap: { enabled: false } }}
    />

    <pre className="w-50 h-100">
      {editorOutput}
    </pre>

    <div className="editor-banner">
      <button onClick={onRun} className="btn btn-dark mr-3">
        <i className="fa fa-play"></i>
      </button>
    </div>
  </div>);
}