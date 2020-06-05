import React from 'react';
import getIconAndColor from '../util/getIconAndColor';

export default function CardImg ({ snippet, clx = "" }) {
  return (
    <div className={"w-100 card bg-main text-white " + clx}>      

      <div className="w-100 h-100 d-flex">
        <div className="mr-3 ml-3 d-flex justify-content-center align-items-center d-none">
          <i className={"fs-70 " + getIconAndColor(snippet.language, 'text-')}></i>
        </div>

        <div>
          <div className="card-body">

            <h5 className="card-title mb-0">
              <i className="fa fa-hashtag"></i> {snippet.title.replace(/-/g, ' ')}
            </h5>

            <p className="mt-0 text-muted"><i className="fa fa-tags"></i> {snippet.tags.join(', ')}</p>

            <p className="card-text lead text-muted">{snippet.description}</p>
          </div>
        </div>
      </div>

      {snippet.image && <img src={snippet.image} className="w-100 card-img-top" alt={snippet.description} />}

    </div>
  );
}