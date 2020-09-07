import React from 'react';

// Controls
import Teleprompter from "../controls/Teleprompter.js"

export class Scene extends React.Component {

  componentDidMount() {
    this.swapBgVideos()
    this.styleLivestream()
  }

  componentDidUpdate() {
    this.swapBgVideos()
    this.styleLivestream()
  }

  swapBgVideos() {
    const {bgVideo,bgVideoOverlay} = this.props;

    // this.swapVideo('bg-video-overlay',bgVideoOverlay);
    this.swapVideo('bg-video',bgVideo);
  }

  swapVideo(id,newSrc) {
    const videoEl = document.getElementById(id);

    if (!videoEl.src.includes(`videos/${newSrc}.mp4`)){
      videoEl.pause();
      videoEl.src = `/videos/${newSrc}.mp4`;
      videoEl.play();
    }
  }

  styleLivestream() {
    const livestreamEl = document.getElementById('livestream');
    livestreamEl.className = '';

    const { livestream } = this.props;
    if (livestream) {
      livestreamEl.classList.add(livestream);
    }
  }

  render () {
    const {name,children} = this.props;

    // TODO: style scene name
    return (
      <div id={`scene-${name}`} className="scene">
        <div className="scene-name">{name}</div>

        {children}

      </div>
    );
  }
}

export default Scene;