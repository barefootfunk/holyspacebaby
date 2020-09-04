import React from 'react';

class Vision extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      x: Math.random()*80+10,
      y: Math.random()*80+10,
    }
  }
  render() {
    const {x,y} = this.state;
    const {imageUrl,description} = this.props;

    return (
      <div className="vision">
        <div className="portal"style={{
            top: `${x}vh`,
            left: `${y}vw`
          }}>
          <div className="image" style={{
            backgroundImage: `url('${imageUrl}')`,
          }}></div>
        </div>
        <div className="description">
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Vision;