import React, { useState, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

// Functional component version of Waveform.jsx
function WaveformHooks({ src }) {
  const [wavesurferPlayer, setWavesurferPlayer] = useState(null);
  const [isLooping, setIsLooping] = useState(false);
  const waveContainerRef = useRef();

  useEffect(() => {
    const wavesurferInstance = WaveSurfer.create({
      container: waveContainerRef.current,
      waveColor: "#999",
      progressColor: "#00ffaf",
      // Uncomment these lines to give the waveform a bar-like appearance
      // barWidth: 4,
      // barMinHeight: 1,
    });

    fetch('07024205_non_full_normalised.json')
    .then(res => {
      return res.json();
    })
    .then(peaks => {
      wavesurferInstance.load(src, peaks.data);
    })
    .catch(e => {
      console.error('error', e);
    });

    setWavesurferPlayer(wavesurferInstance);
  }, []);

  useEffect(() => {
    if (wavesurferPlayer) {
      if (isLooping) {
        wavesurferPlayer.on('finish', () => {
          wavesurferPlayer.play();
        });
      } else {
        wavesurferPlayer.on('finish', () => {
          wavesurferPlayer.pause();
        });
      }
    }

  }, [wavesurferPlayer, isLooping]);

  return (
    <div className="waveform">
      <button onClick={() => wavesurferPlayer.play()}>Play</button>
      <button onClick={() => setIsLooping(!isLooping)}>Loop</button>
      <div className="wave" ref={waveContainerRef}></div>
    </div>
  )
}

export default WaveformHooks
