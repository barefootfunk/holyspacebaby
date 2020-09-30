import React from 'react';

export class VideoBg extends React.Component {
  constructor(props) {
    super(props);
    this.mp4 = this.props.srcs[Math.floor(Math.random()*this.props.srcs.length)];
  }

  // componentDidMount () {
  //   this.mp4 = this.props.srcs[Math.floor(Math.random()*this.props.srcs.length)];
  // }

  // componentDidUpdate () {
  //   this.mp4 = this.props.srcs[Math.floor(Math.random()*this.props.srcs.length)];
  // }

  render () {
    return (
      <video id="bg-video" className="bg-video" playsInline autoPlay muted loop key={this.mp4} style={this.props.style}>
        <source src={`/videos/${this.mp4}`} type="video/mp4" />
      </video>
    );
  }
}

export default VideoBg;