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
      // Change these lines to change the waveform's appearance. Remove them to present it in a normal waveform style.
      barWidth: 4,
      barMinHeight: 1,
    });

    /*
      This call pulls the waveform data from the fetched JSON file rather than generating on the fly.

      Try these options:
        - '07024205_full_normalised.json' for data generated using audiowaveform without any --pixels-per-second option set
        - '07024205_non_full_normalised.json' for data generated using audiowaveform with --pixels-per-second option set at 20
    */
    fetch('07024205_full_normalised.json')
    .then(res => {
      return res.json();
    })
    .then(peaks => {
      this.wavesurfer.load(this.props.src, peaks.data);
    })
    .catch(e => {
      console.error('error', e);
    })

    // This will make Wavesurfer load the sample and generate the waveform on the fly. Use this instead of fetching the JSON file to see how long it takes
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
