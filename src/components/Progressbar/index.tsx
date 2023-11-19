"use client";
import React, {useState, useEffect} from 'react';
import '../../app/globals.css';

const Progressbar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => 
        prevProgress >= 100 ? 0 : prevProgress + 10
      )
    }, 600);
    return () => {
      clearInterval(interval);
    }
  }, []);
  return (
    <div className='loadingContainer'>
      <div className='loadingBar' style={{width: `${progress}%`}}></div>
    </div>
  )
}

export default Progressbar