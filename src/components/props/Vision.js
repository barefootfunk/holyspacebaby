import React from 'react';

class Vision extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      x: Math.random()*80+10,
      y: Math.random()*80+10,
    }
  }
  render() {
    const {x,y, open} = this.state;
    const {imageUrl,description} = this.props;

    return (
      <div className={`vision ${open ? '-open' : ''}`}>
        {(open ?
          ( 
            <div 
              className="universe"  
              style={{
                backgroundImage: `url('${imageUrl}')`,
              }}
              key="universe"
              onClick={() => {this.setState({open: false})}}
            >
              <div className="description">
                <p>The babe sees... <br/>...{description}</p>
              </div>
            </div>
          ) : (
            <div className="portal" key="portal" style={{
                top: `${x}vh`,
                left: `${y}vw`
              }}
              onClick={() => {this.setState({open: true})}}
            >
              <div className="preview-image" style={{
                backgroundImage: `url('${imageUrl}')`,
              }}></div>
            </div>
          )
        )}
      </div>
    );
  }
}

export default Vision;