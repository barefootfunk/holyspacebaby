import React, { useEffect } from 'react';

export default class TipJar extends React.Component {

  componentDidMount () {
    // window.addthis.init();
    // if(typeof window.addthis.layers.refresh === 'function') {
    //   window.addthis.layers.refresh()
    // }
  }

  render () {
    return (
        <React.Fragment>
          <div id="tips" className="layout-top-edge text-box" style={{fontSize: '0.7em'}}>
            <div style={{ fontSize: '2em' }}>Tips</div>
            <div>@barefootfunk</div>
            <div className="buttons"><a href="https://venmo.com/barefootfunk" target="_blank" className="button">Venmo</a> <a href="https://paypal.me/barefootfunk" target="_blank" className="button">PayPal</a></div>
            <div style={{ fontSize: '1em', marginTop: '0.5em' }}>50% goes to Black Lives Matter</div>
          </div>
       </React.Fragment>                  
    );
  }
}