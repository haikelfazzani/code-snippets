import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LyricsContext from '../providers/LyricsContext';
import MediaObject from '../components/MediaObject';
import '../styles/Suggestions.css';
import LyricService from '../services/LyricService';

export default function Suggestions () {

  const { state } = useContext(LyricsContext);
  const [suggestions, setSuggestions] = useState(state.suggestions);

  useEffect(() => {
    LyricService.searchLyric('love')
      .then(suggs => {        
        let localSuggs = localStorage.getItem('lyric-suggestions');
        if(!localSuggs && localSuggs.length < 1) {
          setSuggestions(suggs);
          localStorage.setItem('lyric-suggestions', JSON.stringify(suggs));
        }
        else {
          setSuggestions(JSON.parse(localSuggs))
        }
      })
      .catch(e => { })
  }, []);

  useEffect(() => {
    setSuggestions(state.suggestions);
  }, [state.suggestions]);


  return <>
    {suggestions && suggestions.length > 0
      && <ul className="suggestions">
        {suggestions.map(lyric =>
          <li key={lyric.id} className="w-25">

            <MediaObject lyric={lyric} to={"/lyric/" + lyric.artist.name + "/" + lyric.title} />

          </li>)}
      </ul>}
  </>;
}
