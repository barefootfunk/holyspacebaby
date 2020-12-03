import React from 'react';

import dumpTruck from '../../img/pomplo/dumptruck.png';
import fireTruck from '../../img/pomplo/firetruck.png';

export default class Pomplo extends React.Component {

  constructor (props) {
    super(props);
    this.randomTimeout = null;
    // this.oldPercentage = this.props.directorState.pomplo.percentage;
    // this.percentageChangingTimeout = null;
    this.state = {
      percentage: 1,
    }
  }

  // componentWillUpdate() {
  //   if (!this.props.directorState.pomplo.triggered) {
  //     if (this.oldPercentage !== this.props.directorState.pomplo.percentage) {
  //       this.state.percentageChanging =  true
  //       this.state.percentageChange = this.props.directorState.pomplo.percentage - this.oldPercentage;

  //       this.oldPercentage = this.props.directorState.pomplo.percentage;
  //       this.percentageChangingTimout = setTimeout(() => {
  //         this.setState({percentageChanging: false})
  //       },50)
  //     }
  //   }
  // }

  componentDidMount() {
    this.randomTimeout = setInterval(() => {
      this.setState({
        percentage: Math.random()*20-10,
      })
    },100);
  }

  componentWillUnmount() {
    // clearTimeout(this.percentageChangingTimeout);
    clearInterval(this.randomTimeout);
  }

  render () {
    // const {pomplo,tugOfWars} = this.props.directorState;
    const percentage = this.state.percentage;
    // const {percentage} = pomplo;
    // const {percentageChanging, percentageChange} = this.state;
    const hideHealthbar = this.props.hideHealthbar ? true:false;

    
    return (
      <React.Fragment>
        <div id="pomplo" 
          className={
            (percentage < 0.5 ? (percentage < 0 ? '-dead': '-sad') : '') //+ ' ' +
            //(percentageChanging ? (percentageChange < 0 ? '-hurting': '-healing') : '') 
            }>
          <button />
        
          { !hideHealthbar && <div 
              style={{
                fontSize: '0.8em',
                position: 'absolute',
                bottom: '-30%',
                left: '0',
                background: 'black',
                border: '1px solid white',
                padding: '0.2em 0.2em 0.1em',
                pointerEvents: 'none',
                width: '100%',
                textAlign: 'center',
              }}
            >{`${(100*percentage).toFixed(0)}% alive`}</div> }

          {(percentage < 0.1 || percentage > 0.9) && <div 
            style={{
              position: 'absolute',
              top: '60%',
              left: '58%',
              backgroundImage: `url(${percentage > 0.5 ? fireTruck : dumpTruck})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              width: '10vw',
              height: '10vw',
            }}
          />}
        </div>
      </React.Fragment>
    );
  }
}