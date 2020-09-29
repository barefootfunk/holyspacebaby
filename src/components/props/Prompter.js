import React from 'react';
import Filter from 'bad-words';

export default class Prompter extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      currentResponse: '',
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
    })
  }

  render () {
    // const {messages} = this.props;
    const {id, responses, prompt, placeholder} = this.props;
    const {currentResponse} = this.state;
    console.log('responses',responses)
    console.log('id',id)
    console.log('responses[id]',responses[id])
    const promptResponses = typeof responses[id] !== 'undefined' ? responses[id] : [];
    console.log('promptResponses',promptResponses)
    return (
      <React.Fragment>

        <div className="layout-center">
          <p>{prompt}</p>
          <form id="prompt" onSubmit={this.sendPromptResponse}>
            <input 
              type="text" 
              value={currentResponse} 
              onChange={this.handleChange} 
              placeholder={placeholder}
              maxLength="50"
            />
            <input type="submit" value="Send!"/>
          </form>
        </div>
        <div id="prompter-responses">
          {
            promptResponses.map((response,index) => {
              return (
                <div 
                  className="response" 
                  key={`response-${response.id}`} 
                  onClick={() => {
                    this.props.newParticipantEvent({
                      type: 'promptResponseVote', 
                      data: {
                        promptId: id,
                        responseId: response.id,
                      }
                    })
                  }}
                >
                  {response.content} ({response.votes})
                </div>
                )
            })
          }
        </div>
      </React.Fragment>
    );
  }
}