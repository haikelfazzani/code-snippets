import React from 'react';
import '../styles/InlineSkeleton.css';

const data = ['', '', '', '', '', '', '', '', '', '', '', ''];

export default function InlineSkeleton () {
  return (
    <div className="inline-skeleton">
      {data.map((d, i) => <div className="card-inline-skeleton mb-3" key={'sk' + i}>
      <div className="picture-inline-skeleton animate"></div>
        <div className="wrapper">          
          <div className="comment animate w-25"></div>
          <div className="comment animate"></div>
          <div className="comment animate m-0"></div>
        </div>
      </div>)}
    </div>
  );
}