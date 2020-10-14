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

    this.hats = [false, ...hatAssets];
    console.log(this.hats);
  }

  handleMouseMove = (e) => { 
    this.setState({ x: e.clientX, y: e.clientY });
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
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchstart', this.handleTouch);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('touchstart', this.handleTouch);
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
      </div>
    );
  }
}