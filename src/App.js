import React from 'react';
import './App.css';
import Waveform from './Waveform';
import PeaksPlayer from './PeaksPlayer';
import WaveformHooks from './WaveformHooks';

function App() {
  return (
    <div className="App">
      {/* Waveform display using Peaks.js */}
      <PeaksPlayer />
      {/* Waveform display using Wavesurfer.js */}
      <Waveform src="07024205.mp3" />
      <WaveformHooks src="07024205.mp3" />
    </div>
  );
}

export default App;
