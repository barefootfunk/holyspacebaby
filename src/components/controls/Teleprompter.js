import React from 'react';
import { BrowserRouter, Route } from "react-router-dom"

export class Teleprompter extends React.Component {


  render () {
    return (
      <BrowserRouter>
        <Route path="/performer">
          <div className="teleprompter">
            {this.props.children}
          </div>
        </Route>
      </BrowserRouter>
    );
  }
}

export default Teleprompter;