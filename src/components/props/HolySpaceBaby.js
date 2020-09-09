import React from 'react';
import HolySpaceBabySvg from "../../svg/holy-space-baby.inline.svg"

// Sounds
import KeyPressSound from "./KeyPressSound.js"
import cry1Sound from '../../sounds/cry1.wav';


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
    };
  }

  handleMouseMove = (e) => { 
    this.setState({ x: e.clientX, y: e.clientY });
  }


  updateWindowDimensions = () => {
    const dims = { width: window.innerWidth, height: window.innerHeight }
    this.setState(dims);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    window.addEventListener('mousemove', this.handleMouseMove);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    window.removeEventListener('mousemove', this.handleMouseMove);
  }


  render () {
    const { x, y } = this.state;
    const { babyClass, babyColor } = this.props;
    return (
      <div 
        id="space-babe" 
        style={{
          top: y,
          left: x,
          '--custom-color': babyColor,
        }}
        className={babyClass}
      >
        <div className="center-wrap">
          <KeyPressSound sound={cry1Sound} keyString="f" />
          <HolySpaceBabySvg />
          {/* TODO: Text: Tap or use the mouse to control the babe. Press F to cry.*/}
        </div>
      </div>
    );
  }
}