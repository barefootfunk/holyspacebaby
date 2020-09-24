import React from 'react';
import Filter from 'bad-words';

export default class Chat extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      currentMessage: '',
    }
  }

  handleChange = (event) => {
    this.setState({currentMessage: event.target.value});
  }

  sendChat = (e) => {
    e.preventDefault();

    // Get the message
    const message = this.state.currentMessage;

    // Don't fire empty
    if (message==='') return;

    // Remove dirty words
    const filter = new Filter();
    const cleanMessage = filter.clean(message);

    // Send message to server as participant event
    this.props.newParticipantEvent({
      type: 'message', 
      data: {
        message: cleanMessage,
      }
    })

    // Clear it
    this.setState({
      currentMessage: '',
    })
  }

  render () {
    const {messages} = this.props;
    const {currentMessage} = this.state;

    return (
      <React.Fragment>
        <form id="chat" onSubmit={this.sendChat}>
          <input type="text" value={currentMessage} onChange={this.handleChange} placeholder="Type to chat"/>
          <input type="submit" value="Send!"/>
        </form>
        <div id="chat-messages">
          {
            messages.map((message,index) => {
              return (<div className="message" key={index}>{message.message}</div>)
            })
          }
        </div>
      </React.Fragment>
    );
  }
}