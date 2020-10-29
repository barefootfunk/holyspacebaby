import React from 'react';
import zombieImage1 from '../../img/zombie1.gif';
import zombieImage2 from '../../img/zombie2.gif';
import zombieImage3 from '../../img/zombie3.gif';
import zombieImage4 from '../../img/zombie4.gif';
import zombieImage5 from '../../img/zombie5.gif';
import curedImage1 from '../../img/cured1.gif';
import curedImage2 from '../../img/cured2.gif';
import curedImage3 from '../../img/cured3.gif';
import curedImage4 from '../../img/cured4.gif';
import curedImage5 from '../../img/cured5.gif';

const zombieImages = [zombieImage1,zombieImage2,zombieImage3,zombieImage4,zombieImage5]
const curedImages = [curedImage1,curedImage2,curedImage3,curedImage4,curedImage5]

export default class GroupClicky extends React.Component {

  // constructor (props) {
  //   super(props);

  //   this.state = {
  //     clicks: null,
  //   }
  // }

  
  render () {
    const {newParticipantEvent, clickyId, clicky} = this.props;
    const {triggered, percentage, image} = clicky;
    

    return (
      <div 
        style={{
          background: `radial-gradient(black 0%, transparent 70%)`,
          position: 'fixed',
          transform: `translate(-50%,-50%)`,
          top: `${clicky.y*80+10}vh`,
          left: `${clicky.x*80+10}vw`,
          pointerEvents: triggered ? 'none' : 'auto',
        }}
        key={clickyId}
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
            transform: triggered ? 'scale(0.9)' : `scale(${1-percentage})`,
            transition: 'transform 0.1s',
            backgroundColor: 'transparent',
            backgroundImage: `url(${ triggered ? curedImages[image]:zombieImages[image]})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            border: 0,
            outline: 0,
            width: 150,
            height: 150,
            color: 'white',
            curosr: 'pointer',
          }}
        />
          <span 
          style={{
            fontSize: '0.5em',
            position: 'absolute',
            bottom: '40%',
            left: '40%',
            background: 'black',
            border: '1px solid white',
            padding: '0.2em'
          }}>{triggered ? 'CURED!': `${100*clicky.percentage}% cured`}</span>
      </div>
    );
  }
}