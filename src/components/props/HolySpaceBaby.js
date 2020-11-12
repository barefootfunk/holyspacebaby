import React from 'react';
import HolySpaceBabySvg from "../../svg/holy-space-baby.inline.svg"


// Import all hats
function importAll(r) {
  return r.keys().map(r);
}
const hatAssets = importAll(require.context('../../img/hats', false, /\.(png)$/));

// TODO: Mobile fallback (animate transition between taps)
// ANIMATE WITH: https://github.com/chenglou/react-motion
// COPY THIS PATTERN: http://chenglou.github.io/react-motion/demos/demo1-chat-heads/

export default class HolySpaceBaby extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      x: 0, 
      y: 0,
      width: 0,
      height: 0,
      touch: false,
    };

    this.inactiveTicks = 0;

    this.hats = [false, ...hatAssets];
    // console.log(this.hats);
  }

  handleMouseMove = (e) => { 
    this.setState({ x: e.clientX, y: e.clientY });
    this.hasChanged = true;
  }

  updateWindowDimensions = () => {
    const dims = { width: window.innerWidth, height: window.innerHeight }
    this.setState(dims);
  }

  handleTouch = (e) => {
    if(!this.state.touch) {
      window.removeEventListener('mousemove', this.handleMouseMove);
    }
    this.setState({
      touch: true,
      x: e.touches[0].clientX, y: e.touches[0].clientY,
    });
    this.hasChanged = true;
  }

  updateParticipant = () => {
    if(this.hasChanged) {
      this.inactiveTicks = 0;
    } else {
      this.inactiveTicks++;
    }
    // Reset hasChanged
    this.hasChanged = false;
    // console.log(this.inactiveTicks);

    this.props.newParticipantEvent({
      type:'updateParticipant',
      data: {
        x: this.state.x/this.state.width,
        y: this.state.y/this.state.height,
        color: this.props.color,
        inactive: this.inactiveTicks>60, // Flag inactive if hasn't moved in 30s
      }
    });
  }

  sendClick = () => {
    this.props.newParticipantEvent({
      type:'participantClick',
    });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    window.addEventListener('click', this.sendClick);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchstart', this.handleTouch);

    this.fireflyInterval = setInterval(this.updateParticipant, 500)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    window.removeEventListener('click', this.sendClick);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('touchstart', this.handleTouch);
    clearInterval(this.fireflyInterval)
  }

  render () {
    const { x, y, touch } = this.state;
    const { babyClass, hatNumber } = this.props;
    const currentHat = this.hats[hatNumber % this.hats.length];

    return (
      <div 
        id="holy-space-baby" 
        style={{
          transform: `translate(${x}px,${y}px)`,
          transition: touch ? 'transform 0.2s ease-out, width 0.2s, height 0.2s': 'width 0.2s, height 0.2s', 
        }}
        className={babyClass}
      >
        <div className="center-wrap">
          <div className="spin-wrap">
            {currentHat && <div className="hat" style={{ backgroundImage: `url(${currentHat})`}}/>}
            <HolySpaceBabySvg />
          </div>
        </div>
        {console.log('HolySpaceBaby',this.props.color)}

      </div>
    );
  }
}