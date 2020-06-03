## wavesurfer-react-app
### Setup
- Clone
- `npm install`
- `npm run start`

### Wavesurfer example
Wavesurfer is implemented in both a class-based and a functional component. The waveform data it retrieves comes from the `/public` folder in JSON files that were generated using [audiowaveform](https://github.com/bbc/audiowaveform). Wavesurfer requires its waveform data to be normalised (i.e. in float range between -1 to +1) - this operation is performed by the `scale-json.py` script in `src/scripts`. There are two sample files of waveform data in the `/public` folder to try:
- **07024205_non_full_normalised.json** contains the waveform data of `07024205.mp3` with the `--pixels-per-second 20` option added to `audiowaveform` and then normalised by `scale-python.py`. It was generated from the process suggested in the [Wavesurfer FAQ Page](https://wavesurfer-js.org/faq/).
- **07024205_non_full_normalised.json** is as above but it was generated without the `--pixels-per-second` option. Still normalised.

Amend the `Waveform.jsx` or `WaveformHooks.jsx` file to see what difference each waveform data file makes.

### Peaks.js example
Peaks.js is implemented in a functional component. It doesn't need normalised data to work, but it does not play well with data generated with `--pixels-per-second`. It uses the `07024205.json` data file in `/public` for its waveform data.