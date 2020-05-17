import React from 'react';
import { Link } from 'react-router-dom';

export default function Card ({ snippet, clx = "", withLink = true }) {
  return (
    <div className={"w-100 card bg-main text-white " + clx}>

      <div className="w-100 h-100 d-flex">
        <div className="mr-3 ml-3 d-flex justify-content-center align-items-center">
          <i className={"fab fa-"
            + (snippet.language === 'javascript' ? 'js' : snippet.language)
            + " text-info fs-70"}></i>
        </div>

        <div>
          <div className="card-body">

            <h5 className="card-title mb-0">
              {withLink
                ? <Link to={'snippet/' + snippet.title} className="text-white">
                  <i className="fa fa-hashtag"></i> {snippet.title.replace(/-/g, ' ')}
                </Link>
                : <><i className="fa fa-hashtag"></i> {snippet.title.replace(/-/g, ' ')}</>}
            </h5>

            <p className="mt-0 text-muted"><i className="fa fa-tags"></i> {snippet.tags.join(', ')}</p>

            <p className="card-text lead text-muted">{snippet.description}</p>
          </div>
        </div>
      </div>

    </div>
  );
}