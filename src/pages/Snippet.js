import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import loadComments from '../util/loadComments';
import AirSnippets from '../services/AirSnippets';
import ReactMarkdown from 'react-markdown';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import material from 'react-syntax-highlighter/dist/esm/styles/prism/material-dark';

function Snippet(props) {

  let { id } = useParams();
  const [snipData, setSnipData] = useState(null);

  useEffect(() => {
    AirSnippets.getSnippet(id)
      .then(snippet => {
        setSnipData(snippet);
        //loadComments(id);
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

      <div className="container pr-3 pl-3 py-5">

          <button className="btn btn-dark btn-go-back" onClick={onGoBack}>
            <i className="fa fa-arrow-left"></i>
          </button>

          <div className="snip-desc-container">
            <ReactMarkdown
              children={snipData.fields.content}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, '')}
                      style={material}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    />
                  ) : (<code className={className} {...props}>{children}</code>)
                }
              }}
            />

            <span className="badge badge-light mr-3"><i className="fa fa-clock"></i> {snipData.fields.date}</span>
            <span className="badge badge-light mb-3">{snipData.fields.language}</span>
            <div id="graphcomment"></div>
          </div>
      </div>
    </>}
  </div>);
}

export default withRouter(Snippet);