import React from 'react';
import ClickSound from "./ClickSound.js"
import gulp1Sound from '../../sounds/gulp1.wav'; // https://freesound.org/people/CGEffex/sounds/102581/
import funkBottleImage from '../../img/funk-bottle.png';

export default class FunkBottle extends React.Component {
  render() {


    return (
      <div id="funk-bottle">
        <ClickSound sound={gulp1Sound} keyString="f">
          <button style={{backgroundImage: `url(${funkBottleImage})`}} />
        </ClickSound>
      </div>
    )
  }
}