import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Editor from '../containers/Editor';
import loadComments from '../util/loadComments';
import AirSnippets from '../services/AirSnippets';
import ReactMarkdown from 'react-markdown';

function Snippet (props) {

  let { id } = useParams();
  const [snipData, setSnipData] = useState(null);

  useEffect(() => {
    AirSnippets.getSnippet(id)
      .then(snippet => {
        setSnipData(snippet);
        loadComments(id);
      });
  }, []);

  const onGoBack = () => { props.history.goBack(); }

  return (<div className="w-100 snippet">

    {snipData && <>

      <Helmet>
        <meta charSet="utf-8" />
        <title>{snipData.fields.title} - {snipData.fields.language}</title>
        <meta name="description" content={snipData.fields.description} />
      </Helmet>
      
      <p></p>

      <div className="row">
        <div className="col-md-6 p-0">
          <button className="btn btn-dark btn-go-back disp-none" onClick={onGoBack}>
            <i className="fa fa-arrow-left"></i>
          </button>

          <div className="snip-desc-container">
            <ReactMarkdown source={snipData.fields.description} className="snip-desc" />

            <span className="badge badge-light mr-3"><i className="fa fa-clock"></i> {snipData.fields.date}</span>
            <span className="badge badge-light mb-3">{snipData.fields.language}</span>
            <div id="graphcomment"></div>
          </div>
        </div>

        <div className="col-md-6 p-0">
          <Editor
            jsvalue={snipData.fields.code}
            lang={snipData.fields.language === 'algorithms' ? 'javascript' : snipData.fields.language}
          />
        </div>
      </div>
    </>}

  </div>);
}

export default withRouter(Snippet);