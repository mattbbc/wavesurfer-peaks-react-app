import React, { useState, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js';

// Functional component version of Waveform.jsx
function WaveformHooks({ src }) {
  const [wavesurferPlayer, setWavesurferPlayer] = useState(null);
  const [isLooping, setIsLooping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const waveContainerRef = useRef();

  useEffect(() => {
    const wavesurferInstance = WaveSurfer.create({
      container: waveContainerRef.current,
      waveColor: "#999",
      progressColor: "#00ffaf",
      // Uncomment these lines to give the waveform a bar-like appearance
      // barWidth: 4,
      // barMinHeight: 1,
      plugins: [
        RegionsPlugin.create({
          regions: [
            {
              start: 20,
              end: 25,
              color: 'hsla(400, 100%, 30%, 0.5)',
              id: 'region123'
            }
          ]
        })
      ]
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
  }, [src]);

  useEffect(() => {
    if (wavesurferPlayer) {
      if (isLooping) {
        wavesurferPlayer.on('finish', () => {
          wavesurferPlayer.regions.list['region123'].play();
        });
      } else {
        wavesurferPlayer.on('finish', () => {
          wavesurferPlayer.pause();
        });
      }
    }

  }, [wavesurferPlayer, isLooping]);

  const handlePlayClick = () => {
    if (isPlaying) {
      setIsPlaying(false);
      wavesurferPlayer.pause();
    } else {
      setIsPlaying(true);
      wavesurferPlayer.play();
    }
  }

  return (
    <div className="waveform">
      <button onClick={handlePlayClick}>{isPlaying? 'Pause' : 'Play'}</button>
      <button onClick={() => setIsLooping(!isLooping)}>Loop</button>
      <p>{isLooping ? 'Looping on' : 'Looping off'}</p>
      <div className="wave" ref={waveContainerRef}></div>
    </div>
  )
}

export default WaveformHooks
