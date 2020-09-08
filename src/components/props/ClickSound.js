import React from 'react';
import {Howl} from 'howler';

export class ClickSound extends React.Component {
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
    const { children } = this.props;

    return (
      <div className="click-sound" onClick={this.playSound}>
        {children}
      </div>
    );
  }
}

export default ClickSound;