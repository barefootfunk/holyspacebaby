import React from 'react';

import { ReactComponent as SpaceBabeSvg } from "../../images/space-babe.svg"
import Vision from "./visions/Vision.js"

// Controls
import Teleprompter from "../controls/Teleprompter.js"

// TODO: Abstract out to a USER MOVEMENT CLASS
export class Scene extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      x: 0, 
      y: 0,
      width: 0,
      height: 0,
    };
  }

  handleMouseMove(e) {
    const { width, height } = this.state;
    let normX = e.clientX / width;
    let normY = e.clientY / height;
    // console.log (e);
    this.setState({ x: normX, y: normY });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
    window.removeEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  updateWindowDimensions() {
    const dims = { width: window.innerWidth, height: window.innerHeight }
    this.setState(dims);
    // console.log(dims);
  }

  render () {
    const { x, y } = this.state;
    // console.log(this.state)
    return (
      <div id="visions-scene" 
        style={{
          "--x": x,
          "--y": y,
        }}
      >

        <video id="campfire" className="bg-video" playsInline autoPlay muted loop>
          <source src="/videos/projector/space.mp4" type="video/mp4" />
        </video>

        <div id="space-babe">
          <div className="center-wrap">
            <SpaceBabeSvg />
          </div>
        </div>

        <Vision
          imageUrl="https://www.fillmurray.com/700/300"
          description="Bill Murray stares back at you, but his eyes are a sightless collection of pixels."
        />
        <Vision
          imageUrl="https://www.fillmurray.com/g/400/400"
          description="Grayscale Bill Murray just isn't feeling himself."
        />
        <Vision
          imageUrl="https://www.fillmurray.com/300/800"
          description="This is not Bill Murray."
        />
        <Vision
          imageUrl="https://www.fillmurray.com/500/500"
          description="This is Bill Murray.  All the other Bill Murrays are a lie. Do not believe them.  You are in grave danger."
        />
        <Vision
          imageUrl="https://www.fillmurray.com/100/100"
          description="Pixelated Bill Murray."
        />

        {this.props.teleprompter && (
          <Teleprompter>
            {this.props.teleprompter}
          </Teleprompter>
        )}

        {this.props.children}

      </div>
    );
  }
}

export default Scene;