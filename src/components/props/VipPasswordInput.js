import React from 'react';

function insertParam(key, value) {
  key = encodeURIComponent(key);
  value = encodeURIComponent(value);

  // kvp looks like ['key1=value1', 'key2=value2', ...]
  var kvp = document.location.search.substr(1).split('&');
  let i=0;

  for(; i<kvp.length; i++){
      if (kvp[i].startsWith(key + '=')) {
          let pair = kvp[i].split('=');
          pair[1] = value;
          kvp[i] = pair.join('=');
          break;
      }
  }

  if(i >= kvp.length){
      kvp[kvp.length] = [key,value].join('=');
  }

  // can return this or...
  let params = kvp.join('&');

  // reload page with new params
  document.location.search = params;
}

export default class VIPPasswordInput extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      currenPassword: '',
      notQuite: false,
    }
    this.notQuiteTimeout = null;
  }

  handleChange = (event) => {
    const { value, maxLength } = event.target;
    const password = value.slice(0, maxLength);

    this.setState({currenPassword: password, notQuite: false});
    window.history.replaceState(null, null, `?vip-password=${password}`);
    this.props.vipAuthenticate();

    clearTimeout(this.notQuiteTimeout);
    this.notQuiteTimeout = setTimeout(() => {
      this.setState({ notQuite: true});
    },1000)
  }

  render () {
    const {currenPassword, notQuite} = this.state;

    return (
        <div className="text-box" id="vip-auth">
          <input 
            type="text" 
            value={currenPassword} 
            onChange={this.handleChange} 
            placeholder="Type VIP password"
            maxLength="30"
          />
          <div style={{ fontSize: '1em' }}>{currenPassword ? (notQuite ? 'Not quite.': 'Keep typing...') : 'If you did the weekly assignment, you can unlock VIP mode.'}</div>
        </div>
    );
  }
}