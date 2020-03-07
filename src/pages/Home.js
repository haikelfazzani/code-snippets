import React, { useEffect } from 'react';
import Suggestions from '../containers/Suggestions';
import Header from '../containers/Header';
import LyricService from '../services/LyricService';

export default function Home () {

  useEffect(()=>{
  LyricService.getDetails('numb')
  .then(res=>{
    console.log(res);
    
  })
  .catch(e=>{
    console.log(e);
    
  })
  
  },[]);

  return <main>
    <Header />
    <Suggestions />
  </main>;
}