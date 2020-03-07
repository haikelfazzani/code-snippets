import React, { useState } from 'react';
import '../styles/MediaObject.css';

export default function AudioPlyr ({ preview }) {

  const [audio] = useState(new Audio(preview));

  const playAudio = () => {
    audio.play();
  }

  const pauseAudio = () => { audio.pause() }

  return <div className="audio-playr">
    <button onClick={playAudio} className="btn mr-10"><i className="fas fa-play"></i></button>
    <button onClick={pauseAudio} className="btn"><i className="fas fa-pause"></i></button>
  </div>
}