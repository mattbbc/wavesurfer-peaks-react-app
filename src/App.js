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
    // This is bodged together to get it working, nothing more
    
    // https://www.russellgood.com/how-to-convert-audiobuffer-to-audio-file/#render-as-wav
    function bufferToWave(abuffer, len) {
      var numOfChan = abuffer.numberOfChannels,
          length = len * numOfChan * 2 + 44,
          buffer = new ArrayBuffer(length),
          view = new DataView(buffer),
          channels = [], i, sample,
          offset = 0,
          pos = 0;
    
      // write WAVE header
      setUint32(0x46464952);                         // "RIFF"
      setUint32(length - 8);                         // file length - 8
      setUint32(0x45564157);                         // "WAVE"
    
      setUint32(0x20746d66);                         // "fmt " chunk
      setUint32(16);                                 // length = 16
      setUint16(1);                                  // PCM (uncompressed)
      setUint16(numOfChan);
      setUint32(abuffer.sampleRate);
      setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
      setUint16(numOfChan * 2);                      // block-align
      setUint16(16);                                 // 16-bit (hardcoded in this demo)
    
      setUint32(0x61746164);                         // "data" - chunk
      setUint32(length - pos - 4);                   // chunk length
    
      // write interleaved data
      for(i = 0; i < abuffer.numberOfChannels; i++)
        channels.push(abuffer.getChannelData(i));
    
      while(pos < length) {
        for(i = 0; i < numOfChan; i++) {             // interleave channels
          sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
          sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767)|0; // scale to 16-bit signed int
          view.setInt16(pos, sample, true);          // write 16-bit sample
          pos += 2;
        }
        offset++                                     // next source sample
      }
    
      // create Blob
      return new Blob([buffer], {type: "audio/wav"});
    
      function setUint16(data) {
        view.setUint16(pos, data, true);
        pos += 2;
      }
    
      function setUint32(data) {
        view.setUint32(pos, data, true);
        pos += 4;
      }
    }

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

      var blob = new Blob(chunks);
      chunks = [];

      blob.arrayBuffer().then(arrayBuffer => {
        ctx.decodeAudioData(arrayBuffer, audioBuffer => {
          const wav = bufferToWave(audioBuffer, audioBuffer.length);
          var audioURL = window.URL.createObjectURL(wav);
          audio.src = audioURL;
          const downloadButton = document.getElementById("downloadbutton");
          downloadButton.href = audioURL;
          downloadButton.download = 'mix.wav';
        })
      });
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
