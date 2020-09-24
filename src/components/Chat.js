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
    const { value, maxLength } = event.target;
    const message = value.slice(0, maxLength);

    this.setState({currentMessage: message});
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
        color: this.props.color,
        destinationX: Math.random(),
        destinationY: Math.random(),
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
        <div id="chat-messages">
          {
            messages.map((message,index) => {
              return (
                <div 
                  className="message" 
                  key={`message-${message.id}`} 
                  id={`message-${message.id}`} 
                  style={{
                    color: message.color,
                    transform: `translate(-${message.destinationX*200}vw,-${message.destinationY*100+100}vh)`,
                  }}
                >
                  {message.message}
                </div>
                )
            })
          }
        </div>
        <form id="chat" onSubmit={this.sendChat}>
          <input 
            type="text" 
            value={currentMessage} 
            onChange={this.handleChange} 
            placeholder="Type to chat (anonymous)"
            maxLength="30"
          />
          <input type="submit" value="Send!"/>
        </form>
      </React.Fragment>
    );
  }
}