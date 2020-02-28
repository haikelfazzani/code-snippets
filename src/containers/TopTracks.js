import React, { useEffect, useState } from 'react';
import LastFmService from '../services/LastFmService';
import '../styles/TopTracks.css';
import fakeCova from '../img/1.png';

export default function TopTracks () {

  const [topTracks, setTopTracks] = useState();

  useEffect(() => {
    LastFmService.getTopTracks()
      .then(result => {
        setTopTracks(result);
      })
      .catch(e => { })
  }, []);

  return <div className="top-tracks">
    <h3><i className="fas fa-headphones-alt"></i> Top 10 Tracks</h3>

    <ul>
      {topTracks && topTracks.map((t, i) => <li key={'track' + i}>
        <img src={fakeCova} alt="track cover" />
        <h4 className="m-0">{t.name}</h4>
        <p className="fs-12 m-0">{t.artist.name}</p>
      </li>)}
    </ul>
  </div>;
}