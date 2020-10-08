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
const SYNTH = 
  typeof window !== `undefined` ? 
    new Tone.MonoSynth({
      "volume": 3,
      "detune": 0,
      "portamento": 0,
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
    }).toDestination() 
    : null;

class Response extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      floatX: 0.5,
      floatY: 0.5,
      floatRot: 0.5,
      touch: false,
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
      'D2','F#2','A2','E2',
      'D3','F#3','A3','E3',
      'D4','F#4','A4','E4',
    ];

    this.note = notes[Math.floor(Math.random()*notes.length)];

    this.synthTimeout = null;

   
    this.transitionIntervalTime = Math.random()*5000+3000;
    setTimeout(() => { this.moveRandomly(); this.interval = setInterval(this.moveRandomly,this.transitionIntervalTime);},5000);

    window.addEventListener('mouseup', this.stopSynth);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    window.removeEventListener('mouseup', this.stopSynth);

    // SYNTH.dispose();
  }

  startPonder() {
    if(this.props.soundMode==='sample') { this.playSample(); }
    if(this.props.soundMode==='synth') { this.playSynth(); }

    this.props.newParticipantEvent({
      type: 'promptResponseVote', 
      data: {
        promptId: this.props.promptId,
        responseId: this.props.response.id,
      }
    });
  }

  render () {
    const {floatX, floatY, floatRot} = this.state;
    const {response} = this.props;
    return (
      <span 
        className="response" 
        style={{
          transform: `translate(calc(${(floatX*20-10)+(response.x * 80+10)}vw - 50%),calc(${(floatY*20-10)+(response.y * 80+10)}vh - 50%)) rotate(${floatRot*60-30}deg)`,
          transition: `transform ${this.transitionIntervalTime-1000}ms linear, opacity 0.2s`,
          fontSize: `${response.votes*.05+1}em`,
        }}
      >
        <button 
          onMouseDown={() => {
            if(!this.state.touch) {
              this.startPonder();
            }
          }}
          onTouchStart={() => {

            // If first touch, let state know touch is enabled and remove mouseup events.
            if(!this.state.touch) {
              this.state.touch=true;
              this.setState({touch: true,})
              window.removeEventListener('mouseup', this.stopSynth);
              window.addEventListener('touchend', this.stopSynth);
            }
            this.startPonder();

          }}
          className=""
          // style={{
          //   transform: `scale(${response.votes*.07+1})`
          // }}
        >
          <span>{response.content}</span>
        </button>
      </span>
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
        error: `Can we avoid profanity for the younger participants? Try again!`
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
    const {id, responses, prompt, placeholder, newParticipantEvent, soundMode, mode, visionSrc, buttonText} = this.props;
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
        {(submitted && mode!=='performer') && 
          (
            <div className="layout-bottom -no-pointer">
              <p>{soundMode==='sample' ? "Click other answers to ponder." : "Click and HOLD other's answers."}</p>
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
              <div className={`layout-bottom prompt-box ${error && '-error'}`}>
                {error 
                  ? <p className='error -no-pointer'>{error}</p>
                  : <p className="-no-pointer">{prompt}</p>
                }
                <form id="prompt" onSubmit={this.sendPromptResponse}>
                  <input 
                    type="text" 
                    value={currentResponse} 
                    onChange={this.handleChange} 
                    placeholder={placeholder}
                    maxLength="100"
                  />
                  <input type="submit" value={buttonText}/>
                </form>
              </div>
            </React.Fragment>
          )
        }
      </React.Fragment>
    );
  }
}