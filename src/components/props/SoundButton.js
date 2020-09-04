import React from 'react';
import {Howl, Howler} from 'howler';

export class SoundButton extends React.Component {
  constructor(props) {
    super(props);

    this.sound = new Howl({
      src: [this.props.sound],
    });
  }

  playSound = () => {
    this.sound.play();
  }

  render () {
    const { text } = this.props;

    return (
      <div className="sound-button">
        <button onClick={this.playSound}>{text}</button>
      </div>
    );
  }
}

export default SoundButton;