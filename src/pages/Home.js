import React from 'react';
import Suggestions from '../containers/Suggestions';
import Header from '../containers/Header';
import TopTracks from '../containers/TopTracks';
import TopArtists from '../containers/TopArtists';

export default function Home () {

  return <main>
    <Header />
    <Suggestions />
    <TopTracks />
    <TopArtists />
  </main>;
}