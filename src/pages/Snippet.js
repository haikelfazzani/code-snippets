import React, { useEffect, useState, useContext } from 'react';
import Editor from '../components/Editor';
import { useParams, withRouter } from 'react-router-dom';
import Card from '../components/Card';
import GlobalContext from '../state/GlobalContext';
import Iframe from '../components/Iframe';

function Snippet (props) {

  let { title } = useParams();
  const { globalState } = useContext(GlobalContext);
  const [snipData, setSnipData] = useState(null);
  const [snipCode, setSnipCode] = useState(null);

  useEffect(() => {

    let localSnippets = localStorage.getItem('js-snippets');
    localSnippets = globalState.snippets ? globalState.snippets : JSON.parse(localSnippets);

    let snip = localSnippets.find(s => s.title === title);
    setSnipData(snip);

    if (snip.code) {
      fetch(snip.code).then(res => res.text()).then(resp => { setSnipCode(resp); });
    }
  }, []);

  const onGoBack = () => {
    props.history.push('/')
  }

  return (<div className="content py-3">

    <button className="btn btn-primary mb-3" onClick={onGoBack}>
      <i className="fa fa-arrow-left"></i>
    </button>

    {snipData && <Card snippet={snipData} withLink={false} />}

    {snipData
      && <div>
        {snipData.explanation && <p className="py-2">{snipData.explanation}</p>}
        {snipCode
          ? <Editor
            value={snipCode}
            lang={snipData.language}
          />
          : <Iframe src={snipData.embed} embedName={snipData.embedname} />}
      </div>}
  </div>);
}

export default withRouter(Snippet);