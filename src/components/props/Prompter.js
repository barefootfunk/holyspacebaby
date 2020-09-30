import React from 'react';
import Filter from 'bad-words';
import {Howl} from 'howler';
import * as Tone from 'tone';

// Import all samples
function importAll(r) {
  return r.keys().map(r);
}
const sampleLibrary = importAll(require.context('../../sounds/samples', false, /\.(mp3|wav)$/));
console.log(sampleLibrary);

// this.synth = new Tone.Synth().toDestination();
const SYNTH = new Tone.MonoSynth({
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

class Response extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      floatX: 0.5,
      floatY: 0.5,
      floatRot: 0.5,
    }
  }

  playSample = () => {
    this.sample.play();
  }

  playSynth = () => {
    this.stopSynth();
    SYNTH.triggerAttack(this.note, Tone.now());
    this.timeout = setTimeout(this.stopSynth,5000);
  }

  stopSynth = () => {
    SYNTH.triggerRelease(Tone.now());
    clearTimeout(this.timeout);
  }

  moveRandomly = () => {
    this.setState({
      floatX: Math.random(),
      floatY: Math.random(),
      floatRot: Math.random(),
    })
  }

  componentDidMount() {
    this.sample = new Howl({
      src: [sampleLibrary[Math.floor(this.props.response.sound * sampleLibrary.length)]],
    });

    const notes = [
      'Ab2','F2','C2','Bb2',
      'Ab3','F3','C3','Bb3',
      'Ab4','F4','C4','Bb4',
    ];

    this.note = notes[Math.floor(Math.random()*notes.length)];

    this.synthTimeout = null;

   

    setTimeout(this.moveRandomly,4000);
    this.interval = setInterval(this.moveRandomly,Math.random()*5000+3000);

    window.addEventListener('mouseup', this.stopSynth);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    window.removeEventListener('mouseup', this.stopSynth);

    // SYNTH.dispose();
  }

  render () {
    const {floatX, floatY, floatRot} = this.state;
    const {promptId, response, newParticipantEvent, soundMode} = this.props;
    return (
      <button 
        className="response" 
        style={{
          transform: `translate(calc(${(floatX*20-10)+(response.x * 80+10)}vw - 50%),calc(${(floatY*20-10)+(response.y * 80+10)}vh - 50%)) rotate(${floatRot*60-30}deg)`,
          fontSize: `${response.votes*.05+1}em`
        }}
        onMouseDown={() => {
          console.log(soundMode)
          if(soundMode==='sample') { this.playSample(); }
          if(soundMode==='synth') { this.playSynth(); }

          newParticipantEvent({
            type: 'promptResponseVote', 
            data: {
              promptId: promptId,
              responseId: response.id,
            }
          });
        }}
        // onMouseUp={() => {
        //   if(soundMode==='synth') { this.stopSynth(); }
        // }}
      >
        <span 
          className="-no-pointer"
          // style={{
          //   transform: `scale(${response.votes*.07+1})`
          // }}
        >
          {response.content}
        </span>
      </button>
    );
  }
}

export default class Prompter extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      currentResponse: '',
      submitted: false,
      error: '',
    }
  }

  handleChange = (event) => {
    const { value, maxLength } = event.target;
    const message = value.slice(0, maxLength);

    this.setState({currentResponse: message});
  }

  sendPromptResponse = (e) => {
    e.preventDefault();

    // Get the response
    const response = this.state.currentResponse;

    // Don't fire empty
    if (response==='') return;

    // Remove dirty words
    const filter = new Filter();
    const cleanResponse = filter.clean(response);

    if (cleanResponse !== response) {
      this.setState({
        currentResponse: cleanResponse,
        error: 'No profanity, please!'
      });
      return;
    }

    // Send response to server as participant event
    this.props.newParticipantEvent({
      type: 'promptResponse', 
      data: {
        promptId: this.props.id,
        response: {
          content: cleanResponse,
        }
      }
    })

    // Clear it
    this.setState({
      currentResponse: '',
      submitted: true,
    })
  }

  render () {
    // const {messages} = this.props;
    const {id, responses, prompt, placeholder, newParticipantEvent, soundMode, mode, visionSrc} = this.props;
    const {currentResponse, submitted, error} = this.state;
    const promptResponses = typeof responses[id] !== 'undefined' ? responses[id] : [];

    return (
      <React.Fragment>
        {visionSrc && 
          (
            <div 
              id="vision"  
              style={{
                backgroundImage: `url('${visionSrc}')`,
              }}
              key={visionSrc}
            />
          )
        }
        {(submitted || mode==='performer') && 
          (
            <div id="prompter-responses">
              {
                promptResponses.map((response,index) => {
                  return (
                    <Response 
                      promptId={id} 
                      response={response} 
                      newParticipantEvent={newParticipantEvent} 
                      key={`response-${response.id}`} 
                      soundMode={soundMode}
                    />
                  )
                })
              }
            </div>
          )
        }
        {(submitted && mode!=='performer') && 
          (
            <div className="layout-bottom -no-pointer">
              <p>Click other people's answers to ponder them.</p>
            </div> 
          )
        }
        {mode==='performer' && 
          (
            <div className="layout-bottom -no-pointer">
              <p className="-no-pointer">{prompt}</p>
            </div>
          )
        }
        {(!submitted && mode!=='performer') && 
          (
            <React.Fragment>
              <div className="layout-bottom">
                <p className="-no-pointer">{prompt}</p>
                <form id="prompt" onSubmit={this.sendPromptResponse}>
                  <input 
                    type="text" 
                    value={currentResponse} 
                    onChange={this.handleChange} 
                    placeholder={placeholder}
                    maxLength="50"
                  />
                  <input type="submit" value="Answer!"/>
                </form>
                  <p style={{color: 'red'}}>{error}</p>
              </div>
            </React.Fragment>
          )
        }
      </React.Fragment>
    );
  }
}