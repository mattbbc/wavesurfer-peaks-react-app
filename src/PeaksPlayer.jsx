import React, { useEffect, useRef } from 'react';
import Peaks from 'peaks.js';

function PeaksPlayer() {
  const playerRef = useRef();
  const peaksContainerRef = useRef();
  const overviewContainerRef = useRef();

  useEffect(() => {
    Peaks.init({
      containers: {
        overview: overviewContainerRef.current,
      },
      mediaElement: playerRef.current,
      dataUri: {
        json: '07024205.json'
      },
      height: 200,
      zoomLevels: [512, 1024, 2048, 4096],
    });
  }, []);

  return (
    <div>
      <div ref={peaksContainerRef}>
        <div ref={overviewContainerRef} style={{ width: '100%' }}></div>
      </div>
      <audio className="hidden" ref={playerRef} controls>
        <source src={`07024205.mp3`} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}

export default PeaksPlayer;
