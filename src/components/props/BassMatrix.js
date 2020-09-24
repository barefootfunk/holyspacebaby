import React from 'react';
import * as Tone from 'tone';

export default class BassMatrix extends React.Component {
  componentDidMount () {
    this.synth = new Tone.Synth().toDestination();
    this.synth = new Tone.MonoSynth({
      "volume": 3,
      "detune": 0,
      "portamento": 0.2,
      "envelope": {
        "attack": 1,
        "attackCurve": "linear",
        "decay": 0,
        "decayCurve": "exponential",
        "release": 30,
        "releaseCurve": "exponential",
        "sustain": 1
      },
      "filter": {
        "Q": 0,
        "detune": 0,
        "frequency": 5000,
        "gain": 0,
        "rolloff": -12,
        "type": "lowpass"
      },
      "filterEnvelope": {
        "attack": 0.001,
        "attackCurve": "linear",
        "decay": 0.7,
        "decayCurve": "exponential",
        "release": 0.8,
        "releaseCurve": "exponential",
        "sustain": 0.1,
        "baseFrequency": 300,
        "exponent": 2,
        "octaves": 4
      },
      "oscillator": {
        "detune": 0,
        "frequency": 440,
        "partialCount": 4,
        "partials": [
          1,
          1,
          1,
          1
        ],
        "phase": 0,
        "type": "sine4"
      }
    }).toDestination();
  }

  componentWillUnmount() {
    this.synth.triggerRelease(Tone.now());
  }
  render() {

    const notes = ['Ab2','F2','A2','Bb2',];

    return (
      <div id="bass-matrix" className="button-matrix">
        {notes.map( note => {

          return (
            <button 
              onMouseDown={() => {
                this.synth.triggerAttack(note, Tone.now());
              }}
              onMouseUp={() => {
                this.synth.triggerRelease(Tone.now());
              }}
              style={{ width: '50%' }}
            ></button>
          )
        })}
      </div>
    )
  }
}