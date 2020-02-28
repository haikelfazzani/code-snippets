import React, { useEffect, useState } from 'react';
import LastFmService from '../services/LastFmService';
import '../styles/InlineMedia.css';

export default function InlineMedia ({ artist, cover }) {

  const [artistBio, setArtistBio] = useState();

  useEffect(() => {
    LastFmService.getArtistInfo(artist)
      .then(res => {

        console.log(res);
        setArtistBio(res)
      })
      .catch(err => { })
  }, [artist]);

  return (<>{artistBio && <div className="inline-media">
    <img src={cover || artistBio.image[1]['#text']} alt="artist" />
    <div>
      <h3 className="m-0">{artistBio.name}</h3>
      <p className="m-0">{artistBio.bio.summary}</p>
    </div>
  </div>}
  </>);
}