import React from 'react';
import { setTimeout } from 'window-or-global';

class Vision extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lifeCycleStage: 'portal',
      x: 0,
      y: 0,
    }
    
  }
  componentDidMount() {
    this.launchTimeout = setTimeout(this.launch,200);
    this.dieTimeout = setTimeout(this.die,15000);
  }
  launch = () => {
    this.setState({
      x: 100*this.props.dir[0],
      y: 100*this.props.dir[1],
    })
  }
  die = () => {
    if(this.state.lifeCycleStage==='portal') {
      this.setState({
        lifeCycleStage: 'dead'
      })
    }
  }
  componentWillUnmount() {
    clearTimeout(this.launchTimeout);
    clearTimeout(this.dieTimeout);
  }
  render() {
    const {x,y, lifeCycleStage} = this.state;
    const {imageUrl,description, heartChoice, mindChoice, chaosChoice} = this.props.content;

    return (
      <div className={`vision`}>
        {(lifeCycleStage === 'open' && ( 
          <div 
            className="universe"  
            style={{
              backgroundImage: `url('${imageUrl}')`,
            }}
            key="universe"
          >
            <div className="description">
              <p>{description}</p>
              <div className="buttons">
                {heartChoice && <button className="button" 
                  onClick={() => {this.setState({lifeCycleStage: 'dead'})}}
                >{heartChoice}</button>}
                {mindChoice && <button className="button" 
                  onClick={() => {this.setState({lifeCycleStage: 'dead'})}}
                >{mindChoice}</button>}
                {chaosChoice && <button className="button"
                  onClick={() => {this.setState({lifeCycleStage: 'dead'})}}
                >{chaosChoice}</button>}
              </div>
            </div>
          </div>
        ))}
        {(lifeCycleStage === 'portal' && (
          <div className="portal" key="portal" style={{
              transform: `translate( calc(${x}vw - 50%) , calc(${y}vh - 50%) )`,
            }}
            onClick={() => {this.setState({lifeCycleStage: 'open'})}}
          >
            <div className="preview-image" style={{
              backgroundImage: `url('${imageUrl}')`,
            }}></div>
          </div>
        ))}
      </div>
    );
  }
}

export default Vision;