import React, { useState, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

// Functional component version of Waveform.jsx
function WaveformHooks({ src, ctx, dest }) {
  const [wavesurferPlayer, setWavesurferPlayer] = useState(null);
  const [isLooping, setIsLooping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const waveContainerRef = useRef();

  useEffect(() => {
    const wavesurferInstance = WaveSurfer.create({
      container: waveContainerRef.current,
      audioContext: ctx,
      waveColor: "#999",
      progressColor: "#00ffaf",
      backend: "MediaElement",
      // Uncomment these lines to give the waveform a bar-like appearance
      // barWidth: 4,
      // barMinHeight: 1,
    });

    // Create an audio element to feed to the wavesurfer instance and the web audio context
    const audioElementToLoad = new Audio(src);
    audioElementToLoad.preload = "metadata";

    // Uncomment here to use pre-rendered peaks data
    // fetch('07024205_non_full_normalised.json')
    // .then(res => {
    //   return res.json();
    // })
    // .then(peaks => {
    //   wavesurferInstance.load(audioElementToLoad, peaks.data);
    // })
    // .catch(e => {
    //   console.error('error', e);
    // });

    wavesurferInstance.load(audioElementToLoad);
    setWavesurferPlayer(wavesurferInstance);

    // Connect audio element output to the audio context graph
    var mediaElementSource = new MediaElementAudioSourceNode(wavesurferInstance.backend.ac, { mediaElement: audioElementToLoad });
    mediaElementSource.connect(dest);
    mediaElementSource.connect(wavesurferInstance.backend.ac.destination);
  }, [src]);

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
