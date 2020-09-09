import React from 'react';
import { setTimeout } from 'window-or-global';


class Vision extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      x: 0,
      y: 0,
    }
    
  }
  componentDidMount() {
    console.log('mount')
    this.launchTimeout = setTimeout(this.launch,500);
  }
  launch = () => {
    console.log('launch!')
    this.setState({
      x: (60 + Math.random() *30) * (Math.random()>0.5 ? 1 : -1),
      y: (60 + Math.random() *30) * (Math.random()>0.5 ? 1 : -1),
    })
  }
  componentWillUnmount() {
    clearTimeout(this.launchTimeout);
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
            >
              <div className="description">
                <p>The babe sees... <br/>...this is placeholder text.  I need to rewrite these visions.  You will have a choice for each vision. {/*description*/}</p>
                <div className="buttons">
                  <button className="button" 
                    onClick={() => {this.setState({open: false})}
                  }>Choice 1</button>
                  <button className="button"
                    onClick={() => {this.setState({open: false})}
                  }>Choice 2</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="portal" key="portal" style={{
                top: `${x+50}vh`,
                left: `${y+50}vw`
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