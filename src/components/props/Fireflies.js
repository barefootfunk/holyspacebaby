import React from 'react';

export default class Fireflies extends React.Component {

  componentDidMount() {
    this.delay = Math.random();
  }

  render () {
    const {participants, participantId} = this.props;
    // console.log(participants);

    return (
        <div id="fireflies">
          {participants && Object.keys(participants).map((key,index) => {
            const participant = participants[key];
            return (
              <div 
                key={key}
                className={`firefly ${participant.id === participantId ? '-user' : ''} ${participant.mode==='performer' ? '-performer' : ''} ${participant.inactive ? '-inactive' : ''}`} 
                style={{
                  transform: `translate(${participant.x*100}vw,${participant.y*100}vh)`,
                }}
              >
                <div className='light' style={{
                  animationDelay: `${(index%10)*0.1}s`,
                  background: `radial-gradient(${participant.color} 0%, ${participant.color} 25%, transparent 70%)`
                }} />
              </div>
            );
          })}
        </div>
    );
  }
}