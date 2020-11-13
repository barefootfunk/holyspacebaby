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
          <div className="layout-bottom text-box" style={{ border: '2px solid white', fontSize: '0.7em'}}>
            <div style={{ fontSize: '2em' }}>Tips</div>
            <div className="addthis_tipjar_inline" />
            <div style={{ fontSize: '0.7em' }}>(50% goes to Black Lives Matter)</div>
          </div>
       </React.Fragment>                  
    );
  }
}