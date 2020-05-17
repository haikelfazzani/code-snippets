import React from 'react';
import { Link } from 'react-router-dom';

import jsImg from '../img/js-img.png';

export default function Card ({snippet}) {
  return (
    <div className="card bg-main text-white mb-3">
      <div className="row no-gutters">

        <div className="col-md-1 d-flex justify-content-center align-items-center pl-3">
          <img src={jsImg} className="card-img w-100" alt="..." />
        </div>

        <div className="col-md-11">
          <div className="card-body">

            <h5 className="card-title mb-0">
              <Link to={'snippet/' + snippet.date} className="text-white">
                <i className="fa fa-hashtag"></i> {snippet.title}
              </Link>
            </h5>

            <p className="mt-0 text-muted"><i className="fa fa-tags"></i> {snippet.tags.join(', ')}</p>

            <p className="card-text lead">{snippet.description}</p>
          </div>
        </div>

      </div>

    </div>
  );
}