import React from 'react';

// Socket 
import io from "socket.io-client";

// Show
import Show from "./Scenes"

// Utils
import {initAmplitude, sendAmplitudeData} from './utilities/amplitude';
import isDev from "./utilities/DevDetect";

let SOCKET_URL = 'https://holyspacebaby-server.herokuapp.com/'; 
if (isDev()) {
  SOCKET_URL = 'http://localhost:3000';
}

export default class Stage extends React.Component {

  constructor (props) {
    
    super(props);

    this.state = {
      scene: 0,
      connected: false,
      activeParticipantCount: 0,
      rehearsal: false,
      messages: [],
      responses: {},
      participantId: null,
      groupClickies: {},
      tugOfWars: {},
      cake: {
        percentage: .98,
      },
      coloringBook: {},
      darkWall: {},
      linesToDraw: [],
    };
  }
  
  componentDidMount () {
    initAmplitude();
    console.log('mode',this.props.mode);
    sendAmplitudeData('join', {mode: this.props.mode}); 
    console.log(`SOCKET: will try server ${SOCKET_URL}`);
    

    this.socket = io(SOCKET_URL, {
      'reconnection': true,
      'reconnectionDelay': 500,
      'reconnectionDelayMax' : 1000,
    });

    // Socket lifecycle reporting
    this.socket.on('connect', () => { 
      console.log(`SOCKET: connected to ${SOCKET_URL}`);
      this.setState({connected: this.socket.connected, participantId: this.socket.id}) 
      this.newParticipantEvent({
        type:'updateParticipant',
        data: {
          mode: this.props.mode,
        }
      });
    });
    this.socket.on('reconnect', () => { 
      console.log('SOCKET: reconnect');
      this.setState({connected: this.socket.connected, participantId: this.socket.id}) 
    });
    this.socket.on('connecting', () => { 
      console.log('SOCKET: connecting');
      this.setState({connected: this.socket.connected}) 
    });
    this.socket.on('reconnectrng', () => { 
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
    this.socket.emit('updateDirectorState', newState);
  }

  newParticipantEvent = (event) => {
    this.socket.emit('newParticipantEvent', event);
  }

  // get password () {
  //   // We'll send a password in our message to the query string
  //   const search = window.location.search;
  //   const params = new URLSearchParams(search);
  //   return params.get('password');
  // }


  render () {
    const {scene, connected, activeParticipantCount, messages, responses, rehearsal} = this.state;
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
              <div className="small-buttons">
                <button className={rehearsal?'-on':'-off'} onClick={() => {this.updateDirectorState({rehearsal: !rehearsal})}}>Rehearsing</button><br/>
                {/* <button
                  onClick={() => {this.updateDirectorState({
                    cake: {
                      percentage: 0.98,
                    },
                    coloringBook: {},
                  })}}>Defrost Cake</button><br/> */}
                <button onClick={() => { this.newParticipantEvent({type: 'groupClickyAdd'}) }}>Atom</button><br/>
                <button onClick={() => { this.newParticipantEvent({type: 'clearGroupClickies'}) }}>Clear Atoms</button><br/>
                {/* <button onClick={() => { this.newParticipantEvent({type: 'clearTugOfWars'}) }}>Clear Tug</button> */}
              </div>
            </div>
            <div id="participant-stats">{activeParticipantCount}</div>
          </React.Fragment>
        )}

        {rehearsal && <div id="rehearsing-alert">Currently practicing/testing!</div>}

        {!connected && <div className="connecting-alert">Connecting...</div>}
      </div>
    );
  }
}