import React, { useEffect, useState } from 'react';
import LyricService from '../services/LyricService';
import { useParams, Link } from 'react-router-dom';
import '../styles/LyricDetails.css';
import MediaObject from '../components/MediaObject';
import InlineMedia from '../components/InlineMedia';

export default function LyricDetails () {

  let { artist, title } = useParams();
  const [lyric, setLyric] = useState();
  const [infos, setInfos] = useState({});

  useEffect(() => {
    LyricService.getLyric(artist, title)
      .then(res => {
        setLyric(res.lyrics);
        let suggestions = JSON.parse(localStorage.getItem('lyric-suggestions'));
        setInfos(suggestions.find(l => l.title.includes(title) && l.artist.name.includes(artist)));
      })
      .catch(err => { setLyric('Not found...'); })
  }, [artist, title]);

  return <div className="container result">
    <Link to="/" className="btn-back"><i className="fas fa-arrow-left"></i></Link>

    <InlineMedia
      artist={artist}
      cover={infos.artist ? infos.artist.picture_medium : ''}
    />

    <div className="lyric-infos">      
      <pre>{lyric}</pre>
      <MediaObject lyric={infos} />
    </div>
  </div>;
}