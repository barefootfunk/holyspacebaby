import React from 'react';
import Countdown from 'react-countdown';

export default class NextShow extends React.Component {
  renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <span>The next ceremony begins any moment...</span>;
    } else {
      // Render a countdown
      return <span>The next ceremony begins in {days}:{hours}:{minutes}:{seconds}</span>;
    }
  };
  render() {
    const showDate='Sep 17 2020 07:00:00 EST';
    return <Countdown
        date={showDate}
        renderer={this.renderer}
    />
  }
}