import React from 'react';
import Countdown from 'react-countdown';
import { DateTime } from 'luxon';

export default class NextShow extends React.Component {
  renderer = ({ days, hours, minutes, seconds, completed }) => {
    function twoDigits(n){
      return (n < 10 ? "0" : "") + n;
    }

    if (completed) {
      // Render a completed state
      return <span id="show-countdown">Now!</span>;
    } else {

      // Render a countdown
      return <span id="show-countdown">{minutes}:{twoDigits(seconds)}</span>;
    }
  };
  render() {
    const showDate = DateTime.local().endOf('hour').toISO();
    console.log(showDate);
    return <Countdown
        date={showDate}
        renderer={this.renderer}
    />
  }
}