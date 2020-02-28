import React from 'react';
import AudioPlyr from './AudioPlyr';
import '../styles/MediaObject.css';
import fakeCover from '../img/cover.jpg';
import { Link } from 'react-router-dom';

export default function MediaObject ({ lyric, to }) {

  return <div className="media mb-20">
    {(lyric && Object.keys(lyric).length > 2)
      && <>
        <div className="media-infos">
          <img src={lyric.album.cover_medium || fakeCover} alt="cover" />
          <AudioPlyr preview={lyric.preview} />
        </div>

        <div className="d-flex-col h-100">
          {to
            ? <Link to={to}>
              <h4 className="m-0">{lyric.title}</h4>
              <span className="fs-12">{lyric.artist.name}</span>
            </Link>
            : <>
              <h4 className="m-0">{lyric.title}</h4>
              <span className="fs-12">{lyric.artist.name}</span>
            </>}
        </div>
      </>}
  </div>;
}