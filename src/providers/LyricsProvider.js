import React, { useState } from 'react';
import LyricsContext from './LyricsContext';

//let localStor = localStorage.getItem('lyrics-finder');
//let lyricsLocal = localStor ? JSON.parse(localStor) : {};

let initState = {
  suggestions: [],
  artistName: '',
  songName: ''
};

export function LyricsProvider ({ children }) {

  const [state, setState] = useState(initState);

  return <LyricsContext.Provider value={{ state, setState }}>
    {children}
  </LyricsContext.Provider>;
}