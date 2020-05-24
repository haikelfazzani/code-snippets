import React, { useEffect, useState, useContext } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import Card from '../components/Card';
import GlobalContext from '../state/GlobalContext';
import Iframe from '../components/Iframe';
import { Helmet } from 'react-helmet';
import Monaco from '../components/Monaco';

function Snippet (props) {

  let { title } = useParams();
  const { globalState } = useContext(GlobalContext);
  const [snipData, setSnipData] = useState(null);
  const [snipCode, setSnipCode] = useState(null);

  useEffect(() => {

    let isMounted = true;
    let localSnippets = localStorage.getItem('js-snippets');

    if (isMounted && (globalState.snippets || localSnippets)) {

      localSnippets = globalState.snippets || JSON.parse(localSnippets);

      let snip = localSnippets.find(s => s.title === title);
      setSnipData(snip);

      if (snip.code) {
        fetch(snip.code).then(res => res.text()).then(resp => { setSnipCode(resp); });
      }
    }
    else {
      onGoBack();
    }

    return () => { isMounted = false; }
  }, []);

  const onGoBack = () => { props.history.push('/'); }

  return (<div className="content py-5">

    {snipData && <>

      <Helmet>
        <meta charSet="utf-8" />
        <title>{snipData.language} - {snipData.title.replace(/-|_/g, ' ')}</title>
        <meta name="description" content={snipData.description} />
      </Helmet>

      <button className="btn btn-dark btn-go-back" onClick={onGoBack}>
        <i className="fa fa-arrow-left"></i>
      </button>

      <Card snippet={snipData} withLink={false} />

      <div className="w-100 h-75">
        {snipCode
          ? <Monaco
            jsvalue={snipCode}
            lang={snipData.language === 'algorithms' ? 'javascript' : snipData.language}
          />
          : <Iframe src={snipData.embed} embedName={snipData.embedname} />}
      </div>


    </>}
  </div>);
}

export default withRouter(Snippet);