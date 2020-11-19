import React from 'react';

class Copy extends React.Component {

  constructor(props) {
    super(props);

    this.state = { copySuccess: '' }
  }

  copyToClipboard = (e) => {
    this.textArea.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    this.setState({ copySuccess: 'Copied!' });
  };

  render() {
    return (
      <div>
        <form>
          <input type="text"
            ref={(textarea) => this.textArea = textarea}
            value='https://holyspace.baby'
          />

          {document.queryCommandSupported('copy') &&
          <button onClick={this.copyToClipboard}>{this.state.copySuccess ? this.state.copySuccess : 'Copy'}</button>} 
        </form>
      </div>
    );
  }

}

export default class Share extends React.Component {
  render () {
    return (
      <div id="share" className="layout-bottom">
        <div style={{texAlign: 'center'}}>Spread the good word:</div>
        <Copy />
        {/* <p>Message your friends: <div style={{fontFamily:'courier new', fontSize:'0.5em'}} className="-selectable"><a href="https://www.holyspace.baby">https://www.holyspace.baby</a></div></p> */}
      </div>
    )
  }
}