import React from 'react';
import zombieImage1 from '../../img/zombie/zombie1.gif';
import zombieImage2 from '../../img/zombie/zombie2.gif';
import zombieImage3 from '../../img/zombie/zombie3.gif';
import zombieImage4 from '../../img/zombie/zombie4.gif';
import zombieImage5 from '../../img/zombie/zombie5.gif';
import curedImage1 from '../../img/zombie/cured1.gif';
import curedImage2 from '../../img/zombie/cured2.gif';
import curedImage3 from '../../img/zombie/cured3.gif';
import curedImage4 from '../../img/zombie/cured4.gif';
import curedImage5 from '../../img/zombie/cured5.gif';

const zombieImages = [zombieImage1,zombieImage2,zombieImage3,zombieImage4,zombieImage5]
const curedImages = [curedImage1,curedImage2,curedImage3,curedImage4,curedImage5]

// Import all samples
function importAll(r) {
  return r.keys().map(r);
}
const sampleLibrary = importAll(require.context('../../sounds/samples', false, /\.(mp3|wav)$/));

export default class GroupClicky extends React.Component {

  constructor (props) {
    super(props);

    this.oldPercentage = this.props.clicky.percentage;
    this.percentageChangingTimeout = null;
    this.state = {
      percentageChanging: false,
      percentageChange: false,
    }
  }

  componentWillUpdate() {
    if (!this.props.clicky.triggered) {
      if (this.oldPercentage !== this.props.clicky.percentage) {
        this.state.percentageChanging =  true
        this.state.percentageChange = this.props.clicky.percentage - this.oldPercentage;

        this.oldPercentage = this.props.clicky.percentage;
        this.percentageChangingTimout = setTimeout(() => {
          this.setState({percentageChanging: false})
        },50)
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.percentageChangingTimeout);
  }

  // function createLine(zombieX,zombieY, centerX,centerY){
  //   var length = Math.sqrt((zombieX-centerX)*(zombieX-centerX) + (zombieY-y2)*(zombieY-y2));
  //   var angle  = Math.atan2(y2 - zombieY, centerX - zombieX) * 180 / Math.PI;
  //   var transform = 'rotate('+angle+'deg)';

  //     var line = $('<div>')
  //         .appendTo('#page')
  //         .addClass('line')
  //         .css({
  //           'position': 'absolute',
  //           'transform': transform
  //         })
  //         .width(length)
  //         .offset({left: zombieX, top: zombieY});

  //     return line;
  // }

  render () {
    const {newParticipantEvent, clickyId, clicky} = this.props;
    const {triggered, percentage, image, firing} = clicky;
    const {percentageChanging, percentageChange} = this.state;

    const zombieY = clicky.y<0.5 ? clicky.y*.25+.10 : clicky.y*.25+.65;
    const zombieX = clicky.x*0.8+.1;
    const centerX = 0.5;
    const centerY = 0.5;
    
    return (
      <React.Fragment>
        <div 
          style={{
            background: `radial-gradient(${percentageChanging ? (percentageChange>0 ? 'white' : 'red' ): 'black'} 0%, transparent 70%)`,
            position: 'fixed',
            transform: `translate(-50%,-50%)`,
            top: `${zombieY*100}vh`,
            left: `${zombieX*100}vw`,
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
                bottom: '10%',
                left: '40%',
                background: 'black',
                border: '1px solid white',
                padding: '0.2em 0.2em 0.1em',
                pointerEvents: 'none',
              }}
            >{triggered ? 'CURED!': `${(100*clicky.percentage).toFixed(4)}% cured`}</span>
        </div>

        {firing && <div 
        style={{
          transform: `rotate(${Math.atan2(centerY*window.innerHeight - zombieY*window.innerHeight, centerX*window.innerWidth - zombieX*window.innerWidth) * 180 / Math.PI}deg)`,
          width: `${Math.sqrt((zombieX*window.innerWidth-centerX*window.innerWidth)*(zombieX*window.innerWidth-centerX*window.innerWidth) + (zombieY*window.innerHeight-centerY*window.innerHeight)*(zombieY*window.innerHeight-centerY*window.innerHeight))}px`,
          left: `${zombieX*100}vw`, 
          top: `calc( ${zombieY*100}vh - 30px )`,
          position: `fixed`,
          background: 'linear-gradient(to top, transparent 0%, red 50%, transparent 100%)',
          transformOrigin: '0% 0%',
          height: 10,
          animation: 'flicker 0.1s infinite alternate',
        }}
        />}
      </React.Fragment>
    );
  }
}