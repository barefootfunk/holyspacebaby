import React from 'react';
import ClickSound from "./ClickSound.js"
import gulp1Sound from '../../sounds/gulp1.wav'; // https://freesound.org/people/CGEffex/sounds/102581/
import funkBottleImage from '../../img/funk-bottle.png';

export default class FunkBottle extends React.Component {
  render() {


    return (
      <div id="funk-bottle" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1, 
      }}>
        <ClickSound sound={gulp1Sound} keyString="f">
          <img src={funkBottleImage} className="-no-pointer" />
        </ClickSound>
      </div>
    )
  }
}