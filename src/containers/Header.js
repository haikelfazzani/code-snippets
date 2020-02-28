import React, { useState, useContext } from 'react';
import LyricService from '../services/LyricService';
import LyricsContext from '../providers/LyricsContext';
import '../styles/Header.css';

export default function Header () {

  const { state, setState } = useContext(LyricsContext);
  const [searchVal, setSearchVal] = useState('');

  const onInputChange = (e) => {
    setSearchVal(e.target.value);
  }

  const onSearch = async () => {
    let suggestions = await LyricService.searchLyric(searchVal);

    setState({ ...state, suggestions });
    setSearchVal('');

    localStorage.setItem('lyric-suggestions', JSON.stringify(suggestions));
  }


  return <header>
    <div className="container d-flex-col-jc">

      <h1><i className="fas fa-headphones-alt"></i> Lyrics Finder</h1>
      <p className="mt-0">Search and find your favorite song lyric</p>

      <div className="input-search">
        <input type="text"
          placeholder="Search for song lyric.."
          onChange={onInputChange}
          value={searchVal}
          required
        />
        <button onClick={onSearch}><i className="fas fa-search"></i></button>
      </div>
    </div>
  </header>;
}