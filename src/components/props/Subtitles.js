import React from 'react';


export default class Subtitles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 0,
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        title: this.state.title<this.props.titles.length ? this.state.title+1 : this.state.title
      })
    },5000)
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {

    const title = this.props.titles[this.state.title];

    return (
      <React.Fragment>{title && <p className='layout-top -no-pointer rainbow-text' style={{ fontSize: '2em'}}>{title}</p>}</React.Fragment>
    )
  }
}