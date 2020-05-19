import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import WaveSurfer from 'wavesurfer.js';

// Based on https://stackoverflow.com/questions/44813585/wavesurfer-js-is-working-fine-but-react-wavesurfer-has-issues

export default class Waveform extends Component {
  componentDidMount() {
    this.$el = ReactDOM.findDOMNode(this);
    this.$waveform = this.$el.querySelector('.wave');
    this.wavesurfer = WaveSurfer.create({
      container: this.$waveform,
      waveColor: "#999",
      progressColor: "#00ffaf",
      barWidth: 4,
      barMinHeight: 1
    });

    // This call pulls the waveform data from the JSON file rather than generating on the fly
    fetch('sample.json')
    .then(res => {
      return res.json();
    })
    .then(peaks => {
      this.wavesurfer.load(this.props.src, peaks.data);
    })
    .catch(e => {
      console.error('error', e);
    })

    // This will make Wavesurfer load the sample and generate the waveform on the fly
    // this.wavesurfer.load(this.props.src);
  }

  render() {
    return (
      <div className="waveform">
        <button onClick={() => this.wavesurfer.play()}>Play</button>
        <div className="wave"></div>
      </div>
    )
  }
}
