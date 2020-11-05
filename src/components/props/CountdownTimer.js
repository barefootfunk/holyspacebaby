import React from 'react';
import Countdown from 'react-countdown';
import { DateTime } from 'luxon';

export default class CountdownTimer extends React.Component {
  constructor(props) {
    super(props);

    this.showDate = DateTime.local().endOf('hour').plus({minutes: 2}).toISO(); // Next hour + 2min
  }
  renderer = ({ days, hours, minutes, seconds, completed }) => {
    function twoDigits(n){
      return (n < 10 ? "0" : "") + n;
    }

    if (completed || minutes > 10) { // If +10 minutes, the clock likely rolled over somehow.
      // Render a completed state
      return '' // <span id="show-countdown">Now!</span>;
    } else {

      // Render a countdown
      return <span id="show-countdown">{minutes}:{twoDigits(seconds)}</span>;
    }
  };
  render() {
    return <Countdown
      date={this.showDate}
      renderer={this.renderer}
    />
  }
}