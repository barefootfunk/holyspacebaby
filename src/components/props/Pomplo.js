import React from 'react';

export default class Pomplo extends React.Component {

  constructor (props) {
    super(props);

    this.oldPercentage = this.props.pomplo.percentage;
    this.percentageChangingTimeout = null;
    this.state = {
      percentageChanging: false,
      percentageChange: false,
    }
  }

  componentWillUpdate() {
    if (!this.props.pomplo.triggered) {
      if (this.oldPercentage !== this.props.pomplo.percentage) {
        this.state.percentageChanging =  true
        this.state.percentageChange = this.props.pomplo.percentage - this.oldPercentage;

        this.oldPercentage = this.props.pomplo.percentage;
        this.percentageChangingTimout = setTimeout(() => {
          this.setState({percentageChanging: false})
        },50)
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.percentageChangingTimeout);
  }

  render () {
    const {pomplo} = this.props;
    const {percentage} = pomplo;
    const {percentageChanging, percentageChange} = this.state;

    
    return (
      <React.Fragment>
        <div id="pomplo" 
          className={
            (percentage < 0.5 ? (percentage < 0 ? '-dead': '-sad') : '') + ' ' +
            (percentageChanging ? (percentageChange < 0 ? '-hurting': '-healing') : '') }>
          <button />
        
        <span 
              style={{
                fontSize: '0.5em',
                position: 'absolute',
                bottom: '-10%',
                left: '40%',
                background: 'black',
                border: '1px solid white',
                padding: '0.2em 0.2em 0.1em',
                pointerEvents: 'none',
              }}
            >{`${(100*percentage).toFixed(0)}% alive`}</span>
        </div>
      </React.Fragment>
    );
  }
}