import React from 'react';

// Socket 
import SockJS from 'sockjs-client';

// Show
import Show from "./Show"

// Twitch
const ReactTwitchEmbedVideo = typeof window !== `undefined` ? require("react-twitch-embed-video") : null

class Stage extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      scene: 0,
      connected: false,
      teleprompter
    };

    this.SOCKET_URL = "https://socket.theonetruefaith.org/director";
    this.sock = null;
  }

  componentDidMount () {
    this.initSocket()
  }

  initSocket = () => {
    console.log('Connecting to The Director...');

    // Create connection
    this.sock = new SockJS(this.SOCKET_URL);

    // Handle things
    this.sock.onopen = this.handleSocketOpen.bind(this);
    this.sock.onmessage = this.handleSocketMessage.bind(this);
    this.sock.onclose = this.handleSocketClose.bind(this);
  }

  handleSocketOpen () {
    console.log('Successfully connected.');
    this.setState({
      connected: true,
    });
  }

  handleSocketClose () {
    // On close, try to reopen!
    this.setState({
      connected: false,
    });
    setTimeout(this.initSocket, 400);
  }

  handleSocketMessage (e) {
    // Get the content
    const message = JSON.parse(e.data);
    // console.log('A message from The Director:');
    // console.log(message);
    const {type,data} = message;

    if (type ==="updateParticipantState") this.updateParticipantState(data);
  }

  updateParticipantState (newState) {
    // merge in new state
    newState = {
      ...this.state,
      ...newState,
    }

    // Update the state
    this.setState(newState);
  }

  updateDirectorState (newState) {
    this.sendMessage('updateDirectorState',newState)
  }

  decrementSceneGlobal () {
    const newScene = this.state.scene-1; //Math.max(this.state.scene-1,0);
    // console.log(`Decrementing scene ${this.state.scene} to ${newScene}.`);
    this.updateDirectorState({ scene: newScene });
  }

  incrementSceneGlobal () {
    const newScene = this.state.scene+1; //Math.min(this.state.scene+1,this.scenes.length-1);
    // console.log(`Incrementing scene ${this.state.scene} to ${newScene}.`);
    this.updateDirectorState({ scene: newScene });
  }

  get password () {
    // We'll send a password in our message to the query string
    const search = window.location.search;
    const params = new URLSearchParams(search);
    return params.get('password');
  }

  sendMessage(type,data) {
    // The message to send
    const message = {
      type: type,
      password: this.password,
      data: data,
    };

    console.log('Sending a message to The Director...');
    console.log(message);

    // Send it
    this.sock.send(JSON.stringify(message));
  }

  render () {
    const {scene, connected} = this.state;
    const performer = this.props.location.pathname==='/performer';
    console.log(location);

    return (
      <div id="stage">

        <Show scene={scene} performer={performer}/>

        {!connected && <div className="connecting-alert">Connecting... {/* https://www.davidhu.io/react-spinners/ */}</div>}
      </div>
    );
  }
}

export default Stage;