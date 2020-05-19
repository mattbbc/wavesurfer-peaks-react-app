## wavesurfer-react-app
### Setup
- Clone
- `npm install`
- `npm run start`

### Notes
- `/public` folder contains a JSON of the waveform information
- Waveform information was generated using [audiowaveform](https://github.com/bbc/audiowaveform) as per the steps outlined in the [Wavesurfer FAQ Page](https://wavesurfer-js.org/faq/)
- `src/scripts` folder contains the Python script used to normalise the audio data (taken from the Wavesurfer FAQ page)
- `Waveform.jsx` is the main component. `componentDidMount` in the component contains two variants of loading the waveform data to illustrate the time difference between loading it from pre-processed data and loading it in real time.