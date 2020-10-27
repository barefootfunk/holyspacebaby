import React from 'react';

// Socket 
import io from "socket.io-client";

// Show
import Show from "./Scenes"

// Amplitude
import {initAmplitude, sendAmplitudeData} from './utilities/amplitude';

const SOCKET_URL = 'https://holyspacebaby-server.herokuapp.com/'; 
// const SOCKET_URL = 'http://localhost:3000';

export default class Stage extends React.Component {

  constructor (props) {
    
    super(props);

    this.state = {
      scene: 0,
      connected: false,
      participantCount: 0,
      rehearsal: false,
      messages: [],
      responses: {},
      participantId: null,
    };

  }

  componentDidMount () {
    initAmplitude();
    console.log('mode',this.props.mode);
    sendAmplitudeData('join', {mode: this.props.mode}); 
    
    this.socket = io(SOCKET_URL, {
      'reconnection': true,
      'reconnectionDelay': 500,
      'reconnectionDelayMax' : 1000,
    });

    // Socket lifecycle reporting
    this.socket.on('connect', () => { 
      console.log('SOCKET: connected');
      this.setState({connected: this.socket.connected, participantId: this.socket.id}) 
    });
    this.socket.on('reconnect', () => { 
      console.log('SOCKET: reconnect');
      this.setState({connected: this.socket.connected, participantId: this.socket.id}) 
    });
    this.socket.on('connecting', () => { 
      console.log('SOCKET: connecting');
      this.setState({connected: this.socket.connected}) 
    });
    this.socket.on('reconnecting', () => { 
      console.log('SOCKET: reconnecting');
      this.setState({connected: this.socket.connected}) 
    });
    this.socket.on('connect_failed', () => { 
      console.log('SOCKET: connect failed');
      this.setState({connected: this.socket.connected}) 
    });
    this.socket.on('reconnect_failed', () => { 
      console.log('SOCKET: reconnect failed');
      this.setState({connected: this.socket.connected}) 
    });
    this.socket.on('close', () => { 
      console.log('SOCKET: close');
      this.setState({connected: this.socket.connected}) 
    });
    this.socket.on('disconnect', () => { 
      console.log('SOCKET: disconnect');
      this.setState({connected: this.socket.connected}) 
    });

    // HolySpaceBaby specific events
    this.socket.on('updateParticipantState', (newState) => {
      // console.log('SOCKET: updateParticipantState',newState);
      this.setState(newState);
    });

    let messageId=0;
    this.socket.on('broadcastParticipantEvent', (event) => {
      // console.log('SOCKET: broadcastParticipantEvent',event);
      if(event.type==='message') {
        const maxMessages = 50;
        const messages = this.state.messages;
        const trimmedMessages = 
          messages.length > maxMessages 
            ? messages.slice(1)
            : messages;

        const newMessage = event.data;
        newMessage.id = messageId;
        messageId++;
        this.setState({ messages: [...trimmedMessages, newMessage] })
      }
    });
  }

  updateDirectorState = (newState) => {
    console.log('Attempting updateDirectorState', newState)
    this.socket.emit('updateDirectorState', newState);
  }

  newParticipantEvent = (event) => {
    console.log('Attempting newParticipantEvent', event)
    this.socket.emit('newParticipantEvent', event);
  }

  // get password () {
  //   // We'll send a password in our message to the query string
  //   const search = window.location.search;
  //   const params = new URLSearchParams(search);
  //   return params.get('password');
  // }


  render () {
    const {scene, connected, participantCount, messages, responses, rehearsal} = this.state;
    const {mode} = this.props;

    return (
      <div id="stage">

        <Show scene={scene} mode={mode} newParticipantEvent={this.newParticipantEvent} directorState={this.state} messages={messages} responses={responses}/>

        {mode==="performer" && (
          <React.Fragment>
            <div id="scene-controls">
              <button id="prev-scene" onClick={() => {this.updateDirectorState({scene: scene-1})}}>Prev</button>
              <div id="scene-number">{scene}</div>
              <button id="next-scene" onClick={() => {this.updateDirectorState({scene: scene+1})}}>Next</button>

              <button id="rehearsal-button" className={rehearsal?'-on':'-off'} onClick={() => {this.updateDirectorState({rehearsal: !rehearsal})}}>Reh</button>
            </div>
            <div id="participant-stats">{participantCount}</div>
          </React.Fragment>
        )}


        {rehearsal && <div id="rehearsing-alert">Currently practicing/rehearsing!<br/>Feel free to hang/watch.</div>}

        {!connected && <div className="connecting-alert">Connecting...</div>}
      </div>
    );
  }
}