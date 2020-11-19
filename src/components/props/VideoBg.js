import React from 'react';

export class VideoBg extends React.Component {
  constructor(props) {
    super(props);
    this.source = this.props.srcs[Math.floor(Math.random()*this.props.srcs.length)];
    this.isImage = this.source.includes('.gif');
  }

  // componentDidMount () {
  //   this.source = this.props.srcs[Math.floor(Math.random()*this.props.srcs.length)];
  // }

  // componentDidUpdate () {
  //   this.source = this.props.srcs[Math.floor(Math.random()*this.props.srcs.length)];
  // }

  render () {
    return (
      <React.Fragment>
        {this.isImage ? 
          (
            <div className={`bg-video bg-video--image ${this.props.classes}`}
              style = {{
                backgroundImage : `url('/img/${this.source}')`,
              }} />
          )
          :
          (
            <video className={`bg-video ${this.props.classes}`} playsInline autoPlay muted loop key={this.source} style={this.props.style}>
              <source src={`/videos/${this.source}`} type="video/mp4" />
            </video>
          )
        }
      </React.Fragment>
    );
  }
}

export default VideoBg;