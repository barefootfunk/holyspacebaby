import React from 'react';
import zombieImage from '../../img/zombie.gif';
import heartImage from '../../img/heart.webp';

export default class GroupClicky extends React.Component {

  // constructor (props) {
  //   super(props);

  //   this.state = {
  //     clicks: null,
  //   }
  // }

  
  render () {
    const {newParticipantEvent, clickyId, clicky, participants} = this.props;
    const clicks = clicky.clickers.length;
    const triggered = clicky.triggered;
    const percentage = clicks/Object.keys(participants).length;

    return (
      <div 
        style={{
          background: `radial-gradient(black 0%, transparent 70%)`,
          position: 'fixed',
          transform: `translate(-50%,-50%)`,
          top: `${clicky.y*80+10}vh`,
          left: `${clicky.x*80+10}vw`,
        }}
      >
        <button 
          onClick={()=>{
            newParticipantEvent({
              type: 'groupClickyClick', 
              data: {
                clickyId: clickyId,
              }
            })
          }}
          style={{
            transform: triggered ? 'scale(0.3)' : `scale(${1-percentage})`,
            transition: 'transform 0.1s',
            backgroundColor: 'transparent',
            backgroundImage: `url(${ triggered ? heartImage:zombieImage})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            border: 0,
            outline: 0,
            width: 150,
            height: 150,
          }}
        />
      </div>
    );
  }
}