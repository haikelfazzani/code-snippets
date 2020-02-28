import React, { useEffect, useState } from 'react';
import LastFmService from '../services/LastFmService';
import '../styles/TopTracks.css';
import fakeCova from '../img/1.png';

export default function TopArtists () {

  const [topArtists, setTopArtists] = useState();

  useEffect(() => {
    LastFmService.getTopArtists()
      .then(result => {
        setTopArtists(result);
      })
      .catch(e => { })
  }, []);

  return <div className="top-tracks">
    <h3><i className="fas fa-headphones-alt"></i> Top 10 Artists</h3>

    <ul>
      {topArtists && topArtists.map((t, i) => <li key={'track' + i}>
        <img src={fakeCova} alt="track cover" />
        <h4 className="m-0">{t.name}</h4>
        <p className="fs-12 m-0">Listeners: {t.listeners}</p>
        <p className="fs-12 m-0">Playcount: {t.playcount}</p>
      </li>)}
    </ul>
  </div>;
}