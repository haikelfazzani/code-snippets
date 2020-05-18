import React, { useEffect, useState, useContext } from 'react';
import Editor from '../components/Editor';
import { useParams, withRouter } from 'react-router-dom';
import Card from '../components/Card';
import GlobalContext from '../state/GlobalContext';
import Iframe from '../components/Iframe';
import { Helmet } from 'react-helmet';

function Snippet (props) {

  let { title } = useParams();
  const { globalState } = useContext(GlobalContext);
  const [snipData, setSnipData] = useState(null);
  const [snipCode, setSnipCode] = useState(null);

  useEffect(() => {

    if (globalState.snippets) {
      let snip = globalState.snippets.find(s => s.title === title);
      setSnipData(snip);

      if (snip.code) {
        fetch(snip.code).then(res => res.text()).then(resp => { setSnipCode(resp); });
      }
    }
  }, []);

  const onGoBack = () => {
    props.history.push('/')
  }

  return (<div className="content py-3">

    {snipData && <>

      <Helmet>
        <meta charSet="utf-8" />
        <title>{snipData.language} - {snipData.title}</title>
        <meta name="description" content={snipData.description} />
      </Helmet>

      <button className="btn btn-dark btn-go-back" onClick={onGoBack}>
        <i className="fa fa-arrow-left"></i>
      </button>

      <Card snippet={snipData} withLink={false} />

      <div>
        {snipCode
          ? <Editor
            value={snipCode}
            lang={snipData.language}
          />
          : <Iframe src={snipData.embed} embedName={snipData.embedname} />}
      </div>


    </>}
  </div>);
}

export default withRouter(Snippet);