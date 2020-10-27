import React from 'react';

export default class Chat extends React.Component {

  componentDidMount() {
    this.delay = Math.random();
  }

  render () {
    const {participants, participantId} = this.props;
    console.log(participants);

    return (
        <div id="fireflies">
          {participants && Object.keys(participants).map((key,index) => {
            const participant = participants[key];
            return (
              <div 
                className={`firefly ${participant.id === participantId ? '-user' : ''}`} 
                style={{
                  transform: `translate(${participant.x*100}vw,${participant.y*100}vh)`,
                  animationDelay: `${(index%10)*0.1}s`,
                  background: `radial-gradient(${participant.color} 0%, transparent 70%)`
                }}
              >
              </div>
            );
          })}
        </div>
    );
  }
}