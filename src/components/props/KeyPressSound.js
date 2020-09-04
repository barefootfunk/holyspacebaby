import React from 'react';
import {Howl} from 'howler';

// TODO: Mobile fallback (print key to screen)

export class KeyPressSound extends React.Component {
  constructor(props) {
    super(props);

    this.sound = new Howl({
      src: [this.props.sound],
    });
  }

  handleKeyDown = (event) => {
    if(event.key === this.props.keyString){
      this.playSound();
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  playSound = () => {
    console.log('Playing sound!');
    this.sound.play();
  }

  render () {

    return (
      <div className="key-press-sound"></div>
    );
  }
}

export default KeyPressSound;