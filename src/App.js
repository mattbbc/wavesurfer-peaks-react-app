import React, { useEffect } from 'react';
import './App.css';
// import Waveform from './Waveform';
// import PeaksPlayer from './PeaksPlayer';
import WaveformHooks from './WaveformHooks';

function App() {
  const ctx = new AudioContext();
  const dest = ctx.createMediaStreamDestination();
  var mediaRecorder = new MediaRecorder(dest.stream);
  var chunks = [];

  useEffect(() => {
    mediaRecorder.ondataavailable = function(event) {
      chunks.push(event.data);
    }

    mediaRecorder.onstop = function(event) {
      var clipName = prompt('Enter a name for your sound clip');

      var clipContainer = document.createElement('article');
      var clipLabel = document.createElement('p');
      var audio = document.createElement('audio');

      clipContainer.classList.add('clip');
      audio.setAttribute('controls', '');
      clipLabel.innerHTML = clipName;

      clipContainer.appendChild(audio);
      clipContainer.appendChild(clipLabel);
      document.body.appendChild(clipContainer);

      var blob = new Blob(chunks, { 'type': 'audio/webm;codecs=opus' });
      chunks = [];
      var audioURL = window.URL.createObjectURL(blob);
      audio.src = audioURL;
      const downloadButton = document.getElementById("downloadbutton");
      downloadButton.href = audioURL;
      downloadButton.download = 'mix.webm';
    }

    document.getElementById('startbutton').addEventListener('click', function() {
      mediaRecorder.start();
    });

    document.getElementById('stopbutton').addEventListener('click', function(event) {
      mediaRecorder.stop();
    })
  }, []);

  return (
    <div className="App">
      {/* Waveform display using Peaks.js */}
      {/* <PeaksPlayer /> */}

      {/* Waveform display using Wavesurfer.js */}
      {/* <Waveform src="07024205.mp3" /> */}
      
      {/* Demonstrating mix recording */}
      <WaveformHooks src="07024205.mp3" ctx={ctx} dest={dest} />
      <WaveformHooks src="stereo-test.mp3" ctx={ctx} dest={dest} />
      <WaveformHooks src="test2.mp3" ctx={ctx} dest={dest} />
      <button id="startbutton">Start Recordings</button>
      <button id="stopbutton">Stop Recordings</button>
      <a id="downloadbutton" className="button" href="#">Download</a>
    </div>
  );
}

export default App;
