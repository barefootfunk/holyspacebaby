import React from 'react';
// import zombieImage1 from '../../img/zombie1.gif';



export default class TugOfWar extends React.Component {

  constructor (props) {
    super(props);

    this.oldPercentage = 0.5; 
    this.percentageChangingTimeout = null;
    this.state = {
      percentageChanging: false,
      percentageChange: false,
    }
  }

  componentWillUpdate() {
    if (this.props.tugOfWar && !this.props.tugOfWar.triggered) {
      if (this.oldPercentage !== this.props.tugOfWar.percentage) {
        this.state.percentageChanging =  true
        this.state.percentageChange = this.props.tugOfWar.percentage - this.oldPercentage;

        this.oldPercentage = this.props.tugOfWar.percentage;
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
    const {newParticipantEvent, tugOfWarId, tugOfWar,side1,side2} = this.props;

    if(tugOfWar) {
      const {triggered, percentage} = tugOfWar;
      const {percentageChanging, percentageChange} = this.state;
      
      // Analysiss
      const winner = Math.round(percentage);
      const percentage1 = 1-percentage;
      const percentage2 = percentage;
      const side1Wins = percentage1>0.9;
      const side2Wins = percentage2>0.9;
      return (
        <div className="tug-of-war" key={tugOfWarId} >
          {/* {triggered ? (
            <React.Fragment>
              {winner ? 'side 2':'side 1'} wins.
            </React.Fragment>
          ):( */}
            <React.Fragment>
              {!side2Wins && <button key={'left'}
                className='side-1'
                style={{
                  width: `${percentage1*100}%`,
                }}
                onClick={()=>{
                  newParticipantEvent({
                    type: 'tugOfWarClick', 
                    data: {
                      tugOfWarId: tugOfWarId,
                      change: -1/100,
                    }
                  })
                }}
              >
                <div class="background" style={{ backgroundImage: `url(/img/${side1.image})`,}} />
                <span class="caption">{side1Wins ? side1.victory : side1.caption}</span>
                <span className="percentage">{(percentage1*100).toFixed(2)}%</span>
              </button>}
              {!side1Wins && <button  key={'right'}
                className='side-2'
                style={{
                  width: `${percentage2*100}%`,
                }}
                onClick={()=>{
                  newParticipantEvent({
                    type: 'tugOfWarClick', 
                    data: {
                      tugOfWarId: tugOfWarId,
                      change: 0.5/100,
                    }
                  })
                }}
              >
                <div class="background" style={{ backgroundImage: `url(/img/${side2.image})`,}} />
                <span class="caption">{side2Wins ? side2.victory : side2.caption}</span>
                <span className="percentage">{(percentage2*100).toFixed(2)}%</span>
              </button>}
            </React.Fragment>
          {/* )} */}
        </div>
      );
    } else {
      return <div>Loading tug-of-war</div>
    }
  }
}